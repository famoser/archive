using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using FilesDownloader.Classes.Configurations;
using FilesDownloader.Helpers;
using Newtonsoft.Json;

namespace FilesDownloader.Converters
{
    public static class ConfigTextConverter
    {
        public static ConfigRoot TextToObject(string input)
        {
            try
            {
                return JsonConvert.DeserializeObject<ConfigRoot>(input) ?? new ConfigRoot();
            }
            catch (Exception ex)
            {
                return new ConfigRoot();
            }
        }

        public static ConfigRoot TryTextToObject(string input)
        {
            try
            {
                return JsonConvert.DeserializeObject<ConfigRoot>(input);
            }
            catch (Exception ex)
            {
                MessageHelper.ThrowException(ex);
                return null;
            }
        }

        public static string ObjectToText(ConfigRoot input)
        {
            return JsonConvert.SerializeObject(input, Formatting.Indented);
        }
    }
}
