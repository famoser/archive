using System.Collections.Generic;
using Famoser.GithubLoCCounter.Busines.Services.Interfaces;

namespace Famoser.GithubLoCCounter.Busines.Services.Base
{
    public class ConfigureService
    {
        protected Dictionary<string, string> ConfiguredKeyValues = new Dictionary<string, string>();
        protected Dictionary<string, string> AllKeyValues;
        protected IConsoleService ConsoleService;
        protected IProgressService ProgressService;

        protected ConfigureService(Dictionary<string, string> allKeyValues, IConsoleService consoleService, IProgressService progressService)
        {
            AllKeyValues = allKeyValues;
            ConsoleService = consoleService;
            ProgressService = progressService;
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
