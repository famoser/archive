namespace CoverExplorer
{
    partial class PopUpMuster
    {
        /// <summary>
        /// Erforderliche Designervariable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Verwendete Ressourcen bereinigen.
        /// </summary>
        /// <param name="disposing">True, wenn verwaltete Ressourcen gelöscht werden sollen; andernfalls False.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Vom Windows Form-Designer generierter Code
        
        /// <summary>
        /// Erforderliche Methode für die Designerunterstützung.
        /// Der Inhalt der Methode darf nicht mit dem Code-Editor geändert werden.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(PopUpMuster));
            this.pictureBox1 = new System.Windows.Forms.PictureBox();
            this.button1 = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).BeginInit();
            this.SuspendLayout();
            // 
            // pictureBox1
            // 
            this.pictureBox1.Location = new System.Drawing.Point(0, 0);
            this.pictureBox1.Name = "pictureBox1";
            this.pictureBox1.Size = new System.Drawing.Size(mp3.albumcover[Anzeige.indexaktiveselement][mp3.albumcover[Anzeige.indexaktiveselement].Count - 1].Width * 2, mp3.albumcover[Anzeige.indexaktiveselement][mp3.albumcover[Anzeige.indexaktiveselement].Count - 1].Height * 2);
            this.pictureBox1.SizeMode = System.Windows.Forms.PictureBoxSizeMode.StretchImage;
            this.pictureBox1.Image = mp3.albumcover[Anzeige.indexaktiveselement][mp3.albumcover[Anzeige.indexaktiveselement].Count - 1];
            this.pictureBox1.TabIndex = 0;
            this.pictureBox1.TabStop = false;
            this.pictureBox1.Click += new System.EventHandler(this.pictureBox1_Click);
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point((mp3.albumcover[Anzeige.indexaktiveselement][mp3.albumcover[Anzeige.indexaktiveselement].Count - 1].Width * 2) - 90, (mp3.albumcover[Anzeige.indexaktiveselement][mp3.albumcover[Anzeige.indexaktiveselement].Count - 1].Height * 2) - 30);

            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(85, 25);
            this.button1.TabIndex = 1;
            this.button1.Text = "Schliessen";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // PopUpMuster
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(mp3.albumcover[Anzeige.indexaktiveselement][mp3.albumcover[Anzeige.indexaktiveselement].Count-1].Width * 2, mp3.albumcover[Anzeige.indexaktiveselement][mp3.albumcover[Anzeige.indexaktiveselement].Count-1].Height * 2);
            this.Controls.Add(this.button1);
            this.Controls.Add(this.pictureBox1);
            this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
            this.Icon = ((System.Drawing.Icon)(resources.GetObject("$this.Icon")));
            this.MaximizeBox = false;
            this.MinimizeBox = false;
            this.Name = "PopUpMuster";
            this.Text = "PopUpMuster";
            this.TopMost = true;
            ((System.ComponentModel.ISupportInitialize)(this.pictureBox1)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.PictureBox pictureBox1;
        private System.Windows.Forms.Button button1;
    }
}