using Famoser.Backup.Business.Sources.Interfaces;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Famoser.Backup.Business.Helpers;
using Famoser.Backup.Business.Services;
using Famoser.Backup.Business.Services.Interfaces;
using Famoser.Backup.Business.Sources.Base;
using Newtonsoft.Json;
using NGitLab;

namespace Famoser.Backup.Business.Sources
{
    internal class GitLabService : CacheService, ISource
    {
        protected const string GitLabApiUrl = "GitLabApiUrl";
        protected const string GitLabApiKey = "GitLabApiKey";

        public GitLabService(IConsoleService consoleService, IProgressService progressService, Dictionary<string, string> configuredKeyValues) : base(new Dictionary<string, string>()
        {
            {GitLabApiUrl, "Gitlab api url"},
            { GitLabApiKey, "Gitlab api key" }
        }, consoleService, progressService, configuredKeyValues)
        {

        }

        public async Task<bool> Backup(string targetFolder)
        {
            try
            {
                ConsoleService.WriteToConsole("started GitLab Service");

                //check for config
                Dictionary<string, string> versions = ResolveDictionaryCache(targetFolder);

                var client = GitLabClient.Connect(ConfiguredKeyValues[GitLabApiUrl], ConfiguredKeyValues[GitLabApiKey]);
                var projs = client.Projects;
                foreach (var project in projs.Accessible)
                {
                    var repo = client.GetRepository(project.Id);
                    ConsoleService.WriteToConsole("Working on project " + project.Name);
                    var lastCommit = repo.Commits.FirstOrDefault();
                    if (lastCommit != null)
                    {
                        if (!File.Exists(Path.Combine(targetFolder, project.Name + ".tar.gz")) ||
                            !versions.ContainsKey(project.Name) || versions[project.Name] !=
                            lastCommit.CreatedAt.ToLongDateString() + "_" + lastCommit.CreatedAt.ToLongTimeString())
                        {
                            ConsoleService.WriteToConsole("Replacing project " + project.Name);
                            if (File.Exists(Path.Combine(targetFolder, project.Name + ".tar.gz")))
                                File.Delete(Path.Combine(targetFolder, project.Name + ".tar.gz"));

                            ConsoleService.WriteToConsole("downloading project " + project.Name);
                            repo.GetArchive((str) =>
                            {
                                var fileStream = File.Create(Path.Combine(targetFolder, project.Name + ".tar.gz"));
                                long totalFileSize = 0;
                                var bufferSize = 2048;
                                var buffer = new byte[bufferSize];
                                int count = str.Read(buffer, 0, bufferSize);
                                while (count > 0)
                                {
                                    // Dumps the 256 characters on a string and displays the string to the console.
                                    fileStream.Write(buffer, 0, count);
                                    count = str.Read(buffer, 0, bufferSize);
                                    totalFileSize += count;
                                    ConsoleService.WriteSameLineToConsole("downloaded " +
                                                                          FormatHelper.ConvertToHumanReadbleFileSize(totalFileSize));
                                }
                                str.CopyToAsync(fileStream);
                                fileStream.Close();
                                versions[project.Name] = lastCommit.CreatedAt.ToLongDateString() + "_" +
                                                         lastCommit.CreatedAt.ToLongTimeString();

                                //add new line
                                ConsoleService.WriteToConsole("");
                            });
                            ConsoleService.WriteToConsole("Finished downloading project " + project.Name);
                            DoLog("actualized " + project.Name);
                        }
                        else
                        {
                            ConsoleService.WriteToConsole("skipped project " + project.Name +
                                                          " as it is already up to date");
                            DoLog("skipped " + project.Name + " (up to date)");
                        }
                    }
                    else
                    {
                        ConsoleService.WriteToConsole("skipped project " + project.Name + " as no commit was found");
                        DoLog("skipped " + project.Name + " (no commit)");
                    }
                }
                ConsoleService.WriteToConsole("finished GitLab Service");

                Cache(targetFolder, versions);
                return true;
            }
            catch (Exception ex)
            {
                ConsoleService.WriteToConsole("Exception occured");
                ConsoleService.WriteToConsole(ex.ToString());
            }
            finally
            {
                SaveLogs(targetFolder);
            }
            return false;
        }
    }
}
