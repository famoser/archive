using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Famoser.Backup.Business.Services;
using Famoser.Backup.Business.Services.Interfaces;

namespace Famoser.Backup.Console.Implementations
{
    internal class ProgressService : IProgressService
    {
        private readonly IConsoleService _consoleService;
        public ProgressService(IConsoleService consoleService)
        {
            _consoleService = consoleService;
        }

        private int _maxProgress;
        private int _activeProgress;

        public void SetMaxProgress(int max)
        {
            _maxProgress = max;
        }

        public void IncrementValue()
        {
            _activeProgress++;
            _consoleService.WriteToConsole("Progress: " + Math.Round((double)_maxProgress / _activeProgress * 100, 0) + "%");
        }

        public void SetValueToZero()
        {
            _activeProgress = 0;
        }
    }
}
