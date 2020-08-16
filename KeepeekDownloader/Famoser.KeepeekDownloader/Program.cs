using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using iTextSharp.text;
using iTextSharp.text.pdf;
using Org.BouncyCastle.Asn1.Crmf;
using PdfSharp.Drawing;

namespace Famoser.KeepeekDownloader
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine(
                "please find the direkt link for the first image (for example: http://asset.keepeek-cache.com/medias/domain21/_pdf/media7/1072-3nhf9q6qt4/large/0.jpg) and paste it in here");
            string link = Console.ReadLine();
            while (link == null || !link.EndsWith("0.jpg"))
            {
                Console.WriteLine(
                    "invalid link. find the direkt link for the first image (for example: http://asset.keepeek-cache.com/medias/domain21/_pdf/media7/1072-3nhf9q6qt4/large/0.jpg) and paste it in here");
                link = Console.ReadLine();
            }

            var baseLink = link.Substring(0, link.Length - "0.jpg".Length);
            var tempPath = Path.Combine(Path.GetTempPath(), "kdcache");
            var pdfPath = Path.Combine(tempPath, "download.pdf");
            if (!Directory.Exists(tempPath))
                Directory.CreateDirectory(tempPath);
            int counter = 0;
            int tries = 3;
            var paths = new List<string>();
            Document document = new Document();
            document.SetMargins(0, 0, 0, 0);
            using (var client = new WebClient())
            {
                using (var stream = new FileStream(pdfPath, FileMode.Create, FileAccess.Write, FileShare.None))
                {
                    PdfWriter.GetInstance(document, stream);
                    document.Open();
                    while (true)
                    {
                        try
                        {
                            var imagePath = Path.Combine(tempPath, counter + ".jpg");
                            if (counter > 600)
                                client.DownloadFile(baseLink + counter + ".jpg", imagePath);
                            Console.WriteLine("downloaded page " + (counter + 1));

                            paths.Add(imagePath);
                            using (var imageStream = new FileStream(imagePath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                            {
                                var image = Image.GetInstance(imageStream);
                                image.ScaleToFit(document.PageSize.Width, document.PageSize.Height);
                                document.Add(image);
                                document.NewPage();
                            }

                            counter++;
                            tries = 3;
                        }
                        catch (WebException ex)
                        {
                            Console.WriteLine("page " + (counter + 1) +
                                              " does not exist, guessing document is downloaded successfully, but trying again " +
                                              tries-- + " times");
                            counter++;
                        }
                        catch (Exception ex)
                        {
                            Console.WriteLine("Exception while downloading occurred: " + ex);
                            tries--;
                        }
                        if (tries <= 0)
                            break;
                    }
                    document.Close();
                }
            }


            string targetFolder;
            Console.WriteLine(
                "download finished & pdf created. Where do you want your pdf (It will be called download.pdf)?");
            targetFolder = Console.ReadLine();
            while (targetFolder == null)
            {
                Console.WriteLine("invalid path. Where do you want your pdf (It will be called download.pdf)?");
                targetFolder = Console.ReadLine();
            }
            try
            {
                File.Copy(pdfPath, Path.Combine(targetFolder, "download.pdf"), true);
                Directory.Delete(tempPath, true);
                Console.WriteLine("all done & cache cleared. Have fun!");
            }
            catch (Exception ex)
            {
                Console.WriteLine("pdf cannot be copied (" + ex.Message + "). You will find the pdf at its temporary location at " + pdfPath);
            }
            Console.ReadKey();
        }
    }
}
