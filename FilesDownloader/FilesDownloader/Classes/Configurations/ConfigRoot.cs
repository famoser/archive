using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FilesDownloader.Classes.Configurations
{
    public class ConfigRoot
    {
        public ConfigRoot()
        {
            Entries = new List<Entry>();
            ChangeDate = DateTime.Now.ToString("dd. MM. yyyy HH:mm");
        }

        public string Name { get; set; }
        public string Author { get; set; }
        public string ChangeDate { get; set; }

        public List<Entry> Entries { get; set; }
    }
}
