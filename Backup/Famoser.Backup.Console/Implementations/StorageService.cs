using System;
using System.IO;
using Famoser.Backup.Business.Services.Interfaces;

namespace Famoser.Backup.Console.Implementations
{
    internal class StorageService  : IStorageService
    {
        public string ReadOutFile(string fileName)
        {
            if (File.Exists(Path.Combine(Environment.CurrentDirectory, fileName)))
            {
                return File.ReadAllText(Path.Combine(Environment.CurrentDirectory, fileName));
            }
            return null;
        }

        public bool WriteFile(string fileName, string fileContent)
        {
            try
            {
                File.WriteAllText(Path.Combine(Environment.CurrentDirectory, fileName), fileContent);
            }
            catch (Exception)
            {
                return false;
            }
            return true;
        }
    }
}
