using Famoser.Backup.Business.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Famoser.Backup.Business.Sources.Interfaces
{
    internal interface ISource
    {
        Task<bool> Backup(string targetFolder);
    }
}
