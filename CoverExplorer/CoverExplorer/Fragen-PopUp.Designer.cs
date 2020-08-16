namespace CoverExplorer
{
    partial class Fragen_PopUp
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Fragen_PopUp));
            this.nachrechts = new System.Windows.Forms.Button();
            this.nachlinks = new System.Windows.Forms.Button();
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.pictureBox2 = new System.Windows.Forms.PictureBox();
            this.button1 = new System.Windows.Forms.Button();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.button2 = new System.Windows.Forms.Button();
            this.button3 = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).BeginInit();
            this.SuspendLayout();
            // 
            // nachrechts
            // 
            this.nachrechts.Location = new System.Drawing.Point(39, 35);
            this.nachrechts.Name = "nachrechts";
            this.nachrechts.Size = new System.Drawing.Size(23, 23);
            this.nachrechts.TabIndex = 33;
            this.nachrechts.Text = ">";
            this.nachrechts.UseVisualStyleBackColor = true;
            this.nachrechts.Visible = false;
            this.nachrechts.Click += new System.EventHandler(this.nachrechts_Click);
            // 
            // nachlinks
            // 
            this.nachlinks.Enabled = false;
            this.nachlinks.Location = new System.Drawing.Point(14, 35);
            this.nachlinks.Name = "nachlinks";
            this.nachlinks.Size = new System.Drawing.Size(23, 23);
            this.nachlinks.TabIndex = 32;
            this.nachlinks.Text = "<";
            this.nachlinks.UseVisualStyleBackColor = true;
            this.nachlinks.Visible = false;
            this.nachlinks.Click += new System.EventHandler(this.nachlinks_Click);
            // 
            // pictureBox1
            // 
            this.pictureBox1.BackColor = System.Drawing.SystemColors.ButtonHighlight;
            this.pictureBox1.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pictureBox1.ErrorImage = ((System.Drawing.Image)(resources.GetObject("pictureBox1.ErrorImage")));
            this.pictureBox1.Location = new System.Drawing.Point(12, 32);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(200, 200);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.TabIndex = 31;
            this.pictureBox1.TabStop = false;
            // 
            // pictureBox2
            // 
            this.pictureBox2.BackColor = System.Drawing.SystemColors.ButtonHighlight;
            this.pictureBox2.BorderStyle = System.Windows.Forms.BorderStyle.FixedSingle;
            this.pictureBox2.ErrorImage = ((System.Drawing.Image)(resources.GetObject("pictureBox2.ErrorImage")));
            this.pictureBox2.Location = new System.Drawing.Point(218, 32);
            this.pictureBox2.Name = "pictureBox2";
            this.pictureBox2.Size = new System.Drawing.Size(200, 200);
            this.pictureBox2.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox2.TabIndex = 34;
            this.pictureBox2.TabStop = false;
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(218, 272);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(200, 53);
            this.button1.TabIndex = 35;
            this.button1.Text = "Neues Cover zu den bestehenden hinzufügen";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(12, 9);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(84, 13);
            this.label2.TabIndex = 37;
            this.label2.Text = "Aktuelles Cover:";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(215, 9);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(72, 13);
            this.label3.TabIndex = 38;
            this.label3.Text = "Neues Cover:";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(11, 247);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(205, 13);
            this.label1.TabIndex = 39;
            this.label1.Text = "Welcher Schritt wollen Sie unternehemen:";
            // 
            // button2
            // 
            this.button2.Location = new System.Drawing.Point(12, 272);
            this.button2.Name = "button2";
            this.button2.Size = new System.Drawing.Size(96, 53);
            this.button2.TabIndex = 40;
            this.button2.Text = "Aktuelles beibehalten";
            this.button2.UseVisualStyleBackColor = true;
            this.button2.Click += new System.EventHandler(this.button2_Click);
            // 
            // button3
            // 
            this.button3.Location = new System.Drawing.Point(116, 272);
            this.button3.Name = "button3";
            this.button3.Size = new System.Drawing.Size(96, 53);
            this.button3.TabIndex = 41;
            this.button3.Text = "Neues Cover verwenden";
            this.button3.UseVisualStyleBackColor = true;
            this.button3.Click += new System.EventHandler(this.button3_Click);
            // 
            // Fragen_PopUp
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(433, 337);
            this.Controls.Add(this.button3);
            this.Controls.Add(this.button2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.pictureBox2);
            this.Controls.Add(this.nachrechts);
            this.Controls.Add(this.nachlinks);
            this.Controls.Add(this.pictureBox1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "Fragen_PopUp";
            this.Text = "Was wollen Sie tun?";
            this.TopMost = true;
            this.Load += new System.EventHandler(this.Fragen_PopUp_Load);
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox2)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.Button nachrechts;
        private System.Windows.Forms.Button nachlinks;
        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.PictureBox pictureBox2;
        private System.Windows.Forms.Button button1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button button2;
        private System.Windows.Forms.Button button3;
    }
}