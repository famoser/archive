using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Threading.Tasks;

namespace Famoser.Backup.Business.Services.Interfaces
{
    public interface IStorageService
    {
        string ReadOutFile(string fileName);

        bool WriteFile(string fileName, string fileContent);
    }
}
