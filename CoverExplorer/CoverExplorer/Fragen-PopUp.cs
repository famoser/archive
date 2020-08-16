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
    public partial class Fragen_PopUp : Form
    {
        public Fragen_PopUp()
        {
            InitializeComponent();
            Funktionen.frage = 0; //falls unerwartetgeschlossen wird
            pictureBox2.Image = mp3.albumcover[Anzeige.indexaktiveselement][mp3.albumcover[Anzeige.indexaktiveselement].Count - 1];       //neu aufrufen, um wieder das alte in albumcover zu speichern
            pictureBox1.Image = mp3.albumcover[Anzeige.indexaktiveselement][0];
            Anzeige.indexaktivesalbumcover = 0;
            if (mp3.albumcover[Anzeige.indexaktiveselement].Count > 1)
            {
                nachrechts.Visible = true;
                nachlinks.Visible = false;
            }

        }

        private void Fragen_PopUp_Load(object sender, EventArgs e)
        {

        }

        private void button2_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void button3_Click(object sender, EventArgs e)
        {
            Image bit = mp3.albumcover[Anzeige.indexaktiveselement][mp3.albumcover[Anzeige.indexaktiveselement].Count - 1];
            mp3.albumcover[Anzeige.indexaktiveselement] = null;
            mp3.albumcover[Anzeige.indexaktiveselement].Add(bit);
            Close();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            Close();
        }

        private void nachrechts_Click(object sender, EventArgs e)
        {
            nachlinks.Enabled = true;
            Anzeige.indexaktivesalbumcover++;
            pictureBox1.Image = mp3.albumcover[Anzeige.indexaktiveselement][Anzeige.indexaktivesalbumcover];
            if (Anzeige.indexaktivesalbumcover == mp3.albumcover[Anzeige.indexaktiveselement].Count()-1)
            {
                nachrechts.Enabled = false;
            }
        }

        private void nachlinks_Click(object sender, EventArgs e)
        {
            nachrechts.Enabled = true;
            Anzeige.indexaktivesalbumcover--;
            pictureBox1.Image = mp3.albumcover[Anzeige.indexaktiveselement][Anzeige.indexaktivesalbumcover];
            if (Anzeige.indexaktivesalbumcover == 0)
            {
                nachlinks.Enabled = false;
            }
        }
    }
}
