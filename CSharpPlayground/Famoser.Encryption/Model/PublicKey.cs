using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Famoser.Encryption.Model.Base;

namespace Famoser.Encryption.Model
{
    public class PublicKey : BaseKey
    {
        public int PublicKeyY { get; set; }
    }
}
