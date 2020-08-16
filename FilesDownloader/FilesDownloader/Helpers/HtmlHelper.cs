using System;
using System.CodeDom.Compiler;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace FilesDownloader.Helpers
{
    public static class HtmlHelper
    {
        public static List<string> GetPdfFiles(string html, string baseUrl)
        {
            //clean html

            //remove newlines
            html = html.Replace("\n", "");
            //remove comments
            Match match = Regex.Match(html, "<!--(.)+?-->");
            while (match.Success)
            {
                html = html.Replace(match.Value, "");
                match = match.NextMatch();
            }

            //extract links
            var res = new List<string>();
            match = Regex.Match(html, @"href=""([a-z0-9.\-_/:A-Z])+.pdf""");
            while (match.Success)
            {
                res.Add(match.Value);
                match = match.NextMatch();
            }

            if (!html.Contains("<base "))
                baseUrl = baseUrl.Substring(0, baseUrl.IndexOf("/", "http://".Length, StringComparison.Ordinal) + 1);

            if (baseUrl.EndsWith("index.html"))
                baseUrl = baseUrl.Substring(0, baseUrl.Length - "index.html".Length);

            if (baseUrl.EndsWith("/"))
                baseUrl = baseUrl.Substring(0, baseUrl.Length - 1);


            for (int index = 0; index < res.Count; index++)
            {
                res[index] = res[index].Substring("href=\"".Length);
                res[index] = res[index].Substring(0, res[index].Length - 1);
                if (!IsAbsoluteUrl(res[index]))
                {
                    if (!res[index].StartsWith("/"))
                        res[index] = "/" + res[index];
                    res[index] = baseUrl + res[index];
                }
            }
            return res;
        }

        private static bool IsAbsoluteUrl(string url)
        {
            Uri result;
            return Uri.TryCreate(url, UriKind.Absolute, out result);
        }
    }
}
