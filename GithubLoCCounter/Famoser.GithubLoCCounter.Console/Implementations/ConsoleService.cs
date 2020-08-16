using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Famoser.GithubLoCCounter.Busines.Services.Interfaces;

namespace GithubLoCCounter.Implementations
{
    internal class ConsoleService : IConsoleService
    {
        public void WriteToConsole(string line)
        {
            System.Console.WriteLine(line);
        }

        public void WriteSameLineToConsole(string line)
        {
            System.Console.Write("\r" + line + "                                ");
        }

        public string GetNextInputFromConsole()
        {
            return System.Console.ReadLine();
        }
    }
}
