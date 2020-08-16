using System.Collections.Generic;
using System.IO;
using System.Linq;
using Famoser.GithubLoCCounter.Busines.Services.Interfaces;

namespace Famoser.GithubLoCCounter.Busines.Services
{
    public class CountService
    {
        private readonly IConsoleService _consoleService;

        public CountService(IConsoleService consoleService)
        {
            _consoleService = consoleService;
        }

        public string Execute(List<string> folderPaths)
        {
            var summary = "";
            var totalLines = 0;
            var totalFiles = 0;
            var totalDic = new Dictionary<string, int>();
            foreach (var folderPath in folderPaths)
            {
                _consoleService.WriteToConsole("counting in " + folderPath);
                Dictionary<string, int> dic = new Dictionary<string, int>();
                int filesCounter = 0;
                DirectoryInfo di = new DirectoryInfo(folderPath);
                //skip first folder as it is git only stuff
                CountInDirectory(di, dic, ref filesCounter);
                var summaryPath = folderPath + "/" + "summary.txt";
                var totalSum = dic.Values.Sum();
                File.AppendAllText(summaryPath, "Total lines counted: " + totalSum + " in " + filesCounter + " files\n\n\n");
                File.AppendAllText(summaryPath, "Lines per extension: \n\n");
                foreach (var key in dic.Keys)
                {
                    File.AppendAllText(summaryPath, key + ": " + dic[key] + "\n");
                    if (!totalDic.ContainsKey(key))
                        totalDic.Add(key, 0);
                    totalDic[key] += dic[key];
                }
                _consoleService.WriteToConsole("found " + filesCounter + " files, " + totalSum + " lines in total. The summary is located at " + summaryPath);
                summary += di.Name + ": " + totalSum + " lines in " + filesCounter + " files\n";
                totalLines += totalSum;
                totalFiles += filesCounter;
            }
            summary = folderPaths.Count + " projects, " + totalFiles + " files, " + totalLines + " LoC!\n\n\n" + "Lines per poject: \n\n" + summary;
            summary += "Lines per extension: \n\n";
            foreach (var key in totalDic.Keys)
            {
                summary += key + ": " + totalDic[key] + "\n";
            }
            return summary;
        }

        private void CountInDirectory(DirectoryInfo dir, Dictionary<string, int> dic, ref int filesCounter)
        {
            foreach (FileInfo file in dir.GetFiles())
            {
                if (!dic.Keys.Contains(file.Extension))
                    dic.Add(file.Extension, 0);
                dic[file.Extension] += File.ReadAllLines(file.FullName).Length;
                filesCounter++;
            }
            foreach (DirectoryInfo di in dir.GetDirectories())
            {
                CountInDirectory(di, dic, ref filesCounter);
            }
        }
    }
}
