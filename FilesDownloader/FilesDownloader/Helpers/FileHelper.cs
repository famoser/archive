using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilesDownloader.Helpers
{
    public static class FileHelper
    {
        public static List<string> GetConfigFiles()
        {
            var list = new List<string>();
            var files = Directory.EnumerateFiles(GetConfigBasePath());
            foreach (var file in files)
            {
                if (file.EndsWith(".json"))
                    list.Add(file.Substring(file.LastIndexOf("\\", StringComparison.Ordinal) + 1));
            }
            return list;
        }

        public static List<string> GetPdfFiles(string path)
        {
            var list = new List<string>();
            if (!Directory.Exists(path))
            {
                MessageHelper.Log("directory not found: " + path);
                return null;
            }

            var files = Directory.EnumerateFiles(path);
            foreach (var file in files)
            {
                if (file.EndsWith(".pdf"))
                    list.Add(file.Substring(file.LastIndexOf("\\", StringComparison.Ordinal) + 1));
            }
            return list;
        }

        public static List<string> SortOutDownload(List<string> oldfiles, List<string> urls)
        {
            var newfiles = urls.Select(url => url.Substring(url.LastIndexOf("/", StringComparison.Ordinal) + 1)).ToList();
            var download = new List<string>();

            foreach (var newfile in newfiles)
            {
                if (!oldfiles.Contains(newfile))
                {
                    var index = newfiles.IndexOf(newfile);
                    download.Add(urls[index]);
                }
            }

            return download;
        }

        public static string GetConfigBasePath()
        {
            var direc = Path.Combine(Environment.CurrentDirectory, "config");
            if (!Directory.Exists(direc))
            {
                Directory.CreateDirectory(direc);
            }
            return direc;
        }
    }
}
