using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Famoser.Backup.Business.Helpers;
using Famoser.Backup.Business.Services.Interfaces;
using Famoser.Backup.Business.Sources.Base;
using Famoser.Backup.Business.Sources.Interfaces;
using FtpLib;
using Ionic.Zip;
using Ionic.Zlib;

namespace Famoser.Backup.Business.Sources
{
    internal class FtpService : CacheService, ISource
    {
        protected const string Folder = "Folder";
        protected const string ServerUrl = "ServerUrl";
        protected const string ServerUsername = "ServerUsername";
        protected const string ServerPassword = "ServerPassword";

        private const int MaxActiveConnections = 1;

        public FtpService(IConsoleService consoleService, IProgressService progressService, Dictionary<string, string> configuredKeyValues) : base(new Dictionary<string, string>()
        {
            {ServerUrl, "server url"},
            {ServerUsername, "server username"},
            {ServerPassword, "server password"},
            {Folder, "the relative ftp folder to backup"}
        }, consoleService, progressService, configuredKeyValues)
        {

        }

        private FtpConnection GetNewConnection()
        {
            var conn = new FtpConnection(ConfiguredKeyValues[ServerUrl], ConfiguredKeyValues[ServerUsername],
                ConfiguredKeyValues[ServerPassword]);
            return conn;
        }

