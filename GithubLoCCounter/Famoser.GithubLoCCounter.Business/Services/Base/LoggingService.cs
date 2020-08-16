using System.Collections.Generic;
using System.IO;
using Famoser.GithubLoCCounter.Busines.Services.Interfaces;

namespace Famoser.GithubLoCCounter.Busines.Services.Base
{
    public class LoggingService : ConfigureService
    {
        protected LoggingService(Dictionary<string, string> allKeyValues, IConsoleService consoleService, IProgressService progressService) : base(allKeyValues, consoleService, progressService)
        {
        }

        private List<string> _logs = new List<string>();

        protected void DoLog(string log)
        {
            _logs.Add(log);
        }

        protected void SaveLogs(string path)
        {
            File.WriteAllLines(Path.Combine(path, "logs.log"), _logs);
        }
    }
}
