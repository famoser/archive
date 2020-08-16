using System;
using System.Threading.Tasks;
using Famoser.FrameworkEssentials.Logging;
using Famoser.FrameworkEssentials.Services;
using Famoser.Typo3Crawler.Models;

namespace Famoser.Typo3Crawler.Helpers
{
    public class Typo3Helper
    {
        public static async Task<string> GetMainPageVersion(Page page)
        {
            try
            {
                var service = new HttpService();
                var res = await service.DownloadAsync(new Uri(page.Url));
                var str = await res.GetResponseAsStringAsync();

                var metaStr = "<meta name=\"generator\" content=\"";
                if (str.Contains(metaStr))
                {
                    str = str.Substring(str.IndexOf(metaStr, StringComparison.Ordinal) + metaStr.Length);
                    str = str.Substring(0, str.IndexOf("\"", StringComparison.Ordinal));
                    return str;
                }
            }
            catch (Exception ex)
            {
                LogHelper.Instance.LogException(ex);
            }
            return "unknown";
        }
    }
}
