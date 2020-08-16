using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Famoser.Backup.Business.Services.Interfaces;
using Newtonsoft.Json;

namespace Famoser.Backup.Business.Sources.Base
{
    internal abstract class LoggingService : ConfigureService
    {
        protected LoggingService(Dictionary<string, string> allKeyValues, IConsoleService consoleService, IProgressService progressService, Dictionary<string, string> configuredKeyValues) : base(allKeyValues, consoleService, progressService, configuredKeyValues)
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
