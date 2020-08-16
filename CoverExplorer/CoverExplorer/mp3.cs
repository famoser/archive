using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using TagLib;
using System.IO;
using System.Drawing;
using System.Windows.Forms;
using System.Collections;


namespace CoverExplorer
{
    class mp3
    {
        #region algemeine variablen definieren/ausgabefunktionen

        public static List<string> dateiname = new List<string>();
        public static List<string> newdateiname = new List<string>();
        public static List<string> ordner = new List<string>();
        public static List<string> pfad = new List<string>();
        public static List<string> title = new List<string>();
        public static List<string> artist = new List<string>();
        public static List<string> album = new List<string>();
        public static List<string> albumartist = new List<string>();
        public static List<Int32> track = new List<Int32>();
        public static List<Int32> year = new List<Int32>();
        public static List<string> genre = new List<string>();
        public static List<string> comment = new List<string>();
        public static List<string> amazonID = new List<string>();
        public static List<string> tag = new List<string>();
        public static List<string> tagversion = new List<string>();
        public static List<List<string>> albumcoveradresse = new List<List<string>>();
        public static List<List<string>> albumcoverpfad = new List<List<string>>();
        public static List<List<Image>> albumcover = new List<List<Image>>();
        #endregion

        public static string ReadInfos(bool clearall) //liest alle mp3's aus
        {
            if (clearall)
            {
                dateiname = null;
                ordner = null;
                pfad = null;
                title = null;
                artist = null;
                album = null;
                albumartist = null;
                track = null;
                year = null;
                genre = null;
                comment = null;
                amazonID = null;
                tag = null;
                tagversion = null;
                albumcoveradresse = null;
                albumcoverpfad = null;
                albumcover = null;
            }
                for (int i = mp3.ordner.Count(); i < Funktionen.anzahl; i++)
                {
                    try
                    {
                        int index;
                        string strin = mp3.pfad[i];
                        string ordne = "";
                        string dateinam = "";
                        while (strin.Contains("\\"))
                        {
                            index = strin.IndexOf("\\", 0);
                            ordne = ordne + strin.Substring(0, index + 1);
                            dateinam = strin.Substring((index + 1));
                            strin = dateinam;
                        }
                        mp3.dateiname.Add(dateinam);
                        mp3.ordner.Add(ordne);
                        TagLib.File f = TagLib.File.Create(mp3.pfad[i]);
                        if (f.Tag.Title == null) { title.Add(" "); } else { title.Add(f.Tag.Title); }
                        if (f.Tag.FirstPerformer == null) { artist.Add(" "); } else { artist.Add(f.Tag.FirstPerformer); }
                        if (f.Tag.Album == null) { album.Add(" "); } else { album.Add(f.Tag.Album); }
                        if (f.Tag.FirstAlbumArtist == null) { albumartist.Add(" "); } else { albumartist.Add(f.Tag.FirstAlbumArtist); }
                        if (Convert.ToInt32(f.Tag.Track) == null) { track.Add(-1); } else { track.Add(Convert.ToInt32(f.Tag.Track)); }
                        if (Convert.ToInt32(f.Tag.Year) == null) { year.Add(-1); } else { year.Add(Convert.ToInt32(f.Tag.Year)); }
                        if (f.Tag.FirstGenre == null) { genre.Add(" "); } else { genre.Add(f.Tag.FirstGenre); }
                        if (f.Tag.Comment == null) { comment.Add(" "); } else { comment.Add(f.Tag.Comment); }
                        if (f.Tag.AmazonId == null) { amazonID.Add(" "); } else { amazonID.Add(f.Tag.AmazonId); }
                        if (f.Tag.TagTypes.ToString() == null) { tag.Add(" "); } else { tag.Add(f.Tag.TagTypes.ToString()); }
                        try
                        {
                            List<Image> cover = new List<Image>();
                            System.Drawing.Bitmap flag = new System.Drawing.Bitmap(10, 10);
                            cover.Add(flag);
                            List<string> albumcoveradr = new List<string>();
                            List<string> albumcoverpfa = new List<string>();
                            albumcoveradr.Add(" ");
                            albumcoverpfa.Add(" ");
                            albumcoveradresse.Add(albumcoveradr);
                            albumcoverpfad.Add(albumcoverpfa);
                            for (int b = 0; i < f.Tag.Pictures.Count(); i++)
                            {
                                TagLib.IPicture pic = f.Tag.Pictures[b];  //pic contains data for image.
                                MemoryStream stream = new MemoryStream(pic.Data.Data);
                                cover.Add(Image.FromStream(stream));
                            }
                            mp3.albumcover.Add(cover);
                            f = null;
                        }
                        catch { return "ReadInfos(): Die Bilder der Datei konnten nicht ausgelesen werden."; }
                    }
                    catch { return "ReadInfos(): Die Tags der Datei konnten nicht ausgelesen werden."; }
            }
            return "OK";

        }

        public static string WriteInfos(int a)
        {
            try
            {
                TagLib.File f = TagLib.File.Create(mp3.pfad[a]);
                f.Tag.Title = title[a];
                f.Tag.Performers[0] = artist[a];
                f.Tag.Album = album[a];
                f.Tag.AlbumArtists[0] = albumartist[a];
                if (track[a] == -1)
                { }
                else
                {
                    f.Tag.Track = Convert.ToUInt16(track[a]);
                }
                if (year[a] == -1)
                { }
                else
                {
                    f.Tag.Year = Convert.ToUInt16(year[a]);
                }
                f.Tag.Genres[0] = genre[a];
                f.Tag.Comment = comment[a];
                if (Settings.Default.CommentChangeEnabled)
                {
                    f.Tag.Comment = Settings.Default.Comment;
                }
                //albumcover
                TagLib.IPicture[] pictures = new IPicture[albumcover[a].Count()];
                TagLib.Id3v2.AttachedPictureFrame pic = new TagLib.Id3v2.AttachedPictureFrame();
                for (int i = 1; i < albumcover[a].Count(); i++)
                {
                    mp3.albumcoverpfad[a][i] = Path.GetTempPath() + i + System.DateTime.Now.GetHashCode() + ".jpg";
                    mp3.albumcover[a][i].Save(mp3.albumcoverpfad[a][i]);
                    pic.TextEncoding = TagLib.StringType.Latin1;
                    pic.MimeType = System.Net.Mime.MediaTypeNames.Image.Jpeg;
                    pic.Type = TagLib.PictureType.FrontCover;
                    pic.Data = TagLib.ByteVector.FromPath(mp3.albumcoverpfad[a][i]);
                    pictures[i] = pic;
                }
                f.Tag.Pictures = pictures;
                f.Save();
                if (mp3.dateiname[a] != mp3.newdateiname[a] && mp3.newdateiname != null)
                {
                    Dateien.RenameFile(mp3.newdateiname[a],a);
                }
                f = null;
                return "OK";
            }
            catch
            {
                return "WriteInfos(): Datei schreibgeschützt";
            }
        }
    }
}
