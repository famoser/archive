using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Famoser.Backup.Business.Helpers
{
    public class FormatHelper
    {
        public static string ConvertToHumanReadbleFileSize(long count)
        {
            string[] sizes = { "B", "KB", "MB", "GB" };
            int order = 0;
            while (count >= 1024 && order + 1 < sizes.Length)
            {
                order++;
                count = count / 1024;
            }

            // Adjust the format string to your preferences. For example "{0:0.#}{1}" would
            // show a single decimal place, and no space.
            return $"{count:0.##} {sizes[order]}";
        }
    }
}
