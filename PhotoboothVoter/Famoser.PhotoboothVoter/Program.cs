using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Famoser.FrameworkEssentials.Services;
using Nito.AsyncEx;

namespace Famoser.PhotoboothVoter
{
    class Program
    {
        static void Main(string[] args)
        {
            AsyncContext.Run(() => MainAsync(args));
        }

        static async Task MainAsync(string[] args)
        {
            Console.WriteLine("Hi! Do you want to win contests? I'll show you how to win contests!");
            Console.WriteLine("URL of contest (http://ilp.photobooth-pro.ch/contest/voting/2059):");
            var url = Console.ReadLine();
            if (string.IsNullOrEmpty(url))
                url = "http://ilp.photobooth-pro.ch/contest/voting/2059";

            var postUrl = url.Replace("contest", "contest/ajax_update_score");

            Console.WriteLine("Id of your favorite image (231612):");
            var img = Console.ReadLine();
            if (string.IsNullOrEmpty(img))
                img = "231612";

            while (true)
            {
                Console.WriteLine("How many votes do you want?");
                var voteNr = Convert.ToInt32(Console.ReadLine());

                var uri = new Uri(postUrl);
                var service = new RestService();

                for (int i = 0; i < voteNr; i++)
                {
                    var dic = new Dictionary<string, string>()
                    {
                        {"img_id", img},
                        {"fingerprint", GetRandomMD5Hash()}
                    };
                    var res = await service.PostAsync(uri, dic);
                    var respMsg = ": Posted " + (i + 1) + "/" + voteNr + " times";
                    if (res.IsRequestSuccessfull)
                    {
                        var str = await res.GetResponseAsStringAsync();
                        if (str.Contains("Can't vote, voting is over"))
                            respMsg = "FAILED (voting over): " + respMsg;
                        else
                            respMsg = "SUCCESSFULL: " + respMsg;
                    }
                    else
                        respMsg = "FAILED (server request failed): " + respMsg;
                    Console.WriteLine(respMsg);
                }

            }
        }

        public static string GetRandomMD5Hash()
        {
            // Use input string to calculate MD5 hash
            using (System.Security.Cryptography.MD5 md5 = System.Security.Cryptography.MD5.Create())
            {
                byte[] inputBytes = System.Text.Encoding.ASCII.GetBytes(Guid.NewGuid().ToString());
                byte[] hashBytes = md5.ComputeHash(inputBytes);

                // Convert the byte array to hexadecimal string
                StringBuilder sb = new StringBuilder();
                for (int i = 0; i < hashBytes.Length; i++)
                {
                    sb.Append(hashBytes[i].ToString("X2"));
                }
                return sb.ToString();
            }

        }
    }
}
