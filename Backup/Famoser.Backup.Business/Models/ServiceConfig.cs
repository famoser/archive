using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Famoser.Backup.Business.Models
{
    public class ServiceConfig
    {
        public ServiceConfig()
        {
            Configuration = new Dictionary<string, string>();
        }

        public string ServiceName { get; set; }
        public string TargetFolder { get; set; }
        public Dictionary<string, string> Configuration { get; set; }
        public bool Skip { get; set; }

        [JsonIgnore]
        public object Instance { get; set; }
    }
}
