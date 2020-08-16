using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Net;
using System.IO;
using System.Diagnostics;
using System.Threading;

namespace CoverExplorer
{
    public partial class Update : Form
    {
        public Update()
        {
            InitializeComponent();
            Updateinfo.updatestart = false;
        }

        private void button2_Click(object sender, EventArgs e)
        {
            button2.Enabled = false;
            int updateenabled = 0;
            panel3.Visible = true;
            //update check
            string updateinfos = "";
            
            int index = 0;
            int error = 0;
            string info = "Unbekannter Fehler";
            string internetadresse = "http://www.florianmoser.square7.ch/updateinfoV0.10.txt";

            string zwischenspeicher = "";
            int versuch = 1;
            while (1 == 1)
            {
                try
                {
                    var webClient = new WebClient();
                    webClient.DownloadFile(internetadresse, Path.GetTempPath() + "updateinfo.txt");
                    break;
                }
                catch
                {
                    try
                    {
                        var checkInternet = new WebClient();
                        checkInternet.DownloadFile("http://www.google.com/index.html", zwischenspeicher);
                        versuch++;
                        if (versuch == 3)
                        {
                            info = "Updateserver nicht erreichbar!";
                            error = 1;
                            break;
                        }
                    }
                    catch
                    {
                        info = "Keine Internetverbindung!";
                        error = 1;
                        break;
                    }
                }
            }
            string path = Path.GetTempPath().ToString() + "updateinfo.txt";
            try
            {
                StreamReader streamReader = new StreamReader(path);
                updateinfos = streamReader.ReadToEnd();
                streamReader.Close();
            }
            catch 
            {
            }
            if (updateinfos.Contains("Aktuelle Version: 0.10"))
            {
                updateenabled = 0;
            }
            else if (updateinfos.Contains("Aktuelle Version:"))
            {
                updateenabled = 1;
                index = updateinfos.IndexOf("Aktuelle Version:");
            }
            else if (updateinfos == "")
            {
                //nicht heruntergeladen, aber info schon vorhanden
                updateenabled = 0;
            }
            else
            {
                updateenabled = 0;
                error = 1;
                info = "Updateinfo Datei ist defekt... \nIch empfehle, das Program \nmanuell neu herunterzuladen. Sorry!";
            }
           
            //update check ende
            if (updateenabled == 1)
            {
                panel3.Visible = false;
                panel1.Visible = true;
                label3.Text = "von Version " + Updateinfo.version + " zu Version " + updateinfos.Substring(index + 18, 3);
                //download + process starten
                internetadresse = updateinfos.Substring(index + 24);
                try
                {
                    var webClient = new WebClient();
                    webClient.DownloadFile(internetadresse, Path.GetTempPath() + "update.exe");
                }
                catch
                {
                    try
                    {
                        var checkInternet = new WebClient();
                        checkInternet.DownloadFile("http://www.google.com/index.html", zwischenspeicher);
                        versuch++;
                        if (versuch == 3)
                        {
                            info = "Updateserver nicht erreichbar!";
                            error = 1;
                        }
                    }
                    catch
                    {
                        info = "Keine Internetverbindung!";
                        error = 1;
                    }
                }
                if (error == 1)
                {
                    panel1.Visible = false;
                    panel3.Visible = false;
                    panel5.Visible = true;
                    label10.Text = info;
                }
                else
                {
                    label2.Text = " Download abgeschlossen";
                    Updateinfo.version = Convert.ToDouble(updateinfos.Substring(index + 18, 3));
                    //updaten
                    //updaten erfolgreich
                    button1.Text = "updaten!";
                    button1.Visible = true;
                    button3.Visible = false;
                }
            }
            else if (error == 1)
            {
                panel3.Visible = false;
                panel5.Visible = true;
                label10.Text = info;
            }
            else
            {
                panel3.Visible = false;
                panel2.Visible = true;
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            //funktion download unterbrehen!!
            button1.Visible = true;
            button3.Visible = false;
            panel1.Visible = false;
            panel5.Visible = true;
            label10.Text = "Update wurde abgebrochen";
        }

        private void button6_Click(object sender, EventArgs e)
        {
            //Update suchen abbrechen
            //Update suchen abgebrochen
            button5.Visible = true;
            button6.Visible = false;

        }

        private void button1_Click(object sender, EventArgs e)
        {
            Updateinfo.updatestart = true;
            Close();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void button5_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void button7_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void button8_Click(object sender, EventArgs e)
        {
            Close();
        }

    }
}
