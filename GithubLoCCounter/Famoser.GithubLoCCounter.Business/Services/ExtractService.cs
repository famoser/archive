using System.Collections.Generic;
using System.IO;
using ICSharpCode.SharpZipLib.Core;
using ICSharpCode.SharpZipLib.GZip;
using ICSharpCode.SharpZipLib.Tar;

namespace Famoser.GithubLoCCounter.Busines.Services
{
    public class ExtractService
    {
        public List<string> FolderPaths = new List<string>(); 
        public void Execute(List<string> paths)
        {
            foreach (var path in paths)
            {
                var filename = Path.GetFileNameWithoutExtension(path);
                filename = filename.Substring(0, filename.Length - ".tar".Length);
                var directory = Path.GetDirectoryName(path);
                var targetDir = directory + "/" + filename;
                Directory.CreateDirectory(targetDir);
                ExtractGZipSample(path, targetDir);
                FolderPaths.Add(targetDir);
            }
        }

        private void ExtractGZipSample(string gzipFileName, string targetDir)
        {
            using (Stream inStream = File.OpenRead(gzipFileName))
            {
                using (var gzipStream = new GZipInputStream(inStream))
                {
                    using (TarArchive tarArchive = TarArchive.CreateInputTarArchive(gzipStream))
                    {
                        tarArchive.ExtractContents(targetDir);
                    }
                }
            }
        }
    }
}
