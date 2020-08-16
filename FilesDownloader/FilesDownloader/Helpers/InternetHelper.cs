using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;

namespace FilesDownloader.Helpers
{
    public static class InternetHelper
    {
        public static string GetHtml(string link)
        {
            try
            {
                WebClient wc = new WebClient();
                wc.Credentials = new NetworkCredential("pp2016", "java2016");
                return wc.DownloadString(new Uri(link));
            }
            catch (Exception ex)
            {
                MessageHelper.Log("Download failed for " + link, ex);
            }
            return null;
        }

        public static int DownloadFiles(List<string> urls, string folder)
        {
            var successfull = 0;
            WebClient wc = new WebClient();
            foreach (var url in urls)
            {
                var filename = url.Substring(url.LastIndexOf("/", StringComparison.Ordinal) + 1);
                try
                {
                    wc.Credentials = new NetworkCredential("pp2016", "java2016");
                    wc.DownloadFile(new Uri(url), Path.Combine(folder, filename));
                    successfull++;
                    MessageHelper.Log("file downloaded: " + filename);
                }
                catch (Exception ex)
                {

                    MessageHelper.Log("Download failed for " + url, ex);
                }
            }
            return successfull;
        }
    }
}
