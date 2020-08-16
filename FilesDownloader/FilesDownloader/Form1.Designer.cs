namespace FilesDownloader
{
    partial class Form1
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
            this.configTextBox = new System.Windows.Forms.RichTextBox();
            this.configSourceComboBox = new System.Windows.Forms.ComboBox();
            this.refreshconfigstextbox = new System.Windows.Forms.Button();
            this.newurltextbox = new System.Windows.Forms.TextBox();
            this.newnametextbox = new System.Windows.Forms.TextBox();
            this.newfoldertextbox = new System.Windows.Forms.TextBox();
            this.addnewentrytextbox = new System.Windows.Forms.Button();
            this.groupBox1 = new System.Windows.Forms.GroupBox();
            this.groupBox2 = new System.Windows.Forms.GroupBox();
            this.addconfigfile = new System.Windows.Forms.Button();
            this.newconfigfilenametextbox = new System.Windows.Forms.TextBox();
            this.groupBox3 = new System.Windows.Forms.GroupBox();
            this.outputTextBox = new System.Windows.Forms.RichTextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.startstopbutton = new System.Windows.Forms.Button();
            this.progressBar = new System.Windows.Forms.ProgressBar();
            this.groupBox4 = new System.Windows.Forms.GroupBox();
            this.saveconfigbutton = new System.Windows.Forms.Button();
            this.changedatetextbox = new System.Windows.Forms.TextBox();
            this.label4 = new System.Windows.Forms.Label();
            this.authortextbox = new System.Windows.Forms.TextBox();
            this.label3 = new System.Windows.Forms.Label();
            this.nametextbox = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.oepnConfigurationFolderToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.groupBox1.SuspendLayout();
            this.groupBox2.SuspendLayout();
            this.groupBox3.SuspendLayout();
            this.groupBox4.SuspendLayout();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // configTextBox
            // 
            this.configTextBox.Location = new System.Drawing.Point(6, 63);
            this.configTextBox.Name = "configTextBox";
            this.configTextBox.Size = new System.Drawing.Size(828, 295);
            this.configTextBox.TabIndex = 0;
            this.configTextBox.Text = "";
            // 
            // configSourceComboBox
            // 
            this.configSourceComboBox.FormattingEnabled = true;
            this.configSourceComboBox.Location = new System.Drawing.Point(6, 19);
            this.configSourceComboBox.Name = "configSourceComboBox";
            this.configSourceComboBox.Size = new System.Drawing.Size(246, 21);
            this.configSourceComboBox.TabIndex = 1;
            this.configSourceComboBox.SelectedIndexChanged += new System.EventHandler(this.configSourceComboBox_SelectedIndexChanged);
            // 
            // refreshconfigstextbox
            // 
            this.refreshconfigstextbox.Location = new System.Drawing.Point(258, 19);
            this.refreshconfigstextbox.Name = "refreshconfigstextbox";
            this.refreshconfigstextbox.Size = new System.Drawing.Size(75, 23);
            this.refreshconfigstextbox.TabIndex = 3;
            this.refreshconfigstextbox.Text = "refresh";
            this.refreshconfigstextbox.UseVisualStyleBackColor = true;
            this.refreshconfigstextbox.Click += new System.EventHandler(this.refreshconfigstextbox_Click);
            // 
            // newurltextbox
            // 
            this.newurltextbox.Location = new System.Drawing.Point(6, 46);
            this.newurltextbox.Name = "newurltextbox";
            this.newurltextbox.Size = new System.Drawing.Size(324, 20);
            this.newurltextbox.TabIndex = 4;
            this.newurltextbox.Text = "url";
            this.newurltextbox.Click += new System.EventHandler(this.newnametextbox_TextChanged);
            // 
            // newnametextbox
            // 
            this.newnametextbox.Location = new System.Drawing.Point(6, 20);
            this.newnametextbox.Name = "newnametextbox";
            this.newnametextbox.Size = new System.Drawing.Size(324, 20);
            this.newnametextbox.TabIndex = 6;
            this.newnametextbox.Text = "name";
            this.newnametextbox.Click += new System.EventHandler(this.newnametextbox_TextChanged);
            // 
            // newfoldertextbox
            // 
            this.newfoldertextbox.Location = new System.Drawing.Point(6, 72);
            this.newfoldertextbox.Name = "newfoldertextbox";
            this.newfoldertextbox.Size = new System.Drawing.Size(324, 20);
            this.newfoldertextbox.TabIndex = 7;
            this.newfoldertextbox.Text = "folder";
            this.newfoldertextbox.Click += new System.EventHandler(this.newnametextbox_TextChanged);
            // 
            // addnewentrytextbox
            // 
            this.addnewentrytextbox.Location = new System.Drawing.Point(255, 98);
            this.addnewentrytextbox.Name = "addnewentrytextbox";
            this.addnewentrytextbox.Size = new System.Drawing.Size(75, 23);
            this.addnewentrytextbox.TabIndex = 8;
            this.addnewentrytextbox.Text = "add";
            this.addnewentrytextbox.UseVisualStyleBackColor = true;
            this.addnewentrytextbox.Click += new System.EventHandler(this.addnewentrytextbox_Click);
            // 
            // groupBox1
            // 
            this.groupBox1.Controls.Add(this.newurltextbox);
            this.groupBox1.Controls.Add(this.addnewentrytextbox);
            this.groupBox1.Controls.Add(this.newfoldertextbox);
            this.groupBox1.Controls.Add(this.newnametextbox);
            this.groupBox1.Location = new System.Drawing.Point(12, 113);
            this.groupBox1.Name = "groupBox1";
            this.groupBox1.Size = new System.Drawing.Size(338, 125);
            this.groupBox1.TabIndex = 9;
            this.groupBox1.TabStop = false;
            this.groupBox1.Text = "add new entry";
            // 
            // groupBox2
            // 
            this.groupBox2.Controls.Add(this.addconfigfile);
            this.groupBox2.Controls.Add(this.newconfigfilenametextbox);
            this.groupBox2.Controls.Add(this.configSourceComboBox);
            this.groupBox2.Controls.Add(this.refreshconfigstextbox);
            this.groupBox2.Location = new System.Drawing.Point(12, 26);
            this.groupBox2.Name = "groupBox2";
            this.groupBox2.Size = new System.Drawing.Size(338, 81);
            this.groupBox2.TabIndex = 10;
            this.groupBox2.TabStop = false;
            this.groupBox2.Text = "choose config source";
            // 
            // addconfigfile
            // 
            this.addconfigfile.Location = new System.Drawing.Point(258, 45);
            this.addconfigfile.Name = "addconfigfile";
            this.addconfigfile.Size = new System.Drawing.Size(75, 23);
            this.addconfigfile.TabIndex = 5;
            this.addconfigfile.Text = "add";
            this.addconfigfile.UseVisualStyleBackColor = true;
            this.addconfigfile.Click += new System.EventHandler(this.addconfigfile_Click);
            // 
            // newconfigfilenametextbox
            // 
            this.newconfigfilenametextbox.Location = new System.Drawing.Point(7, 47);
            this.newconfigfilenametextbox.Name = "newconfigfilenametextbox";
            this.newconfigfilenametextbox.Size = new System.Drawing.Size(245, 20);
            this.newconfigfilenametextbox.TabIndex = 4;
            this.newconfigfilenametextbox.Text = "new config file name";
            this.newconfigfilenametextbox.Click += new System.EventHandler(this.newnametextbox_TextChanged);
            // 
            // groupBox3
            // 
            this.groupBox3.Controls.Add(this.outputTextBox);
            this.groupBox3.Controls.Add(this.label1);
            this.groupBox3.Controls.Add(this.startstopbutton);
            this.groupBox3.Controls.Add(this.progressBar);
            this.groupBox3.Location = new System.Drawing.Point(357, 27);
            this.groupBox3.Name = "groupBox3";
            this.groupBox3.Size = new System.Drawing.Size(495, 211);
            this.groupBox3.TabIndex = 11;
            this.groupBox3.TabStop = false;
            this.groupBox3.Text = "download";
            // 
            // outputTextBox
            // 
            this.outputTextBox.Location = new System.Drawing.Point(6, 61);
            this.outputTextBox.Name = "outputTextBox";
            this.outputTextBox.Size = new System.Drawing.Size(483, 146);
            this.outputTextBox.TabIndex = 3;
            this.outputTextBox.Text = "";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(7, 44);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(37, 13);
            this.label1.TabIndex = 2;
            this.label1.Text = "output";
            // 
            // startstopbutton
            // 
            this.startstopbutton.Location = new System.Drawing.Point(6, 16);
            this.startstopbutton.Name = "startstopbutton";
            this.startstopbutton.Size = new System.Drawing.Size(75, 23);
            this.startstopbutton.TabIndex = 1;
            this.startstopbutton.Text = "start";
            this.startstopbutton.UseVisualStyleBackColor = true;
            this.startstopbutton.Click += new System.EventHandler(this.startstopbutton_Click);
            // 
            // progressBar
            // 
            this.progressBar.Location = new System.Drawing.Point(87, 16);
            this.progressBar.Name = "progressBar";
            this.progressBar.Size = new System.Drawing.Size(402, 23);
            this.progressBar.TabIndex = 0;
            // 
            // groupBox4
            // 
            this.groupBox4.Controls.Add(this.saveconfigbutton);
            this.groupBox4.Controls.Add(this.changedatetextbox);
            this.groupBox4.Controls.Add(this.label4);
            this.groupBox4.Controls.Add(this.authortextbox);
            this.groupBox4.Controls.Add(this.label3);
            this.groupBox4.Controls.Add(this.nametextbox);
            this.groupBox4.Controls.Add(this.label2);
            this.groupBox4.Controls.Add(this.configTextBox);
            this.groupBox4.Location = new System.Drawing.Point(12, 244);
            this.groupBox4.Name = "groupBox4";
            this.groupBox4.Size = new System.Drawing.Size(840, 364);
            this.groupBox4.TabIndex = 12;
            this.groupBox4.TabStop = false;
            this.groupBox4.Text = "review configuration";
            // 
            // saveconfigbutton
            // 
            this.saveconfigbutton.Location = new System.Drawing.Point(329, 35);
            this.saveconfigbutton.Name = "saveconfigbutton";
            this.saveconfigbutton.Size = new System.Drawing.Size(75, 23);
            this.saveconfigbutton.TabIndex = 7;
            this.saveconfigbutton.Text = "save config";
            this.saveconfigbutton.UseVisualStyleBackColor = true;
            this.saveconfigbutton.Click += new System.EventHandler(this.saveconfigbutton_Click);
            // 
            // changedatetextbox
            // 
            this.changedatetextbox.Enabled = false;
            this.changedatetextbox.Location = new System.Drawing.Point(223, 37);
            this.changedatetextbox.Name = "changedatetextbox";
            this.changedatetextbox.Size = new System.Drawing.Size(100, 20);
            this.changedatetextbox.TabIndex = 6;
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(223, 20);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(67, 13);
            this.label4.TabIndex = 5;
            this.label4.Text = "change date";
            // 
            // authortextbox
            // 
            this.authortextbox.Location = new System.Drawing.Point(117, 37);
            this.authortextbox.Name = "authortextbox";
            this.authortextbox.Size = new System.Drawing.Size(100, 20);
            this.authortextbox.TabIndex = 4;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(117, 20);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(37, 13);
            this.label3.TabIndex = 3;
            this.label3.Text = "author";
            // 
            // nametextbox
            // 
            this.nametextbox.Location = new System.Drawing.Point(10, 37);
            this.nametextbox.Name = "nametextbox";
            this.nametextbox.Size = new System.Drawing.Size(100, 20);
            this.nametextbox.TabIndex = 2;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(7, 20);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(33, 13);
            this.label2.TabIndex = 1;
            this.label2.Text = "name";
            // 
            // menuStrip1
            // 
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.oepnConfigurationFolderToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(864, 24);
            this.menuStrip1.TabIndex = 13;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // oepnConfigurationFolderToolStripMenuItem
            // 
            this.oepnConfigurationFolderToolStripMenuItem.Name = "oepnConfigurationFolderToolStripMenuItem";
            this.oepnConfigurationFolderToolStripMenuItem.Size = new System.Drawing.Size(155, 20);
            this.oepnConfigurationFolderToolStripMenuItem.Text = "open configuration folder";
            this.oepnConfigurationFolderToolStripMenuItem.Click += new System.EventHandler(this.oepnConfigurationFolderToolStripMenuItem_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(864, 606);
            this.Controls.Add(this.groupBox4);
            this.Controls.Add(this.groupBox3);
            this.Controls.Add(this.groupBox2);
            this.Controls.Add(this.groupBox1);
            this.Controls.Add(this.menuStrip1);
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "Form1";
            this.Text = "Form1";
            this.groupBox1.ResumeLayout(false);
            this.groupBox1.PerformLayout();
            this.groupBox2.ResumeLayout(false);
            this.groupBox2.PerformLayout();
            this.groupBox3.ResumeLayout(false);
            this.groupBox3.PerformLayout();
            this.groupBox4.ResumeLayout(false);
            this.groupBox4.PerformLayout();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.RichTextBox configTextBox;
        private System.Windows.Forms.ComboBox configSourceComboBox;
        private System.Windows.Forms.Button refreshconfigstextbox;
        private System.Windows.Forms.TextBox newurltextbox;
        private System.Windows.Forms.TextBox newnametextbox;
        private System.Windows.Forms.TextBox newfoldertextbox;
        private System.Windows.Forms.Button addnewentrytextbox;
        private System.Windows.Forms.GroupBox groupBox1;
        private System.Windows.Forms.GroupBox groupBox2;
        private System.Windows.Forms.Button addconfigfile;
        private System.Windows.Forms.TextBox newconfigfilenametextbox;
        private System.Windows.Forms.GroupBox groupBox3;
        private System.Windows.Forms.RichTextBox outputTextBox;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Button startstopbutton;
        private System.Windows.Forms.ProgressBar progressBar;
        private System.Windows.Forms.GroupBox groupBox4;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem oepnConfigurationFolderToolStripMenuItem;
        private System.Windows.Forms.Button saveconfigbutton;
        private System.Windows.Forms.TextBox changedatetextbox;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.TextBox authortextbox;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.TextBox nametextbox;
        private System.Windows.Forms.Label label2;
    }
}

