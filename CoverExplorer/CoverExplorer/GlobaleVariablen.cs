using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace CoverExplorer
{
    static class Servererror
    {
        private static int seekacover2;
            public static int seekacover
            {
                get { return seekacover2; }
                set { seekacover2 = value; }
  
            }
        private static int amazon2;
            public static int amazon
            {
                get { return amazon2; }
                set { amazon2 = value; }
  
            }
    }
    static class Quelltexterror
    {
        private static int seekacover2;
        public static int seekacover
        {
            get { return seekacover2; }
            set { seekacover2 = value; }

        }
    }
    static class Anzeige
    {
        private static int aktiveselement2;
        public static int indexaktiveselement
        {
            get { return aktiveselement2; }
            set { aktiveselement2= value; }

        }
        private static bool textboxchanged2;
        public static bool textboxchanged
        {
            get { return textboxchanged2; }
            set { textboxchanged2 = value; }

        }
        private static int indexaktivesalbumcover2;
        public static int indexaktivesalbumcover
        {
            get { return indexaktivesalbumcover2; }
            set { indexaktivesalbumcover2 = value; }

        }
    }
    static class Errorinfo
    {
        private static string error2;
        public static string error
        {
            get { return error2; }
            set { error2 = value; }

        }
        private static string warnung2;
        public static string warnung
        {
            get { return warnung2; }
            set { warnung2 = value; }

        }
    }
    static class Updateinfo
    {
        private static double version2;
        public static double version
        {
            get { return version2; }
            set { version2 = value; }

        }
        private static bool updatestart2;
        public static bool updatestart
        {
            get { return updatestart2; }
            set { updatestart2 = value; }

        }
    }
    static class Funktionen
    {
        private static int anzahl2;
        public static int anzahl
        {
            get { return anzahl2; }
            set { anzahl2 = value; }

        }
        private static string htmlcode2;
        public static string htmlcode
        {
            get { return htmlcode2; }
            set { htmlcode2 = value; }

        }
        private static bool overwritetried2;
        public static bool overwritetried
        {
            get { return overwritetried2; }
            set { overwritetried2 = value; }

        }
        private static bool Getcoveraktiv2;
        public static bool Getcoveraktiv
        {
            get { return Getcoveraktiv2; }
            set { Getcoveraktiv2 = value; }

        }
        
        private static int frage2;
            public static int frage
            {
                get { return frage2; }
                set { frage2 = value; }
            }

            private static int safetylevel2; //0 = 0 problems 10 = much problems
            public static int safetylevel
            {
                get { return safetylevel2; }
                set { safetylevel2 = value; }
            }
    }
  
    
}
