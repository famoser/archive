using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Famoser.Backup.Business.Services.Interfaces;
using Newtonsoft.Json;

namespace Famoser.Backup.Business.Sources.Base
{
    internal abstract class CacheService : LoggingService
    {
        private const string DictionaryCacheFilename = "cache-dic.json";

        protected CacheService(Dictionary<string, string> allKeyValues, IConsoleService consoleService, IProgressService progressService, Dictionary<string, string> configuredKeyValues) : base(allKeyValues, consoleService, progressService, configuredKeyValues)
        {
        }

        protected Dictionary<string, string> ResolveDictionaryCache(string targetFolder)
        {
            try
            {
                if (File.Exists(Path.Combine(targetFolder, DictionaryCacheFilename)))
                {
                    ConsoleService.WriteToConsole("Cache information found");
                    var str = File.ReadAllText(Path.Combine(targetFolder, DictionaryCacheFilename));
                    return JsonConvert.DeserializeObject<Dictionary<string, string>>(str);
                }
                ConsoleService.WriteToConsole("No cache information found, creating...");
            }
            catch (Exception ex)
            {
                ConsoleService.WriteToConsole("Cache information invalid, creating...");
                ConsoleService.WriteToConsole("Exception occred while reading cache: " + ex);
            }
            return new Dictionary<string, string>();
        }

        protected bool Cache(string targetFolder, Dictionary<string, string> cache)
        {
            try
            {
                var str = JsonConvert.SerializeObject(cache);
                File.WriteAllText(Path.Combine(targetFolder, DictionaryCacheFilename), str);
                return true;
            }
            catch (Exception ex)
            {
                ConsoleService.WriteToConsole("Cache information could not be written");
                ConsoleService.WriteToConsole("Exception occred while writing cache: " + ex);
            }
            return false;
        }
    }
}
