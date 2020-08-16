using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Famoser.Backup.Business.Helpers;
using Famoser.Backup.Business.Services;
using Famoser.Backup.Business.Workflows;
using Famoser.Backup.Console.Implementations;

namespace Famoser.Backup.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            CancellationTokenSource cts = new CancellationTokenSource();

            System.Console.CancelKeyPress += (s, e) =>
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

            var workflow = new BackupWorkflow(writerService, progressService, storageService);
            var res = await workflow.Execute();
            writerService.WriteToConsole("finished " + (res ? "successfully" : " (failed)"));
            System.Console.ReadKey();
        }
    }
}
