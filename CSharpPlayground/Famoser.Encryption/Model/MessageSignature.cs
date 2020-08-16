using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Famoser.Encryption.Model
{
    public class MessageSignature
    {
        public int RandomR { get; set; }
        public int SignatureS { get; set; }
    }
}
