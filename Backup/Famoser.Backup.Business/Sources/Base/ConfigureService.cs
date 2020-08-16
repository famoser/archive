using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Famoser.Backup.Business.Services;
using Famoser.Backup.Business.Services.Interfaces;
using Famoser.Backup.Business.Sources.Interfaces;

namespace Famoser.Backup.Business.Sources.Base
{
    internal abstract class ConfigureService : IConfigurable
    {
        protected Dictionary<string, string> ConfiguredKeyValues;
        protected Dictionary<string, string> AllKeyValues;
        protected IConsoleService ConsoleService;
        protected IProgressService ProgressService;

        protected ConfigureService(Dictionary<string, string> allKeyValues, IConsoleService consoleService, IProgressService progressService, Dictionary<string, string> configuredKeyValues)
        {
            AllKeyValues = allKeyValues;
            ConsoleService = consoleService;
            ProgressService = progressService;
            ConfiguredKeyValues = configuredKeyValues;
        }

        private string _activeQuestion;
        public bool HasAnotherQuestion()
        {
            foreach (var allKeyValue in AllKeyValues)
            {
                if (!ConfiguredKeyValues.ContainsKey(allKeyValue.Key))
                {
                    _activeQuestion = allKeyValue.Key;
                    return true;
                }
            }
            return false;
        }

        public string AskQuestion()
        {
            return AllKeyValues[_activeQuestion];
        }

        public void AnswerToQuestion(string answer)
        {
            ConfiguredKeyValues[_activeQuestion] = answer;
        }
    }
}