        public async Task<bool> Backup(string targetFolder)
        {
            try
            {
                ConsoleService.WriteToConsole("started FTP Service");
                if (Directory.Exists(targetFolder))
                    Directory.Delete(targetFolder, true);

                Directory.CreateDirectory(targetFolder);

                try
                {

                    try
                    {
                        using (FtpConnection ftp = GetNewConnection())
                        {

                            ftp.Open(); /* Open the FTP connection */
                            ftp.Login(); /* Login using previously provided credentials */

                            ftp.SetCurrentDirectory(ConfiguredKeyValues[Folder]); /* change current directory */

                            DownloadDirectories(ftp, ftp.GetDirectories(), ConfiguredKeyValues[Folder], targetFolder);

                            Task.WaitAll(_downloadTasks.ToArray());
                            _downloadTasks.Clear();
                            _activeConnections = 0;
                        }
                    }
                    catch (FtpException e)
                    {
                        ConsoleService.WriteToConsole($"FTP Error: {e.ErrorCode} {e.Message}");
                        DoLog("FTP failed: " + ConfiguredKeyValues[Folder] + " (exception occured)");
                        return false;
                    }

                    ConsoleService.WriteToConsole("Zipping file contents");

                    var tempFileName = Guid.NewGuid().ToString();
                    try
                    {
                        using (ZipFile zip = new ZipFile())
                        {
                            zip.AddProgress += ZipOnAddProgress;
                            zip.SaveProgress += ZipOnSaveProgress;
                            zip.AddDirectory(targetFolder);
                            ConsoleService.WriteToConsole("");
                            zip.CompressionLevel = CompressionLevel.BestCompression;
                            zip.Save(Path.Combine(targetFolder, tempFileName));
                            ConsoleService.WriteToConsole("");
                        }
                    }
                    catch (Exception ex)
                    {
                        ConsoleService.WriteToConsole("Exception occurred: " + ex);
                        DoLog("failed: " + ConfiguredKeyValues[Folder] + " (exception occured)");
                        return false;
                    }

                    ConsoleService.WriteToConsole("Cleaning up...");
                    try
                    {
                        var dics = Directory.GetDirectories(targetFolder);
                        foreach (var dic in dics)
                        {
                            Directory.Delete(dic, true);
                        }

                        foreach (var file in Directory.GetFiles(targetFolder))
                        {
                            if (!file.EndsWith(tempFileName))
                                File.Delete(file);
                        }

                        File.Move(Path.Combine(targetFolder, tempFileName), Path.Combine(targetFolder, "archive.zip"));
                    }
                    catch (Exception ex)
                    {
                        ConsoleService.WriteToConsole("Exception occurred: " + ex);
                        DoLog("failed: " + ConfiguredKeyValues[Folder] + " (exception occured)");
                        return false;
                    }
                    return true;
                }
                catch (Exception ex)
                {
                    ConsoleService.WriteToConsole("exception occured with folder " + ConfiguredKeyValues[Folder] + ": " + ex);
                    DoLog("failed: " + ConfiguredKeyValues[Folder] + " (exception occured)");
                }


                ConsoleService.WriteToConsole("finished FTPService Service");

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
            ConsoleService.WriteSameLineToConsole("saving... (" + FormatHelper.ConvertToHumanReadbleFileSize(saveProgressEventArgs.BytesTransferred) + " / " + FormatHelper.ConvertToHumanReadbleFileSize(saveProgressEventArgs.TotalBytesToTransfer));
        }

        private void ZipOnAddProgress(object sender, AddProgressEventArgs addProgressEventArgs)
        {
            ConsoleService.WriteSameLineToConsole("saving... (" + FormatHelper.ConvertToHumanReadbleFileSize(addProgressEventArgs.BytesTransferred) + " / " + FormatHelper.ConvertToHumanReadbleFileSize(addProgressEventArgs.TotalBytesToTransfer));
        }

        private int _activeConnections = 0;

        private void DownloadFiles(FtpConnection ftp, FtpFileInfo[] files, string remotePath, string localPath)
        {
            foreach (var ftpFileInfo in files.Where(f => f.Name != "." && f.Name != ".."))
            {
                bool downloaded = false;
                int tries = 0;
                while (!downloaded && tries++ < 5)
                {
                    try
                    {
                        DownloadFile(ftp, ftpFileInfo, remotePath, localPath);
                        downloaded = true;
                    }
                    catch (Exception ex)
                    {
                        ConsoleService.WriteToConsole("Download failed for " + ftpFileInfo.Name + ", trying again (" + tries + ")");
                    }
                }
                if (!downloaded)
                {
                    ConsoleService.WriteToConsole("Download failed for " + ftpFileInfo.Name + ", not trying again");
                    DoLog("Download failed for " + remotePath + "/" + ftpFileInfo.Name + ", not trying again");
                }
            }
        }

        private void DownloadFile(FtpConnection ftp, FtpFileInfo ftpFileInfo, string remotePath, string localPath)
        {
            ConsoleService.WriteToConsole("Downloading " + ftpFileInfo.Name + " (" + FormatHelper.ConvertToHumanReadbleFileSize(ftp.GetFileSize(remotePath + "/" + ftpFileInfo.Name)) + ")");
            if (!Directory.Exists(localPath))
                Directory.CreateDirectory(localPath);

            var filePath = Path.Combine(localPath, ftpFileInfo.Name);
            if (File.Exists(filePath))
                File.Delete(filePath);
            ftp.GetFile(remotePath + "/" + ftpFileInfo.Name, filePath, false);
        }

        private List<Task> _downloadTasks = new List<Task>();

        private void DownloadDirectories(FtpConnection ftp, FtpDirectoryInfo[] dic, string remotePath, string localPath)
        {
            foreach (var ftpDirectoryInfo in dic.Where(d => d.Name != "." && d.Name != ".."))
            {
                if (_activeConnections < MaxActiveConnections)
                {
                    _activeConnections++;

                    _downloadTasks.Add(Task.Run(() =>
                    {
                        using (FtpConnection ftp2 = GetNewConnection())
                        {
                            ftp2.Open();
                            ftp2.Login();

                            ftp2.SetCurrentDirectory(remotePath + "/" + ftpDirectoryInfo.Name);

                            DownloadFiles(ftp2, ftp2.GetFiles(), remotePath + "/" + ftpDirectoryInfo.Name, Path.Combine(localPath, ftpDirectoryInfo.Name));
                            DownloadDirectories(ftp2, ftp2.GetDirectories(), remotePath + "/" + ftpDirectoryInfo.Name, Path.Combine(localPath, ftpDirectoryInfo.Name));
                        }
                    }));
                }
                else
                {
                    ftp.SetCurrentDirectory(remotePath + "/" + ftpDirectoryInfo.Name);
                    DownloadFiles(ftp, ftp.GetFiles(), remotePath + "/" + ftpDirectoryInfo.Name, Path.Combine(localPath, ftpDirectoryInfo.Name));
                    DownloadDirectories(ftp, ftp.GetDirectories(), remotePath + "/" + ftpDirectoryInfo.Name, Path.Combine(localPath, ftpDirectoryInfo.Name));
                }
            }
        }
    }
}
