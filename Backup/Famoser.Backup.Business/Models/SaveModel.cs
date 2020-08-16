using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Famoser.Backup.Business.Models
{
    public class SaveModel
    {
        public SaveModel()
        {
            ServiceConfigs = new List<ServiceConfig>();
        }

        public ApplicationConfig ApplicationConfig { get; set; }
        public List<ServiceConfig> ServiceConfigs { get; set; }
    }
}
