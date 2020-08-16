using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Famoser.GithubLoCCounter.Busines.Workflows;
using GithubLoCCounter.Implementations;

namespace GithubLoCCounter
{
    class Program
    {

        static void Main(string[] args)
        {
            CancellationTokenSource cts = new CancellationTokenSource();

            Console.CancelKeyPress += (s, e) =>
            {
                e.Cancel = true;
                cts.Cancel();
            };

            MainAsync(args, cts.Token).Wait();
        }

        static async Task MainAsync(string[] args, CancellationToken token)
        {
            var writerService = new ConsoleService();
            var progressService = new ProgressService(writerService);
            var storageService = new StorageService();

            var workflow = new CounterWorkflow(writerService, progressService,  storageService);
            var res = await workflow.Execute();
            writerService.WriteToConsole("finished " + (res ? "successfully" : " (failed)"));
            Console.ReadKey();
        }
    }
}
