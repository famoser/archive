using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Famoser.Backup.Business.Helpers;
using Famoser.Backup.Business.Services.Interfaces;
using Famoser.Backup.Business.Sources.Base;
using Famoser.Backup.Business.Sources.Interfaces;
using NGitLab;
using Octokit;

namespace Famoser.Backup.Business.Sources
{
    internal class GitHubService : CacheService, ISource
    {
        protected const string GitHubUsername = "GitHubUserName";
        protected const string GitHubPassword = "GitHubPassword";

        public GitHubService(IConsoleService consoleService, IProgressService progressService, Dictionary<string, string> configuredKeyValues) : base(new Dictionary<string, string>()
        {
            {GitHubUsername, "GitHub username"},
            {GitHubPassword, "GitHub password"}
        }, consoleService, progressService, configuredKeyValues)
        {

        }

        public async Task<bool> Backup(string targetFolder)
        {
            try
            {
                ConsoleService.WriteToConsole("started GitHub Service");

                //check for config
                Dictionary<string, string> versions = ResolveDictionaryCache(targetFolder);


                var client = new GitHubClient(new ProductHeaderValue("Famoser.Backup", "0.1"));
                var basicAuth = new Credentials(ConfiguredKeyValues[GitHubUsername], ConfiguredKeyValues[GitHubPassword]);
                client.Credentials = basicAuth;

                var user = await client.User.Current();
                var repos = await client.Repository.GetAllForUser(user.Login);

                foreach (var repo in repos)
                {
                    try
                    {
                        var filePath = Path.Combine(targetFolder, repo.Name + ".tar.gz");
                        if (!File.Exists(filePath) || !versions.ContainsKey(repo.FullName) || versions[repo.FullName] != repo.UpdatedAt.ToFileTime().ToString())
                        {
                            ConsoleService.WriteToConsole("downloading project " + repo.FullName);
                            var bytes = await client.Repository.Content.GetArchive(repo.Owner.Login, repo.Name);
                            File.WriteAllBytes(filePath, bytes);
                            ConsoleService.WriteToConsole("download project " + repo.FullName + " (" + FormatHelper.ConvertToHumanReadbleFileSize(bytes.Length) + ")");
                            DoLog("actualized " + repo.FullName);
                            versions[repo.FullName] = repo.UpdatedAt.ToFileTime().ToString();
                        }
                        else
                        {
                            ConsoleService.WriteToConsole("skipped project " + repo.FullName + " as no recent commit was found");
                            DoLog("skipped " + repo.FullName + " (no recent commit)");
                        }
                    }
                    catch (NotFoundException)
                    {
                        ConsoleService.WriteToConsole("skipped project " + repo.FullName + " as no commit was found");
                        DoLog("skipped " + repo.FullName + " (no commit)");
                    }
                    catch (Exception ex)
                    {
                        ConsoleService.WriteToConsole("exception occured with project " + repo.FullName + ": " + ex);
                        DoLog("failed " + repo.FullName + " (exception occured)");
                    }
                }

                ConsoleService.WriteToConsole("finished GitHub Service");

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
