using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Threading;

using System.IO;
using System.Diagnostics;

namespace CoverExplorer
{

    public partial class Form1 : Form
    {

        delegate void SetTextCallback(string text);

        public Form1()
        {
            InitializeComponent();
            // Einstellungen werden definiert

            Settings.Default.Webseite = "amazon";
            Anzeige.textboxchanged = false;
            Settings.Default.Debugmodus = false;
            Updateinfo.version = 0.20;
            //debugfenster
            if (Settings.Default.Debugmodus)
            {
                panel3.Visible = true;
            }

        }


        #region toolstrip menu items

        private void exitToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void aboutToolStripMenuItem_Click(object sender, EventArgs e)
        {
            About f2 = new About();
            f2.ShowDialog();
        }

        private void updateToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Update f2 = new Update();
            f2.ShowDialog();
        }

        private void einstellungenToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Einstellungen f2 = new Einstellungen();
            f2.ShowDialog();
        }

        private void hilfeToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            MessageBox.Show("Funktion noch nicht verfügbar");
        }

        #endregion

        #region Buttonfunktionen

        private void button1_Click(object sender, EventArgs e) //GetCover - Mainfunktion
        {
            if (Funktionen.Getcoveraktiv == false)
            {
                progressBar1.Maximum = ((listBox2.Items.Count * 4));
                InitializeGetCover("true"); 
                FormatButtons();
                Ausgabe(0,0);
                Thread getcover = new Thread(GetCover);
                getcover.Start();
            }
            else
            {
                InitializeGetCover("false");
            }

        }

        private void Dateienhinz_Click(object sender, EventArgs e)
        {
            if (openFileDialog1.ShowDialog() == DialogResult.OK)
                foreach (string file in openFileDialog1.FileNames)
                {
                    try
                    {
                        listBox2.Items.Add(file);
                        mp3.pfad.Add(file);
                    }
                    catch
                    {

                        MessageBox.Show("Cannot display the file: " + file.Substring(file.LastIndexOf('\\'))
                            + ". You may not have permission to read the file, or " +
                            "it may be corrupt.");
                    }
                }
            Funktionen.anzahl = listBox2.Items.Count;
            Thread getcover = new Thread(readmp3);
            getcover.Start();
            
        }
        public void readmp3()
        {
            mp3.ReadInfos(false);
            Ausgabe(Anzeige.indexaktiveselement, 0);
        }
        private void Listeleeren_Click(object sender, EventArgs e)
        {
            listBox2.Items.Clear();
            mp3.pfad = null;
            FormatButtons();
        }

        private void nachlinks_Click(object sender, EventArgs e)
        {
            if (Anzeige.textboxchanged)
            {
                if (DialogResult.Yes == MessageBox.Show("Änderungen werden nicht gespeichert. \nWollen Sie fortfahren?", "Achtung", MessageBoxButtons.YesNo, MessageBoxIcon.Warning, MessageBoxDefaultButton.Button3))
                {
                    Anzeige.textboxchanged = false;

                }
                else
                {
                    return;
                }
            }
            //status zurücksetzten
            progressBar1.Visible = true;
            label7.Visible = true;
            speichern.Visible = false;
            abbrechen.Visible = false;
            bearbeiten.Enabled = true;
            button13.Visible = false;
            optimize.Visible = false;
            textBox1.Enabled = false;
            textBox2.Enabled = false;
            textBox3.Enabled = false;
            textBox4.Enabled = false;
            textBox5.Enabled = false;
            textBox8.Enabled = false;
            textBox9.Enabled = false;
            textBox10.Enabled = false;




            nachrechts.Enabled = true;
            
            Anzeige.indexaktiveselement--;
            if (Anzeige.indexaktiveselement == 0)
            {
                nachlinks.Enabled = false;
            }
            listBox2.SelectedItem = Anzeige.indexaktiveselement;
            Ausgabe(Anzeige.indexaktiveselement,0);
        }

        private void nachrechts_Click(object sender, EventArgs e)
        {
            if (Anzeige.textboxchanged)
            {
                if (DialogResult.Yes == MessageBox.Show("Änderungen werden nicht gespeichert. \nWollen Sie fortfahren?", "Achtung", MessageBoxButtons.YesNo, MessageBoxIcon.Warning, MessageBoxDefaultButton.Button3))
                {
                    Anzeige.textboxchanged = false;
                }
                else
                {
                    return;
                }
            }
            //status zurücksetzten
            progressBar1.Visible = true;
            label7.Visible = true;
            speichern.Visible = false;
            abbrechen.Visible = false;
            button13.Visible = false;
            optimize.Visible = false;
            bearbeiten.Enabled = true;
            textBox1.Enabled = false;
            textBox2.Enabled = false;
            textBox3.Enabled = false;
            textBox4.Enabled = false;
            textBox5.Enabled = false;
            textBox8.Enabled = false;
            textBox9.Enabled = false;
            textBox10.Enabled = false;

            if (listBox2.Items.Count == 0)
            {
                nachlinks.Enabled = false;
                nachrechts.Enabled = false;
                FormatButtons();
                return;
            }
            else
            {
                nachlinks.Enabled = true;
            }

            Anzeige.indexaktiveselement++;
            while (Anzeige.indexaktiveselement > (listBox2.Items.Count - 1))
            {

                Anzeige.indexaktiveselement--;
            }

            if ((Anzeige.indexaktiveselement + 1) == listBox2.Items.Count)
            {
                nachrechts.Enabled = false;
            }
            listBox2.SelectedItem = Anzeige.indexaktiveselement;
            Ausgabe(Anzeige.indexaktiveselement,0);
        }

        private void speichern_Click(object sender, EventArgs e)
        {

            mp3.title[Anzeige.indexaktiveselement] = textBox1.Text;
            mp3.artist[Anzeige.indexaktiveselement] = textBox2.Text;
            mp3.album[Anzeige.indexaktiveselement] = textBox3.Text;
            mp3.albumartist[Anzeige.indexaktiveselement] = textBox4.Text;
            try
            {
                mp3.track[Anzeige.indexaktiveselement] = Convert.ToInt32(textBox5.Text);
            }
            catch
            {
                if (textBox5.Text == "")
                {
                }
                else
                {
                    MessageBox.Show("Der Track muss eine Zahl sein!"); return;
                }
            }
            try
            {
                mp3.year[Anzeige.indexaktiveselement] = Convert.ToInt32(textBox8.Text);
            }
            catch
            {
                if (textBox8.Text == "")
                {
                }
                else
                {
                    MessageBox.Show("Das Jahr muss eine Zahl sein (bevorzugt 4 stellig...)!"); return;
                }
            }

            mp3.genre[Anzeige.indexaktiveselement] = textBox9.Text;
            mp3.comment[Anzeige.indexaktiveselement] = textBox10.Text;

            Errorinfo.error = mp3.WriteInfos(Anzeige.indexaktiveselement);
            if (Errorinfo.error == "OK")
            {
                abbrechen.Enabled = true;
                speichern.Enabled = false;
                Anzeige.textboxchanged = false;

            }
            else
            {
                listBox1.Items.Add(Errorinfo.error);
            }
        }

        private void bearbeiten_Click(object sender, EventArgs e)
        {
            progressBar1.Visible = false;
            label7.Visible = false;
            speichern.Visible = true;
            speichern.Enabled = false;
            abbrechen.Visible = true;
            button13.Visible = true;
            optimize.Visible = true;
            textBox1.Enabled = true;
            textBox2.Enabled = true;
            textBox3.Enabled = true;
            textBox4.Enabled = true;
            textBox5.Enabled = true;
            bearbeiten.Enabled = false;
            textBox8.Enabled = true;
            textBox9.Enabled = true;
            textBox10.Enabled = true;
        }

        private void abbrechen_Click(object sender, EventArgs e)
        {
            if (Errorinfo.error == "OK")
            {
                Ausgabe(Anzeige.indexaktiveselement,Anzeige.indexaktivesalbumcover);
            }
            else
            {
                listBox1.Items.Add(Errorinfo.error);
            }

            progressBar1.Visible = true;
            label7.Visible = true;
            speichern.Visible = false;
            abbrechen.Visible = false;
            bearbeiten.Enabled = true;
            button13.Visible = false;
            optimize.Visible = false;
            textBox1.Enabled = false;
            textBox2.Enabled = false;
            textBox3.Enabled = false;
            textBox4.Enabled = false;
            textBox5.Enabled = false;
            textBox8.Enabled = false;
            textBox9.Enabled = false;
            textBox10.Enabled = false;
        }

        private void nachrechtscover_Click(object sender, EventArgs e)
        {
            Anzeige.indexaktivesalbumcover++;
            Ausgabe(Anzeige.indexaktiveselement, Anzeige.indexaktivesalbumcover);
        }
        
        private void nachlinkscover_Click(object sender, EventArgs e)
        {

            Anzeige.indexaktivesalbumcover--;
            Ausgabe(Anzeige.indexaktiveselement, Anzeige.indexaktivesalbumcover);
        }

        private void delcover_Click(object sender, EventArgs e)
        {
            if (MessageBox.Show("Möchten Sie dieses Albumcover wirklich löschen?", "Achtung", MessageBoxButtons.YesNo) == DialogResult.Yes)
            {
                mp3.albumcover[Anzeige.indexaktiveselement][Anzeige.indexaktivesalbumcover] = null;
                mp3.WriteInfos(Anzeige.indexaktiveselement);
                Ausgabe(Anzeige.indexaktiveselement, Anzeige.indexaktivesalbumcover);
            }
            else
            {
                return;
            }

        }

        private void Ordnerhinz_Click(object sender, EventArgs e)
        {
            if (folderBrowserDialog1.ShowDialog() == DialogResult.OK)
            {
                string folderName = folderBrowserDialog1.SelectedPath;
                DirectoryInfo diTop = new DirectoryInfo(folderName);
                try
                {
                    foreach (var fi in diTop.EnumerateFiles())
                    {
                        try
                        {
                            if (fi.Name.Contains(".mp3"))
                            {
                                listBox2.Items.Add(fi.FullName);
                                mp3.pfad.Add(fi.FullName);
                            }
                        }
                        catch { }
                    }
                    foreach (var di in diTop.EnumerateDirectories("*"))
                     {

                         try
                         {
                             foreach (var fi in diTop.EnumerateFiles("*", SearchOption.AllDirectories))
                             {
                                 try
                                 {
                                     if (fi.Name.Contains(".mp3"))
                                     {
                                         mp3.pfad.Add(fi.FullName);
                                         listBox2.Items.Add(fi.FullName);
                                     }
                                 }
                                 catch
                                 {
                                     MessageBox.Show("Ordner konnte nicht geöffnet werden.");
                                 }
                             }
                         }
                         catch
                         {

                             MessageBox.Show("Ordner konnte nicht geöffnet werden.");
                         }
                     }
                }
                catch { }
            }
            Funktionen.anzahl = listBox2.Items.Count;
            Thread getcover = new Thread(readmp3);
            getcover.Start();
        }

        private void button13_Click(object sender, EventArgs e)
        {
            Thread t = new Thread(GetCoverEinzeln);
            t.Start();
        }

        private void logleeren_Click(object sender, EventArgs e)
        {
            listBox1.Items.Clear();
        }

        #endregion

        private void listBox2_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyValue == 46)
            {
                //markierte elemente werden entfernt wenn del taste gedrückt wird
                while (listBox2.SelectedItems.Count >= 1)
                {
                    listBox2.Items.Remove(listBox2.SelectedItem);
                }

                FormatButtons();
                e.Handled = true;
            }

        }

        private void Form1_Activated(object sender, EventArgs e) //form reloaden?
        {
            if (Updateinfo.updatestart == true)                                                 //für eventuelle Updatefunktion
            {
                Process.Start(Path.GetTempPath() + "update.exe");
                Close();
            }
            if (Settings.Default.Debugmodus)
            {
                panel3.Visible = true;
                panel5.Visible = true;

            }
            else
            {
                panel3.Visible = false;
                panel5.Visible = false;
            }
        }

        private void pictureBox1_DragDrop(object sender, DragEventArgs e)
        {
            // source: http://www.codeproject.com/Articles/16905/Drag-and-Drop-Image-in-C-NET modifiziert
            if (e.Data.GetDataPresent(DataFormats.Bitmap))
            {
                e.Effect = DragDropEffects.Copy;
                mp3.albumcover[Anzeige.indexaktiveselement].Add((Bitmap)e.Data.GetData(DataFormats.Bitmap));
                FormatButtons();
                Ausgabe(Anzeige.indexaktiveselement, mp3.albumcover[Anzeige.indexaktiveselement].Count - 1);
            }
            else
            {
                e.Effect = DragDropEffects.None;
            }
        }

        private void textBox_TextChanged(object sender, EventArgs e)
        {
            Anzeige.textboxchanged = true;
            speichern.Enabled = true;
        }

        public void Ausgabe(int file, int cover)
        {
            while (file >= mp3.pfad.Count())
            {
                file--;
            }
            Anzeige.indexaktiveselement = file;
            if (file > -1)
            {
                SetTexttextbox1(mp3.title[file]);
                SetTexttextbox2(mp3.artist[file]);
                SetTexttextbox3(mp3.album[file]);
                SetTexttextbox4(mp3.albumartist[file]);
                SetTexttextbox5(mp3.track[file].ToString());
                SetTexttextbox8(mp3.year[file].ToString());
                SetTexttextbox9(mp3.genre[file]);
                SetTexttextbox10(mp3.comment[file]);
                SetTextlabel7((Anzeige.indexaktiveselement + 1).ToString() + "/" + listBox2.Items.Count.ToString());
                SetTexttextbox7(mp3.dateiname[file]);
                while (cover >= mp3.albumcover[file].Count())
                {
                    cover--;
                }
                Anzeige.indexaktivesalbumcover = cover;
                if (cover > -1)
                {
                    pictureBox1.Image = mp3.albumcover[file][cover];
                }
            }
            else
            {
                Anzeige.indexaktivesalbumcover = -1;
            }
            FormatButtons();
        }


        


        private void FormatButtons()
        {
            if (Anzeige.indexaktiveselement != -1)
            {
                if (Anzeige.indexaktiveselement > 0)
                {
                    Enablenachlinks("true");
                }
                else
                {
                    Enablenachlinks("false");
                }
                if (Anzeige.indexaktiveselement < mp3.pfad.Count() - 1)
                {
                    Enablenachrechts("true");
                }
                else
                {
                    Enablenachrechts("false");
                }
                if (Anzeige.indexaktivesalbumcover > 0)
                {
                    Enablenachlinkscover("true");
                }
                else
                {
                    Enablenachlinkscover("false");
                }

                if (Anzeige.indexaktivesalbumcover < mp3.albumcover[Anzeige.indexaktiveselement].Count() - 1)
                {
                    Enablenachrechtscover("true");
                }
                else
                {
                    Enablenachrechtscover("false");
                }
                if (mp3.albumcover[Anzeige.indexaktiveselement].Count() > 0)
                {
                    Enabledelcover("true");
                }
                else
                {
                    Enabledelcover("false");
                }
            }
            else //die ganze Anzeige zurücksetzen
            {
                SetTexttextbox1("");
                SetTexttextbox10("");
                SetTexttextbox18("");
                SetTexttextbox19("");
                SetTexttextbox2("");
                SetTexttextbox20("");
                SetTexttextbox21("");
                SetTexttextbox3("");
                SetTexttextbox4("");
                SetTexttextbox5("");
                SetTexttextbox6("");
                SetTexttextbox7("");
                SetTexttextbox8("");
                SetTexttextbox9("");
                SetTextlabel7("0/0");
                SetTextHTMLCodeTextBox1("");
                Enablebearbeiten("false");
                Enablenachlinks("false");
                Enablenachrechts("false");
                Enabledelcover("false");
                try
                {
                    pictureBox1.Image = null;
                    nachlinkscover.Visible = false;
                    nachrechtscover.Visible = false;
                    progressBar1.Visible = true;
                    label7.Visible = true;
                    textBox1.Enabled = false;
                    textBox2.Enabled = false;
                    textBox3.Enabled = false;
                    textBox4.Enabled = false;
                    textBox5.Enabled = false;
                    textBox8.Enabled = false;
                    textBox9.Enabled = false;
                    textBox10.Enabled = false;
                    speichern.Visible = false;
                    bearbeiten.Visible = false;
                    abbrechen.Visible = false;
                    nachrechtscover.Visible = false;
                    nachlinkscover.Visible = false;
                    button13.Visible = false;
                    optimize.Visible = false;
                    delcover.Enabled = false;
                    nachrechts.Enabled = false;
                    nachlinks.Enabled = false;
                    bearbeiten.Enabled = false;
                }
                catch { }
            }
        }

        private void listBox2_Click(object sender, EventArgs e)
        {
            Ausgabe(listBox2.SelectedIndex,0);

                /*progressBar1.Visible = true;
                label7.Visible = true;
                speichern.Visible = false;
                abbrechen.Visible = false;
                button13.Visible = false;
                optimize.Visible = false;
                bearbeiten.Enabled = true;
                textBox1.Enabled = false;
                textBox2.Enabled = false;
                textBox3.Enabled = false;
                textBox4.Enabled = false;
                textBox5.Enabled = false;
                textBox8.Enabled = false;
                textBox9.Enabled = false;
                textBox10.Enabled = false;*/
        }

        private void listBox2_SelectedIndexChanged(object sender, EventArgs e)
        {
            Ausgabe(listBox2.SelectedIndex,0);
        }

        public void GetCover()
        {
            //Darstellung
            AddItemListBox1("GetCover gestartet...");
            EmptyItemsListBox1("s");
            SetTextlabel7("0/" + listBox2.Items.Count);
            Ausgabe(0,0);
            for (int i = 0; i < mp3.pfad.Count(); i++)
			{
                SetTextlabel7((i + 1).ToString() + "/" + mp3.pfad.Count());
                Progressbar1("++");
                AddItemListBox1("Datei: " + mp3.dateiname[i]);
                Dateien.Optimus(i);
                Progressbar1("++");
                Errorinfo.error = SucheCover(i);
                if (Errorinfo.error == "OK")
                {
                    Progressbar1("++");
                    Errorinfo.error = mp3.WriteInfos(i);
                    if (Errorinfo.error == "OK")
                    {
                        Ausgabe(i,0);
                        Progressbar1("++");
                        AddItemListBox1("............erfolgreich!");
                    }
                    else
                    {
                        Ausgabe(i, 0);
                        Progressbar1("++");
                        AddItemListBox1(Errorinfo.error);
                    }
                }
                else
                {
                    Ausgabe(i, 0);
                    Progressbar1("++");
                    Progressbar1("++");
                    AddItemListBox1(Errorinfo.error);
                }
            }

            if (listBox1.Items.Count == listBox2.Items.Count*2)
            {
                MessageBox.Show("Vorgang erfolgreich abgeschlossen!");
            }
            else
            {
                MessageBox.Show("Es traten eines oder mehrere Probleme bei der Verarbeitung auf. \nFür nährere Informationen öffnen Sie bitte das Debug-Fenster\n(aktivierbar in Einstellungen -> Optionen)");
            }

            InitializeGetCover("false");
            EnableButton1("true");
            SetTextButton1("Get Cover!");
            FormatButtons();
        }

        public void GetCoverEinzeln()
        {
                AddItemListBox1("Datei: " + mp3.dateiname[Anzeige.indexaktiveselement]);
                Errorinfo.error = SucheCover(Anzeige.indexaktiveselement);
                Progressbar1("--"); 
                Progressbar1("--");
                if (Errorinfo.error == "OK")
                {
                    Errorinfo.error = mp3.WriteInfos(Anzeige.indexaktiveselement);
                    if (Errorinfo.error == "OK")
                    {
                        AddItemListBox1("............erfolgreich!");
                    }
                    else
                    {
                        AddItemListBox1(Errorinfo.error);
                    }
            }
            
        }

        public string SucheCover(int a)
        {
            //Schlagworte definieren
            string schlagworte;
            if (mp3.album[a] != "")
            {
                if (mp3.albumartist[a] != "")
                {
                    schlagworte = (mp3.albumartist[a] + " " + mp3.album[a]);
                }
                else
                {
                    if (mp3.artist[a] != "")
                    {
                        schlagworte = (mp3.artist[a] + " " + mp3.album[a]);
                    }
                    else
                    {
                        schlagworte = mp3.album[a];
                    }
                }
            }
            else if (mp3.artist[a] != "")
            {
                if (mp3.title[a] != "")
                {
                    schlagworte = (mp3.artist[a] + " " + mp3.title[a]);
                }
                schlagworte = mp3.artist[a];
            }
            else if (mp3.albumartist[a] != "")
            {
                if (mp3.title[a] != "")
                {
                    schlagworte = (mp3.albumartist[a] + " " + mp3.title[a]);
                }
                schlagworte = mp3.albumartist[a];
            }
            else if (mp3.title[a] != "")
            {
                schlagworte = mp3.title[a].ToLower();
            }
            else
            {
                return "Datei hat keine Tags";
            }
            string textdatei = File.ReadAllText(Application.StartupPath + "\\searchengines\\" + Settings.Default.Webseite + ".txt");
            string[] einstellungen = new string[0];
            int i = 0;
            foreach (var row in textdatei.Split('\n'))
            {
                Array.Resize(ref einstellungen, einstellungen.Length + 1);
                einstellungen[i] = row;
                i++;
            }
            string internetadresse = einstellungen[0];
            if (internetadresse.Contains("<schlagworte>"))
            {
                internetadresse.Replace("<schlagworte>", schlagworte.Replace(" ", einstellungen[1]));
                Errorinfo.error = Internet.GetHtmlCode(internetadresse);

                if (Errorinfo.error == "OK")
                {
                    string bildURL;
                    try
                    {
                        bildURL = Funktionen.htmlcode.Substring(Funktionen.htmlcode.IndexOf(einstellungen[2]));
                        bildURL.Replace(bildURL.Substring(bildURL.IndexOf(".jpg" + 4)), "");
                        bildURL.Substring(bildURL.IndexOf(einstellungen[3] + einstellungen[3].Length));
                        for (i = 3; i < einstellungen.Length; i++)
                        {
                            if (einstellungen[i].Contains("remove"))
                            {
                                bildURL.Replace(einstellungen[i].Substring(6), "");
                            }
                            else if (einstellungen[i].Contains("addbefore"))
                            {
                                bildURL = einstellungen[i].Substring(9) + bildURL;
                            }
                            else if (einstellungen[i].Contains("addafter"))
                            {
                                bildURL = bildURL + einstellungen[i].Substring(8);
                            }
                            else
                            {
                                Errorinfo.warnung = Errorinfo.warnung + "/n Fehler auf Zeile " + (i + 1).ToString() + " der Datei \\searchengines\\" + Settings.Default.Webseite + ".txt";
                            }
                        }
                    }
                    catch
                    {
                        return Errorinfo.error;
                    }
                    Errorinfo.error = Internet.GetPicture(bildURL,a);
                    Progressbar1("++");
                    if (Errorinfo.error == "OK")
                    {
                        Progressbar1("++");
                        return "OK";
                    }
                    else
                    {
                        Progressbar1("++");
                        return Errorinfo.error;
                    }
                }
                else
                {
                    Progressbar1("++");
                    Progressbar1("++");
                    return Errorinfo.error;
                }
            }
            else
            {
                Progressbar1("++");
                Progressbar1("++");
                return "Suchmaschienendatei " + Settings.Default.Webseite + " falsch konfiguriert! Lies bitte die Anleitung.txt nocheinmal genau durch";
            }

        }

        private void InitializeGetCover(string trueorfalse)
        {
            if (trueorfalse == "true")
            {
                Funktionen.Getcoveraktiv = true;
                Enablelistbox2("false");
                Enablenachlinks("false");
                Enablenachrechts("false");
                EnableOrdnerhinz("false");
                EnableDateienhinz("false");
                SetTextButton1("Abbrechen");
                EnableListeleeren("false");
                Progressbar1("0");
            }
            else
            {
                Funktionen.Getcoveraktiv = false;
                Enablelistbox2("true");
                EnableOrdnerhinz("true");
                EnableDateienhinz("true");
                EnableButton1("false");
                EnableListeleeren("true");
                Progressbar1("100");
                if (Anzeige.indexaktiveselement == 0)
                {
                    Enablenachlinks("false");
                }
                else if (listBox2.Items.Count > 1)
                {
                    Enablenachlinks("true");
                }

                if (Anzeige.indexaktiveselement == (listBox2.Items.Count - 1))
                {
                    Enablenachrechts("false");
                }
                else if (listBox2.Items.Count > 1)
                {
                    Enablenachrechts("true");
                }
            }
        }

        #region Ausgabe mit InvokeRequired

        //Quelle für invoke Verfahren: Microsoft Help Viewer 1.1; Visual c#
        private void SetTexttextbox1(string text)
        {
            if (this.textBox1.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox1);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox1.Text = text;
            }
        }
        private void SetTexttextbox2(string text)
        {
            if (this.textBox2.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox2);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox2.Text = text;
            }
        }
        private void SetTexttextbox3(string text)
        {
            if (this.textBox3.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox3);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox3.Text = text;
            }
        }
        private void SetTexttextbox4(string text)
        {
            if (this.textBox4.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox4);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox4.Text = text;
            }
        }
        private void SetTexttextbox5(string text)
        {
            if (this.textBox5.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox5);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox5.Text = text;
            }
        }
        private void SetTexttextbox6(string text)
        {
            if (this.textBox6.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox6);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox6.Text = text;
            }
        }
        private void SetTexttextbox7(string text)
        {
            if (this.textBox7.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox7);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox7.Text = text;
            }
        }
        private void SetTexttextbox8(string text)
        {
            if (this.textBox8.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox8);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox8.Text = text;
            }
        }
        private void SetTexttextbox9(string text)
        {
            if (this.textBox9.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox9);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox9.Text = text;
            }
        }
        private void SetTexttextbox10(string text)
        {
            if (this.textBox10.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox10);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox10.Text = text;
            }
        }
        private void SetTexttextbox18(string text)
        {
            if (this.textBox18.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox18);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox18.Text = text;
            }
        }
        private void SetTexttextbox19(string text)
        {
            if (this.textBox19.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox19);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox19.Text = text;
            }
        }
        private void SetTexttextbox20(string text)
        {
            if (this.textBox20.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox20);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox20.Text = text;
            }
        }
        private void SetTexttextbox21(string text)
        {
            if (this.textBox21.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTexttextbox21);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.textBox21.Text = text;
            }
        }
        private void SetTextHTMLCodeTextBox1(string text)
        {
            if (this.HTMLCodeTextBox1.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTextHTMLCodeTextBox1);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.HTMLCodeTextBox1.Text = text;
            }
        }
        private void SetTextlabel7(string text)
        {
            if (this.label7.InvokeRequired)
            {

                SetTextCallback d = new SetTextCallback(SetTextlabel7);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.label7.Text = text;
            }
        }
        private void AddItemListBox1(string text)
        {
            if (this.listBox1.InvokeRequired)
            {

                SetTextCallback d = new SetTextCallback(AddItemListBox1);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.listBox1.Items.Add(text);
            }
        }
        private void OverwriteItemListBox2(string text)
        {
            if (this.listBox2.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(OverwriteItemListBox2);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                this.listBox2.Items[Anzeige.indexaktiveselement] = mp3.pfad;
            }
        }
        private void EmptyItemsListBox1(string s)
        {
            if (this.listBox1.InvokeRequired)
            {

                SetTextCallback d = new SetTextCallback(EmptyItemsListBox1);
                this.Invoke(d, new object[] { "delete" });
            }
            else
            {
                this.listBox1.Items.Clear();
            }
        }
        private void Enablelistbox2(string text)
        {
            if (this.listBox2.InvokeRequired)
            {

                SetTextCallback d = new SetTextCallback(Enablelistbox2);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                if (text == "true")
                {
                    listBox2.Enabled = true;
                }
                else
                {
                    listBox2.Enabled = false;
                }
            }
        }
        private void EnableButton1(string s)
        {
            if (this.button1.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(EnableButton1);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    button1.Enabled = true;
                }
                else
                {
                    button1.Enabled = false;
                }
            }
        }
        private void SetTextButton1(string text)
        {
            if (this.button1.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(SetTextButton1);
                this.Invoke(d, new object[] { text });
            }
            else
            {
                button1.Text = text;
            }
        }
        private void EnableDateienhinz(string s)
        {
            if (this.Dateienhinz.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(EnableDateienhinz);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    Dateienhinz.Enabled = true;
                }
                else
                {
                    Dateienhinz.Enabled = false;
                }
            }
        }
        private void EnableListeleeren(string s)
        {
            if (this.Listeleeren.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(EnableListeleeren);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    Listeleeren.Enabled = true;
                }
                else
                {
                    Listeleeren.Enabled = false;
                }
            }
        }
        private void Enablenachlinks(string s)
        {
            if (this.nachlinks.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(Enablenachlinks);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    nachlinks.Enabled = true;
                }
                else
                {
                    nachlinks.Enabled = false;
                }
            }
        }
        private void Enablenachrechts(string s)
        {
            if (this.nachrechts.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(Enablenachrechts);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    nachrechts.Enabled = true;
                }
                else
                {
                    nachrechts.Enabled = false;
                }
            }
        }
        private void Enablebearbeiten(string s)
        {
            if (this.bearbeiten.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(Enablebearbeiten);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    bearbeiten.Enabled = true;
                }
                else
                {
                    bearbeiten.Enabled = false;
                }
            }
        }
        private void Visiblebearbeiten(string s)
        {
            if (this.bearbeiten.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(Visiblebearbeiten);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    bearbeiten.Visible = true;
                }
                else
                {
                    bearbeiten.Visible = false;
                }
            }
        }
        private void Enablenachrechtscover(string s)
        {
            if (this.nachrechtscover.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(Enablenachrechtscover);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    nachrechtscover.Enabled = true;
                }
                else
                {
                    nachrechtscover.Enabled = false;
                }
            }
        }
        private void Visiblenachrechtscover(string s)
        {
            if (this.nachrechtscover.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(Visiblenachrechtscover);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    nachrechtscover.Visible = true;
                }
                else
                {
                    nachrechtscover.Visible = false;
                }
            }
        }
        private void Enablenachlinkscover(string s)
        {
            if (this.nachlinkscover.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(Enablenachlinkscover);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    nachlinkscover.Enabled = true;
                }
                else
                {
                    nachlinkscover.Enabled = false;
                }
            }
        }
        private void Visiblenachlinkscover(string s)
        {
            if (this.nachlinkscover.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(Visiblenachlinkscover);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    nachlinkscover.Visible = true;
                }
                else
                {
                    nachlinkscover.Visible = false;
                }
            }
        }
        private void Enabledelcover(string s)
        {
            if (this.delcover.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(Enabledelcover);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    delcover.Enabled = true;
                }
                else
                {
                    delcover.Enabled = false;
                }
            }
        }
        private void EnableOrdnerhinz(string s)
        {
            if (this.Ordnerhinz.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(EnableOrdnerhinz);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "true")
                {
                    Ordnerhinz.Enabled = true;
                }
                else
                {
                    Ordnerhinz.Enabled = false;
                }
            }
        }
        private void Progressbar1(string s)
        {
            if (this.progressBar1.InvokeRequired)
            {
                SetTextCallback d = new SetTextCallback(Progressbar1);
                this.Invoke(d, new object[] { s });
            }
            else
            {
                if (s == "++")
                {
                    if (progressBar1.Value == progressBar1.Maximum)
                    {
                    }
                    else
                    {
                        progressBar1.Value++;
                    }
                }
                else if (s == "0")
                {
                    progressBar1.Value = 0;
                }
                else if (s == "100")
                {
                    progressBar1.Value = progressBar1.Maximum;
                }
                else if (s == "--")
                {
                    progressBar1.Value--;
                }
            }
        }

        #endregion  //Ausgabefunktionene mit InvokeRequired//Ausgabefunktionene mit InvokeRequired//Ausgabefunktionene mit InvokeRequired

        #region tooldstrip_imagebox

        private void pictureBox1_MouseClick(object sender, MouseEventArgs e)
        {
            if (e.Button == MouseButtons.Right)
            {
                if (Clipboard.ContainsImage())
                {
                    ausZwischablageToolStripMenuItem.Enabled = true;
                    contextMenuStrip1.Show(MousePosition);
                }
                else
                {
                    ausZwischablageToolStripMenuItem.Enabled = false;
                    contextMenuStrip1.Show(MousePosition);
                }
                if (mp3.albumcover[Anzeige.indexaktiveselement] == null)
                {
                    alleCoversLöschenToolStripMenuItem.Enabled = false;
                    ausschneidenToolStripMenuItem.Enabled = false;
                    coverKopierenToolStripMenuItem.Enabled = false;
                }
                else
                {
                    alleCoversLöschenToolStripMenuItem.Enabled = true;
                    ausschneidenToolStripMenuItem.Enabled = true;
                    coverKopierenToolStripMenuItem.Enabled = true;
                }
            }
            else if (e.Button == MouseButtons.Left)
            {
                if (Anzeige.indexaktivesalbumcover == -1)
                {
                }
                else
                {
                    PopUpMuster f = new PopUpMuster();
                    f.ShowDialog();
                }
            }
        }

        private void alleCoversLöschenToolStripMenuItem_Click(object sender, EventArgs e)
        {
            mp3.albumcover[Anzeige.indexaktiveselement] = null;
            Ausgabe(Anzeige.indexaktiveselement, 0);
        }

        private void hinzufügenUndAlleErsetztenToolStripMenuItem_Click(object sender, EventArgs e)
        {

            if (Clipboard.ContainsImage())
            {
                mp3.albumcover[Anzeige.indexaktiveselement] = null;
                mp3.albumcover[Anzeige.indexaktiveselement].Add(Clipboard.GetImage());
                Ausgabe(Anzeige.indexaktiveselement, 0);
            }
            else
            {
                MessageBox.Show("Kein Bild in der Zwischenabalge!");

            }
        }

        private void hinzufügenUndErsetztenToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (Clipboard.ContainsImage())
            {
                mp3.albumcover[Anzeige.indexaktiveselement][Anzeige.indexaktivesalbumcover] = Clipboard.GetImage();
                Ausgabe(Anzeige.indexaktiveselement,Anzeige.indexaktivesalbumcover);
            }
            else
            {
                MessageBox.Show("Kein Bild in der Zwischenabalge!");

            }
        }

        private void hinzufügenToolStripMenuItem_Click(object sender, EventArgs e)
        {
            if (Clipboard.ContainsImage())
            {
                mp3.albumcover[Anzeige.indexaktiveselement].Add(Clipboard.GetImage());
                Ausgabe(Anzeige.indexaktiveselement, mp3.albumcover[Anzeige.indexaktiveselement].Count()-1);
            }
            else
            {
                MessageBox.Show("Kein Bild in der Zwischenabalge!");
            }
        }

        private void coverKopierenToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Clipboard.SetImage(mp3.albumcover[Anzeige.indexaktiveselement][Anzeige.indexaktivesalbumcover]);
        }

        private void ausschneidenToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Clipboard.SetImage(mp3.albumcover[Anzeige.indexaktiveselement][Anzeige.indexaktivesalbumcover]);
            mp3.albumcover[Anzeige.indexaktiveselement][Anzeige.indexaktivesalbumcover] = null;
            Ausgabe(Anzeige.indexaktiveselement,Anzeige.indexaktivesalbumcover);
        }

        #endregion

        private void pictureBox1_DragEnter(object sender, DragEventArgs e)
        {
            
        }

        private void optimize_Click(object sender, EventArgs e)
        {
            if (Anzeige.textboxchanged)
            {
                if (DialogResult.Yes == MessageBox.Show("Änderungen werden nicht gespeichert. \nWollen Sie fortfahren?", "Achtung", MessageBoxButtons.YesNo, MessageBoxIcon.Warning, MessageBoxDefaultButton.Button3))
                {
                    Anzeige.textboxchanged = false;
                }
                else
                {
                    return;
                }
            }
            FormatButtons();
            Dateien.Optimus(Anzeige.indexaktiveselement);
            Errorinfo.error = mp3.WriteInfos(Anzeige.indexaktiveselement);
            if (Errorinfo.error=="OK")
            {
                Ausgabe(Anzeige.indexaktiveselement,Anzeige.indexaktivesalbumcover);
            }
            else
            {
                AddItemListBox1(Errorinfo.error);
            }
        }
    }
}
