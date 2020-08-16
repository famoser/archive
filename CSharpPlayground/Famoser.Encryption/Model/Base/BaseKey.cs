using System;

namespace Famoser.Encryption.Model.Base
{
    public class BaseKey
    {
        public int PrimeP { get; set; }
        public int PrimeQ { get; set; }
        public int BaseG { get; set; }

        public static Tuple<PrivateKey, PublicKey> ConstructKeyPair(int primeQ, int primeP, int baseG, int privateX, int publicY)
        {
            var privateKey = new PrivateKey
            {
                BaseG = baseG,
                PrimeP = primeP,
                PrimeQ = primeQ,
                PrivateKeyX = privateX
            };
            var publicKey = new PublicKey()
            {
                BaseG = baseG,
                PrimeP = primeP,
                PrimeQ = primeQ,
                PublicKeyY = publicY
            };
            return new Tuple<PrivateKey, PublicKey>(privateKey, publicKey);
        }
    }
}
