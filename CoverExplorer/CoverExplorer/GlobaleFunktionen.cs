using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Drawing;
using System.Drawing.Drawing2D;
using System.Net;
using System.IO;

namespace CoverExplorer
{
    static class Internet
    {
        public static string GetPicture(string internetadresse, int a)
        {
            byte[] lnBuffer;
            byte[] lnFile;

            HttpWebRequest lxRequest = (HttpWebRequest)WebRequest.Create(internetadresse);
            using (HttpWebResponse lxResponse = (HttpWebResponse)lxRequest.GetResponse())
            {
                using (BinaryReader lxBR = new BinaryReader(lxResponse.GetResponseStream()))
                {
                    using (MemoryStream lxMS = new MemoryStream())
                    {
                        lnBuffer = lxBR.ReadBytes(1024);
                        while (lnBuffer.Length > 0)
                        {
                            lxMS.Write(lnBuffer, 0, lnBuffer.Length);
                            lnBuffer = lxBR.ReadBytes(1024);
                        }
                        lnFile = new byte[(int)lxMS.Length];
                        lxMS.Position = 0;
                        lxMS.Read(lnFile, 0, lnFile.Length);
                        lxMS.Close();
                        lxBR.Close();
                    }
                }
                lxResponse.Close();
            }
            mp3.albumcoverpfad[a].Add(Path.GetTempPath() + mp3.dateiname[a].GetHashCode() + System.DateTime.Now.GetHashCode() + "_" + "albumcover.jpg");
            using (System.IO.FileStream lxFS = new FileStream(mp3.albumcoverpfad[a][mp3.albumcoverpfad[a].Count()-1], FileMode.Create))
            {
                lxFS.Write(lnFile, 0, lnFile.Length);
                lxFS.Close();
            }
            mp3.albumcover[a].Add((Bitmap)Image.FromFile(mp3.albumcoverpfad[a][mp3.albumcoverpfad[a].Count()-1]));
            return "OK";
        }

        public static string GetHtmlCode(string internetadresse)
        {
            int versuch = 1;
            string zwischenspeicher = "";
            while (1 == 1)
            {
                try
                {
                    var webClient = new WebClient();
                    webClient.DownloadFile(internetadresse, Path.GetTempPath() + "htmlcode.htm");
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
                            return "GetHtmlCode(): Server nicht erreichbar!";
                        }
                    }
                    catch
                    {
                        return "GetHtmlCode(): Keine Internetverbindung!";
                    }
                }
            }
                
