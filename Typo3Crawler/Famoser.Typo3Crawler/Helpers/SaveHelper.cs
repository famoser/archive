using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Famoser.Typo3Crawler.Models;

namespace Famoser.Typo3Crawler.Helpers
{
    public class SaveHelper
    {
        public static List<Page> ParsePages(string fileName)
        {
            var res = new List<Page>();
            var lines = File.ReadAllLines(fileName);
            foreach (var line in lines)
            {
                if (!string.IsNullOrWhiteSpace(line))
                    res.Add(new Page(line));
            }
            return res;
        }
        public static void SavePages(string fileName, List<Page> pages)
        {
            var output = "";
            foreach (var page in pages)
            {
                output += page.SaveString() + "\n";
            }
            File.WriteAllText(fileName, output);
        }
    }
}
