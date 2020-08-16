using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Famoser.Typo3Crawler.Models
{
    public class Page
    {
        public Page(string line)
        {
            Url = line.Contains(",") ? line.Split(new[] {","}, StringSplitOptions.None)[0] : line;
        }

        public string Url { get; set; }
        public string Typo3Version { get; set; }

        public string SaveString()
        {
            return Url + "," + Typo3Version;
        }
    }
}
