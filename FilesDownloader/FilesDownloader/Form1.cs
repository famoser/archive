using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using FilesDownloader.Classes.Configurations;
using FilesDownloader.Converters;
using FilesDownloader.Helpers;

namespace FilesDownloader
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            RuntimeVariables.ActiveForm = this;
            FillConfigSelector();
        }

        private void FillConfigSelector()
        {
            BindingSource bs = new BindingSource
            {
                DataSource = FileHelper.GetConfigFiles()
            };
            configSourceComboBox.DataSource = bs;
        }

        delegate void SetTextCallback(string text);
        public void AddTextToConsole(string text)
        {
            if (outputTextBox.InvokeRequired)
            {
                SetTextCallback d = AddTextToConsole;
                Invoke(d, text);
            }
            else
                outputTextBox.Text += text;
        }

        /// <summary>
        /// remove default values
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        private void newnametextbox_TextChanged(object sender, EventArgs e)
        {
            var tb = sender as TextBox;
            if (tb == null)
                return;

            if (tb == newconfigfilenametextbox)
                if (tb.Text == "new config file name")
                    tb.Text = "";

            if (tb == newnametextbox)
                if (tb.Text == "name")
                    tb.Text = "";

            if (tb == newurltextbox)
                if (tb.Text == "url")
                    tb.Text = "";

            if (tb == newfoldertextbox)
                if (tb.Text == "folder")
                    tb.Text = "";
        }

        private void addconfigfile_Click(object sender, EventArgs e)
        {
            try
            {
                File.Create(Path.Combine(FileHelper.GetConfigBasePath(), addconfigfile.Text + ".json"));
                FillConfigSelector();
            }
            catch (Exception ex)
            {
                MessageHelper.ThrowException(ex);
            }
        }

        private void refreshconfigstextbox_Click(object sender, EventArgs e)
        {
            FillConfigSelector();
        }

        private void addnewentrytextbox_Click(object sender, EventArgs e)
        {
            if (RuntimeVariables.ActiveConfig == null)
            {
                MessageHelper.SendMessage("Please open a configuration or create a new one first");
                return;
            }

            var newitem = new Entry()
            {
                Folder = newfoldertextbox.Text,
                Name = newnametextbox.Text,
                WebUrl = newurltextbox.Text
            };
            RuntimeVariables.ActiveConfig.Entries.Add(newitem);
            RefreshedActiveConfig();
        }

        private void configSourceComboBox_SelectedIndexChanged(object sender, EventArgs e)
        {
            var cb = sender as ComboBox;
            if (cb == null)
                return;

            var file = cb.SelectedItem as string;
            if (file == null)
                return;

            var content = File.ReadAllText(Path.Combine(FileHelper.GetConfigBasePath(), file));
            RuntimeVariables.ActiveConfig = ConfigTextConverter.TextToObject(content);
            RefreshedActiveConfig();
        }

        private void RefreshedActiveConfig()
        {
            configTextBox.Text = ConfigTextConverter.ObjectToText(RuntimeVariables.ActiveConfig);

            authortextbox.Text = RuntimeVariables.ActiveConfig.Author;
            nametextbox.Text = RuntimeVariables.ActiveConfig.Name;
            changedatetextbox.Text = RuntimeVariables.ActiveConfig.ChangeDate;
        }

        private bool _isRunning = false;
        private BackgroundWorker _worker;
        private void startstopbutton_Click(object sender, EventArgs e)
        {
            if (_worker != null)
            {
                _worker.CancelAsync();
                ResetViewAfterExecution();
            }
            else
            {
                var config = ConfigTextConverter.TryTextToObject(configTextBox.Text);
                if (config == null)
                    return;

                RuntimeVariables.ActiveConfig = config;

                PrepareViewForExecution();
                _worker = new BackgroundWorker();
                _worker.DoWork += WorkerOnDoWork;
                _worker.RunWorkerCompleted += WorkerOnRunWorkerCompleted;

                _worker.WorkerReportsProgress = true;
                _worker.ProgressChanged += WorkerOnProgressChanged;

                _worker.RunWorkerAsync();
            }

        }

        private void WorkerOnRunWorkerCompleted(object sender, RunWorkerCompletedEventArgs runWorkerCompletedEventArgs)
        {
            ResetViewAfterExecution();
            _worker = null;
        }

        private void WorkerOnProgressChanged(object sender, ProgressChangedEventArgs progressChangedEventArgs)
        {
            progressBar.Value++;
        }

        private void WorkerOnDoWork(object sender, DoWorkEventArgs doWorkEventArgs)
        {
            foreach (var entry in RuntimeVariables.ActiveConfig.Entries)
            {
                MessageHelper.Log("\nanalyzing for " + entry.Name);

                var res = InternetHelper.GetHtml(entry.WebUrl);
                if (res != null)
                {
                    MessageHelper.Log("downloaded: " + entry.WebUrl);
                    var newfiles = HtmlHelper.GetPdfFiles(res, entry.WebUrl);
                    if (newfiles != null)
                    {
                        MessageHelper.Log("found pdf's: " + newfiles.Count);
                        var oldfiles = FileHelper.GetPdfFiles(entry.Folder);
                        if (oldfiles != null)
                        {
                            var todownload = FileHelper.SortOutDownload(oldfiles, newfiles);
                            MessageHelper.Log("downloading files: " + todownload.Count);
                            var successfull = InternetHelper.DownloadFiles(todownload, entry.Folder);

                            MessageHelper.Log("downloaded files: " + successfull + " / " + todownload.Count);
                        }
                    }
                }
                _worker.ReportProgress(1);
            }
        }

        private void PrepareViewForExecution()
        {
            startstopbutton.Text = "stop";
            outputTextBox.Text = "starting...\n\n";
            progressBar.Maximum = RuntimeVariables.ActiveConfig.Entries.Count;
        }

        private void ResetViewAfterExecution()
        {
            startstopbutton.Text = "start";
            outputTextBox.Text += "\n\nterminated";
            progressBar.Value = 0;
        }

        private void oepnConfigurationFolderToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Process.Start(FileHelper.GetConfigBasePath());
        }

        private void saveconfigbutton_Click(object sender, EventArgs e)
        {
            var config = ConfigTextConverter.TryTextToObject(configTextBox.Text);
            if (config == null)
                return;

            RuntimeVariables.ActiveConfig = config;
            config.ChangeDate = DateTime.Now.ToString("dd. MM. yyyy HH:mm");
            config.Author = authortextbox.Text;
            config.Name = nametextbox.Text;

            configTextBox.Text = ConfigTextConverter.ObjectToText(config);
            
            File.WriteAllText(Path.Combine(FileHelper.GetConfigBasePath(),configSourceComboBox.SelectedItem.ToString()), configTextBox.Text);

        }
    }
}
