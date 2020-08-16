using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Diagnostics;
using System.IO;
using System.Resources;

namespace Physik___Fälle
{
    public partial class Form2 : Form
    {
        public Form2()
        {
            InitializeComponent();
            textBox1.Text = GlobalClass.gravity.ToString();
        }

        private void button4_Click(object sender, EventArgs e)
        {
            textBox1.Text = "9.81";
            try
            {
                if (textBox1.Text == "")
                {
                    MessageBox.Show("The field is empty!");
                    return;
                }
                else
                {
                    GlobalClass.gravity = Convert.ToDouble(textBox1.Text);
                    label2.Text = "reset successful!";
                    return;
                }
            }
            catch
            {
                MessageBox.Show("Gravity needs to be a number!"); return;
            }
        }

        private void button2_Click(object sender, EventArgs e)
        {
            try
            {
                if (textBox1.Text == "")
                {
                    MessageBox.Show("The field is empty!");
                }
                else
                {
                    GlobalClass.gravity = Convert.ToDouble(textBox1.Text);
                    label2.Text = "saved successful!";
                    return;
                }
            }
            catch { MessageBox.Show("Gravity needs to be a number!"); return; }
        }

        private void button3_Click(object sender, EventArgs e)
        {
            Close();
        }


        private void button1_Click(object sender, EventArgs e)
        {
            try
            {
                if (textBox1.Text == "")
                {
                    MessageBox.Show("The field is empty! Value could not be saved.");
                    Close();
                }
                else
                {
                    GlobalClass.gravity = Convert.ToDouble(textBox1.Text);
                    Close();
                }
            }
            catch
            {
                MessageBox.Show("Gravity needs to be a number! Value could not be saved."); Close();
            }
            Close();
        }

        private void Form2_Load(object sender, EventArgs e)
        {

        }
    }
}