            StreamReader streamReader = new StreamReader(Path.GetTempPath().ToString() + "htmlcode.htm");
            Funktionen.htmlcode = streamReader.ReadToEnd();
            streamReader.Close();
            return "OK";
        }

    }
    static class Bilder
    {
        public static string ResizeImages(int a)
        {
            double Width;
            double Height;
            Width = Settings.Default.CoverGrösse;
            Height = Width;
            for (int i = 0; i < mp3.albumcover[a].Count; i++)
            {
                Image sourceImage = mp3.albumcover[a][i];
                if (sourceImage.Width <= Settings.Default.CoverGrösse && sourceImage.Height <= Settings.Default.CoverGrösse)
                {
                }
                else
                {
                    if (sourceImage.Width >= sourceImage.Height)
                    {
                        double sizeFactor = Width / sourceImage.Width;
                        double newHeigth = sizeFactor * sourceImage.Height;
                        Bitmap newImage = new Bitmap((int)Width, (int)newHeigth);
                        using (Graphics g = Graphics.FromImage(newImage))
                        {
                            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            g.DrawImage(sourceImage, new Rectangle(0, 0, (int)Width, (int)newHeigth));
                        }
                        mp3.albumcover[a][i] = newImage;
                    }
                    else
                    {
                        double sizeFactor = Height / sourceImage.Height;
                        double newWidth = sizeFactor * sourceImage.Width;
                        Bitmap newImage = new Bitmap((int)Height, (int)newWidth);
                        using (Graphics g = Graphics.FromImage(newImage))
                        {
                            g.InterpolationMode = InterpolationMode.HighQualityBicubic;
                            g.DrawImage(sourceImage, new Rectangle(0, 0, (int)Height, (int)newWidth));
                        }
                        mp3.albumcover[a][i] = newImage;
                    }
                }
            }
            return "OK";
        }
    }

    static class Dateien
    {
        public static string RenameFile(string newName,int a)
        {
            try
            {
                var fileInfo = new FileInfo(mp3.pfad[a]);
                File.Move(mp3.pfad[a], fileInfo.Directory + "\\" + newName);
                mp3.pfad[a] = fileInfo.Directory + "\\" + newName;
                return "OK";
            }
            catch { return "RenameFile(): Zugriff verweigert!"; }
        }

        public static string ToUpper(string toupper)
        //Erster Buchstabe von Wort wird zu grossbuchstabe
        {
            int index = 0;
            char kleinbuchstabe;
            string grossbuchstabe;
            string rechts;
            string links;
            if (toupper != null)
            {
                //Doppelte Leerschläge entfernen
                while (toupper.Contains("  "))
                {
                    toupper.Replace("  ", " ");
                }
                //Leerschläge am Anfang abschneiden
                while (toupper[0] == Convert.ToChar(32))
                {
                    toupper = toupper.Substring(1, toupper.Length - 1);
                }
                //Leerschläge am Ende abschneiden
                while (toupper[toupper.Count() - 1] == Convert.ToChar(32))
                {
                    toupper = toupper.Substring(0, toupper.Count() - 1);
                }
                //Grossbuchstaben
                while (toupper.Substring(index + 1).Contains(Convert.ToChar(32)))
                {
                    index = toupper.IndexOf(Convert.ToChar(32), index + 1);
                    kleinbuchstabe = toupper[index + 1];
                    if (kleinbuchstabe == 40 || kleinbuchstabe == 41 || kleinbuchstabe == 91 || kleinbuchstabe == 93) //Klammern
                    {
                        while (toupper[index + 2] == 32) //Leerschläge nach Klammern entfernen
                        {
                            toupper = toupper.Substring(0, index + 1) + toupper.Substring(index + 3);
                            index++;
                        }
                        index++;
                        kleinbuchstabe = toupper[index + 1];
                    }
                    //zu grossbuchstaben konvertieren

                    grossbuchstabe = kleinbuchstabe.ToString();
                    grossbuchstabe.ToUpper();
                    kleinbuchstabe = Convert.ToChar(grossbuchstabe);
                    links = toupper.Substring(0, index);
                    rechts = toupper.Substring(index + 2);
                    toupper = links + kleinbuchstabe + rechts;
                    index++;
                }
            }
            return toupper;
        }

        public static void Optimus(int a)
        {
            mp3.title[a] = ToUpper(mp3.title[a]);
            mp3.artist[a] = ToUpper(mp3.title[a]);
            mp3.album[a] = ToUpper(mp3.title[a]);
            mp3.albumartist[a] = ToUpper(mp3.title[a]);
            mp3.genre[a] = ToUpper(mp3.title[a]);
            if (mp3.title[a] == "" && mp3.artist[a] == "")
            {
                if (mp3.dateiname[a].Count(x => x == '-') == 1)
                {
                    mp3.artist[a] = mp3.dateiname[a].Substring(0, mp3.dateiname[a].IndexOf("-"));
                    mp3.title[a] = mp3.dateiname[a].Substring(mp3.dateiname[a].IndexOf("-") + 1);
                }
                else
                {
                    return;
                }
            }
            if (mp3.albumartist[a] == "")
            {
                mp3.albumartist[a] = mp3.artist[a];
            }
            if (mp3.album[a] == "")
            {
                mp3.album = mp3.albumartist;
            }
            string[] stringe = new string[5];
            stringe[0] = mp3.title[a];
            stringe[1] = mp3.artist[a];
            stringe[2] = mp3.albumartist[a];
            stringe[3] = mp3.album[a];
            stringe[4] = mp3.genre[a];
            string[] textdatei = new string[5];
            textdatei[0] = File.ReadAllText("ini\\Titel.txt");
            textdatei[1] = File.ReadAllText("ini\\Artist.txt");
            textdatei[2] = File.ReadAllText("ini\\Albumartist.txt");
            textdatei[3] = File.ReadAllText("ini\\Album.txt");
            textdatei[4] = File.ReadAllText("ini\\Genre.txt");
            for (int i = 0; i < stringe.Length; i++)
            {
                if (stringe[i] != null)
                {
                    if (textdatei[i] != "")
                    {
                        foreach (var row in textdatei[i].Split('\n'))
                        {
                            if (stringe[i].Contains(row) && row != "")
                            {
                                stringe[i] = stringe[i].Substring(stringe[i].IndexOf(row) + row.Length) + stringe[i].Substring(0, stringe[i].IndexOf(row + 1));
                            }
                        }
                    }
                    while (stringe[i][stringe[i].Length - 1] == Convert.ToChar(" ")) //schneidet Leerstellen hinten ab
                    {
                        stringe[i] = stringe[i].Substring(0, stringe[i].Length - 1);
                    }
                    while (stringe[i].Contains("  "))
                    {
                        stringe[i].Replace("  ", " ");
                    }
                    stringe[i] = ToUpper(stringe[i]); //richtige Schreibweise
                }
            }
            mp3.newdateiname.Add(mp3.artist[a] + " - " + mp3.title[a] + ".mp3");
        }
    }
}

