using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Famoser.FrameworkEssentials.Services;
using Famoser.Typo3Crawler.Helpers;
using Nito.AsyncEx;

namespace Famoser.Typo3Crawler
{
    class Program
    {
        static void Main(string[] args)
        {
            AsyncContext.Run(() => MainAsync(args));
        }

        static async void MainAsync(string[] args)
        {
            while (true)
            {
                Console.WriteLine("path of your .csv file:");
                try
                {
                    var path = Console.ReadLine();
                    var pages = SaveHelper.ParsePages(path);
                    Console.WriteLine("processing " + pages.Count + " pages");
                    foreach (var page in pages)
                    {
                        page.Typo3Version = await Typo3Helper.GetMainPageVersion(page);
                        Console.WriteLine("processes " + page.Url + ", version: " + page.Typo3Version);
                    }
                    SaveHelper.SavePages(path + "_processed.csv", pages);
                    Console.WriteLine("file saved, terminated successfull!");
                    Console.ReadKey();
                    break;
                }
                catch (Exception ex)
                {
                    Console.WriteLine("exception occurred: " + ex);
                }
            }
        }
    }
}
