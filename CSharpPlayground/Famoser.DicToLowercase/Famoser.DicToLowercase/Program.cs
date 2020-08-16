using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Famoser.DicToLowercase
{
    class Program
    {
        static void Main(string[] args)
        {
            var pfad = "C:\\Users\\famoser\\AppData\\Roaming\\Notepad++\\plugins\\config\\Hunspell\\de_CH";
            var lines = File.ReadAllLines(pfad + ".dic");
            for (var index = 0; index < lines.Length; index++)
            {
                var line = lines[index];
                if (!Char.IsLower(line[0]) && Char.IsLower(line[0]))
                {
                    lines[index] = Char.ToLower(line[0]) + line.Substring(1);
                }
            }
            File.WriteAllLines(pfad + "_all_small.dic", lines, Encoding.GetEncoding("ISO8859-1"));
        }
    }
}
