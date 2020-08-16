using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FilesDownloader.Helpers
{
    public static class MessageHelper
    {
        public static void ThrowException(Exception ex)
        {
            MessageBox.Show(ex.ToString(), "An Exception occured!");
        }

        public static void SendMessage(string message)
        {
            MessageBox.Show(message);
        }

        public static void Log(string message)
        {
            RuntimeVariables.ActiveForm.AddTextToConsole(message + "\n");
        }

        public static void Log(string message, Exception ex)
        {
            RuntimeVariables.ActiveForm.AddTextToConsole(message + "\nException: " + ex + "\n");
        }
    }
}
