using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;

namespace CoverExplorer
{
    public partial class Einstellungen : Form
    {
        public Einstellungen()
        {
            InitializeComponent();
            if (Settings.Default.Covervorhanden == 3)
            {
                radioButton3.Checked = true;
            }
            else if (Settings.Default.Covervorhanden == 1)
            {
                radioButton7.Checked = true;
            }
            else if (Settings.Default.Covervorhanden == 0)
            {
                radioButton4.Checked = true;
            }
            else
            {
                radioButton5.Checked = true;
            }
            if (Settings.Default.CoverSpeicherart  == 1)
            {
                radioButton10.Checked = true;
            }
            else
            {
                radioButton9.Checked = true;
            }
            if (Settings.Default.CoverGrösse == 500)
            {
                radioButton6.Checked = true;
                textBox1.Enabled = false;
            }
            else if (Settings.Default.CoverGrösse == 100)
            {
                radioButton8.Checked = true;
                textBox1.Enabled = false;
            }
            else
            {
                radioButton1.Checked = true;
                textBox1.Enabled = true;
                textBox1.Text = Settings.Default.CoverGrösse.ToString();
            }
            if (Settings.Default.Debugmodus)
            {
                checkBox1.Checked = true;
            }
            else
            {
                checkBox1.Checked = false;
            }
            if (Settings.Default.CommentChangeEnabled)
            {
                textBox2.Enabled = true;
                checkBox2.Checked = true;
                textBox2.Text = Settings.Default.Comment;
            }
            else
            {
                textBox2.Enabled = false;
                checkBox2.Checked = false;
                textBox2.Text = "";
            }
            if (Settings.Default.Webseite == "seekacover.com")
            {
                radioButton11.Checked = true;
            }
            else
            {
                radioButton2.Checked = true;
            }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            Close();

        }

        private void button2_Click(object sender, EventArgs e)
        {
            radioButton10.Checked = true;
            radioButton3.Checked = true;
            radioButton6.Checked = true;
            radioButton11.Checked = true;
            textBox1.Text = "";
            textBox1.Enabled = false;
            checkBox1.Checked = false;
            checkBox2.Checked = false;
            textBox2.Text = "";
            textBox2.Enabled = false;
        }

        private void button1_Click(object sender, EventArgs e)
        {
            if (radioButton3.Checked == true)
            {
                Settings.Default.Covervorhanden = 3;
            }
            else if (radioButton7.Checked == true)
            {
                Settings.Default.Covervorhanden = 1;
            }
            else if (radioButton4.Checked == true)
            {
                Settings.Default.Covervorhanden = 0;
            }
            else
            {
                Settings.Default.Covervorhanden = 4;
            }
            if (radioButton6.Checked == true)
            {
                Settings.Default.CoverGrösse = 500;
            }
            else if (radioButton8.Checked == true)
            {
                Settings.Default.CoverGrösse = 100;
            }
            else
            {
                try
                {
                    Settings.Default.CoverGrösse = Convert.ToInt32(textBox1.Text);
                }
                catch { MessageBox.Show("Fehler beim Speichern der benutzerdefinierten Covergrösse."); return; }
            }
            if (radioButton10.Checked == true)
            { 
                Settings.Default.CoverSpeicherart  = 1;
            }
            else
            {
                Settings.Default.CoverSpeicherart  = 2;
            }
            if (checkBox1.Checked == true)
            {                
                Settings.Default.Debugmodus = true;
            }
            else
            {
                Settings.Default.Debugmodus = false;
            }
            if (radioButton11.Checked == true)
            {
                Settings.Default.Webseite = "seekacover";
            }
            else
            {
                Settings.Default.Webseite = "amazon";
            }
            if (checkBox2.Checked == true)
            {
                if (textBox2.Text == "")
                {
                    Settings.Default.Comment = "";
                }
                else
                {
                    Settings.Default.Comment = textBox2.Text;
                }
                Settings.Default.CommentChangeEnabled = true;
            }
            else
            {
                Settings.Default.Comment = "";
                Settings.Default.CommentChangeEnabled = false;
            }
            Close();
        }

        private void textBox1_Click(object sender, EventArgs e)
        {
            radioButton1.Checked = true;
        }

        private void checkBox2_Click(object sender, EventArgs e)
        {
            if (checkBox2.Checked == true)
            {
                textBox2.Enabled = true;
            }
            else
            {
                textBox2.Enabled = false;
                textBox2.Text = "";
            }
        }

        private void radioButton6_Click(object sender, EventArgs e)
        {
            if (radioButton1.Checked == true)
            {
                textBox1.Enabled = true;
            }
            else
            {
                textBox1.Text = "";
                textBox1.Enabled = false;
            }
        }


    }
}
