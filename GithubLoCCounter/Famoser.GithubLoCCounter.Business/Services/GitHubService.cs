using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using Famoser.GithubLoCCounter.Busines.Helpers;
using Famoser.GithubLoCCounter.Busines.Services.Base;
using Famoser.GithubLoCCounter.Busines.Services.Interfaces;
using Octokit;

namespace Famoser.GithubLoCCounter.Busines.Services
{
    internal class GitHubService : CacheService
    {
        protected const string GitHubUsername = "GitHubUserName";
        protected const string GitHubPassword = "GitHubPassword";

        public GitHubService(IConsoleService consoleService, IProgressService progressService) : base(new Dictionary<string, string>()
        {
            {GitHubUsername, "GitHub username"},
            {GitHubPassword, "GitHub password"}
        }, consoleService, progressService)
        {

        }

        public List<string> DownloadedRepositoresPaths = new List<string>();  

        private GitHubClient _client;
        private GitHubClient GetClient()
        {
            if (_client != null)
                return _client;

            _client = new GitHubClient(new ProductHeaderValue("Famoser.GithubLoCCounter", "0.1"));
            var basicAuth = new Credentials(ConfiguredKeyValues[GitHubUsername], ConfiguredKeyValues[GitHubPassword]);
            _client.Credentials = basicAuth;
            return _client;
        }

        public async Task<bool> DownloadRepository(string tempFolder, string ownerName, string repositoryName)
        {
            try
            {
                var client = GetClient();
                var repo = await client.Repository.Get(ownerName, repositoryName);
                ConsoleService.WriteToConsole("downloading project " + repo.FullName);
                var bytes = await client.Repository.Content.GetArchive(repo.Owner.Login, repo.Name);
                var filePath = Path.Combine(tempFolder, repo.Name + ".tar.gz");
                File.WriteAllBytes(filePath, bytes);
                DownloadedRepositoresPaths.Add(filePath);
                ConsoleService.WriteToConsole("downloaded project " + repo.FullName + " (" + FormatHelper.ConvertToHumanReadbleFileSize(bytes.Length) + ")");
                return true;
            }
            catch (NotFoundException)
            {
                ConsoleService.WriteToConsole("skipped project " + ownerName + "/" + repositoryName + " as no commit was found");
                DoLog("skipped " + ownerName + "/" + repositoryName + " (no commit)");
                return false;
            }
            catch (Exception ex)
            {
                ConsoleService.WriteToConsole("exception occured with project " + ownerName + "/" + repositoryName + ": " + ex);
                DoLog("failed " + ownerName + "/" + repositoryName + " (exception occured)");
                return false;
            }
        }

        public async Task<bool> DownloadAllUserRepositores(string tempFolder)
        {
            try
            {
                ConsoleService.WriteToConsole("started");

                var client = GetClient();
                var user = await client.User.Current();
                var repos = await client.Repository.GetAllForUser(user.Login);

                foreach (var repo in repos)
                {
                    await DownloadRepository(tempFolder, repo.Owner.Login, repo.Name);
                }

                ConsoleService.WriteToConsole("finished!");
                return true;
            }
            catch (Exception ex)
            {
                ConsoleService.WriteToConsole("Exception occured");
                ConsoleService.WriteToConsole(ex.ToString());
            }
            finally
            {
                SaveLogs(tempFolder);
            }
            return false;
        }
    }
}
