using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Famoser.Backup.Business.Helpers;
using Famoser.Backup.Business.Models;
using Famoser.Backup.Business.Services.Interfaces;
using Famoser.Backup.Business.Sources.Interfaces;
using Newtonsoft.Json;

namespace Famoser.Backup.Business.Workflows
{
    public class BackupWorkflow
    {
        private IConsoleService _consoleService;
        private IProgressService _progressService;
        private IStorageService _storageService;

        private const string ConfigFileName = "config.json";

        public BackupWorkflow(IConsoleService consoleService, IProgressService progressService,
            IStorageService storageService)
        {
            _consoleService = consoleService;
            _storageService = storageService;
            _progressService = progressService;
        }

        public async Task<bool> Execute()
        {
            try
            {
                var settings = ReadOutSettings();
                if (settings?.ApplicationConfig == null)
                {
                    settings = new SaveModel();
                    var availableServices = ReflectionHelper.GetSourcesObjectNames();
                    _consoleService.WriteToConsole("You're running the application for the first time. Choose the services you want to run (confirm with y)");
                    foreach (var availableService in availableServices)
                    {
                        _consoleService.WriteToConsole(availableService);
                        if (_consoleService.GetNextInputFromConsole() == "y")
                        {
                            settings.ServiceConfigs.Add(new ServiceConfig()
                            {
                                ServiceName = availableService,
                                TargetFolder = availableService.Replace(".", "")
                            });
                            _consoleService.WriteToConsole(availableService + " added");
                        }
                    }
                    _consoleService.WriteToConsole("Name your backup folder");
                    settings.ApplicationConfig = new ApplicationConfig()
                    {
                        TargetFolder = _consoleService.GetNextInputFromConsole()
                    };
                    SaveSettings(settings);
                }
                ReflectionHelper.ConstructServicesIntoConfiguration(_consoleService, _progressService, settings.ServiceConfigs);

                foreach (var service in settings.ServiceConfigs)
                {
                    if (!service.Skip)
                        await RunService(service.Instance, Path.Combine(settings.ApplicationConfig.TargetFolder, service.TargetFolder));
                }

                SaveSettings(settings);

                return true;
            }
            catch (Exception ex)
            {
                _consoleService.WriteToConsole("Exception occred in Execute");
                _consoleService.WriteToConsole(ex.ToString());
            }
            return false;
        }

        private SaveModel ReadOutSettings()
        {
            try
            {
                var content = _storageService.ReadOutFile(ConfigFileName);
                if (content != null)
                {
                    return JsonConvert.DeserializeObject<SaveModel>(content);
                }
            }
            catch (Exception ex)
            {
                _consoleService.WriteToConsole("Exception occred in ReadOutSettings");
                _consoleService.WriteToConsole(ex.ToString());
            }
            return null;
        }

        private async Task RunService(object service, string folder)
        {
            try
            {
                var configure = service as IConfigurable;
                if (configure != null)
                {
                    while (configure.HasAnotherQuestion())
                    {
                        _consoleService.WriteToConsole(configure.AskQuestion());
                        configure.AnswerToQuestion(_consoleService.GetNextInputFromConsole());
                    }
                }

                if (!Directory.Exists(folder))
                    Directory.CreateDirectory(folder);

                var source = service as ISource;
                if (source != null)
                {
                    await source.Backup(folder);
                }
            }
            catch (Exception ex)
            {
                _consoleService.WriteToConsole("Exception occred in RunService");
                _consoleService.WriteToConsole(ex.ToString());
            }
            //return false;
        }

        private bool SaveSettings(object settings)
        {
            try
            {
                return _storageService.WriteFile(ConfigFileName, JsonConvert.SerializeObject(settings, Formatting.Indented));
            }
            catch (Exception ex)
            {
                _consoleService.WriteToConsole("Exception occred in SaveSettings");
                _consoleService.WriteToConsole(ex.ToString());
            }
            return false;
        }
    }
}
