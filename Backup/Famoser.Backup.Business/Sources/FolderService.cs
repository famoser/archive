using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Authentication;
using System.Text;
using System.Threading.Tasks;
using Famoser.Backup.Business.Helpers;
using Famoser.Backup.Business.Services.Interfaces;
using Famoser.Backup.Business.Sources.Base;
using Famoser.Backup.Business.Sources.Interfaces;
using Ionic.Zip;
using Ionic.Zlib;
using Octokit;

namespace Famoser.Backup.Business.Sources
{
    internal class FolderService : CacheService, ISource
    {
        protected const string Folder = "Folder";
        protected const string Zipping = "Zipping";

        public FolderService(IConsoleService consoleService, IProgressService progressService, Dictionary<string, string> configuredKeyValues) : base(new Dictionary<string, string>()
        {
            {Folder, "Folder"},
            {Zipping, "Zip Folder (enter y if you want the folder to be zipped)"}
        }, consoleService, progressService, configuredKeyValues)
        {

        }

        public async Task<bool> Backup(string targetFolder)
        {
            try
            {
                ConsoleService.WriteToConsole("started Folder Service");

                try
                {
                    if (ConfiguredKeyValues[Zipping] == "y")
                    {
                        using (ZipFile zip = new ZipFile())
                        {
                            zip.AddProgress += ZipOnAddProgress;
                            zip.SaveProgress += ZipOnSaveProgress;
                            zip.AddDirectory(ConfiguredKeyValues[Folder]);
                            zip.CompressionLevel = CompressionLevel.BestCompression;
                            zip.Save(Path.Combine(targetFolder, "archive.zip"));
                            ConsoleService.WriteToConsole("");
                        }
                    }
                    else
                    {
                        //Now create all of the directories
                        foreach (string dirPath in Directory.GetDirectories(ConfiguredKeyValues[Folder], "*",
                            SearchOption.AllDirectories))
                            Directory.CreateDirectory(dirPath.Replace(ConfiguredKeyValues[Folder], targetFolder));

                        //Copy all the files & replaces any files with the same name
                        foreach (string newPath in Directory.GetFiles(ConfiguredKeyValues[Folder], "*.*",
                            SearchOption.AllDirectories))
                            File.Copy(newPath, newPath.Replace(ConfiguredKeyValues[Folder], targetFolder), true);
                    }
                }
                catch (Exception ex)
                {
                    ConsoleService.WriteToConsole("exception occured with folder " + ConfiguredKeyValues[Folder] + ": " + ex);
                    DoLog("failed: " + ConfiguredKeyValues[Folder] + " (exception occured)");
                }


                ConsoleService.WriteToConsole("finished Folder Service");

                return true;
            }
            catch (Exception ex)
            {
                ConsoleService.WriteToConsole("Exception occured");
                ConsoleService.WriteToConsole(ex.ToString());
            }
            finally
            {
                SaveLogs(targetFolder);
            }
            return false;
        }

        private void ZipOnSaveProgress(object sender, SaveProgressEventArgs saveProgressEventArgs)
        {
            ConsoleService.WriteSameLineToConsole("saving... (" + FormatHelper.ConvertToHumanReadbleFileSize(saveProgressEventArgs.BytesTransferred) + " / " + FormatHelper.ConvertToHumanReadbleFileSize(saveProgressEventArgs.TotalBytesToTransfer) + ")");
        }

        private void ZipOnAddProgress(object sender, AddProgressEventArgs addProgressEventArgs)
        {
            ConsoleService.WriteSameLineToConsole("saving... (" + FormatHelper.ConvertToHumanReadbleFileSize(addProgressEventArgs.BytesTransferred) + " / " + FormatHelper.ConvertToHumanReadbleFileSize(addProgressEventArgs.TotalBytesToTransfer) + ")");
        }
    }
}
