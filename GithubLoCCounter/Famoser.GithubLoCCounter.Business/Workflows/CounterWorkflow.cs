using System;
using System.IO;
using System.Threading.Tasks;
using Famoser.GithubLoCCounter.Busines.Services;
using Famoser.GithubLoCCounter.Busines.Services.Interfaces;

namespace Famoser.GithubLoCCounter.Busines.Workflows
{
    public class CounterWorkflow
    {
        private IConsoleService _consoleService;
        private IProgressService _progressService;
        private IStorageService _storageService;

        private const string ConfigFileName = "config.json";

        public CounterWorkflow(IConsoleService consoleService, IProgressService progressService,
            IStorageService storageService)
        {
            _consoleService = consoleService;
            _progressService = progressService;
            _storageService = storageService;
        }

        public async Task<bool> Execute()
        {
            try
            {
                var cacheFolder = Path.GetTempPath() + "/GlC";
                if (!Directory.Exists(cacheFolder))
                    Directory.CreateDirectory(cacheFolder);

                var service = new GitHubService(_consoleService, _progressService);
                while (service.HasAnotherQuestion())
                {
                    _consoleService.WriteToConsole(service.AskQuestion());
                    service.AnswerToQuestion(_consoleService.GetNextInputFromConsole());
                }
                while (true)
                {
                    //download
                    _consoleService.WriteToConsole("Choose your mode: type 'all' to download & count all your repositories, or type the full repo name to evaluate (for Example: dotnet/roslyn)");
                    var input = _consoleService.GetNextInputFromConsole();
                    if (input.Contains("/"))
                    {
                        var usr = input.Substring(0, input.IndexOf("/", StringComparison.Ordinal));
                        var repo = input.Substring(input.IndexOf("/", StringComparison.Ordinal) + 1);
                        _consoleService.WriteToConsole("Working on " + usr + "/" + repo);
                        await service.DownloadRepository(cacheFolder, usr, repo);
                    }
                    else if (input == "all")
                    {
                        _consoleService.WriteToConsole("Downloading all your repos");
                        await service.DownloadAllUserRepositores(cacheFolder);
                    }
                    else
                    {
                        _consoleService.WriteToConsole("Invalid input, try again ;)");
                        continue;
                    }

                    //extract
                    var extractService = new ExtractService();
                    extractService.Execute(service.DownloadedRepositoresPaths);
                    service.DownloadedRepositoresPaths.Clear();

                    //count
                    var counterService = new CountService(_consoleService);
                    var summary = counterService.Execute(extractService.FolderPaths);
                    File.WriteAllText(cacheFolder + "/summary.txt", summary);
                    extractService.FolderPaths.Clear();
                }
            }
            catch (Exception ex)
            {
                _consoleService.WriteToConsole("Exception occred in Execute");
                _consoleService.WriteToConsole(ex.ToString());
            }
            return false;
        }
    }
}
