using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Famoser.Encryption.Model;
using Famoser.Encryption.Model.Base;

namespace Famoser.Encryption.Encryption
{
    // ReSharper disable PossibleLossOfFraction
    public class DsaKeyManager
    {
        private enum RandomPosition
        {
            RandomH,
            RandomX,
            RandomK
        }

        private readonly bool _deterministic;
        public DsaKeyManager(bool determistic = false)
        {
            _deterministic = determistic;
        }

        private int GetRandom(RandomPosition position, int min, int max)
        {
            if (_deterministic)
            {
                switch (position)
                {
                    case RandomPosition.RandomX:
                        return 7;
                    case RandomPosition.RandomH:
                        return 2;
                    case RandomPosition.RandomK:
                        return 5;
                    default:
                        throw new ArgumentException("this position is not supported");
                }
            }

            return Random.Next(min, max);
        }

        private static readonly Random Random = new Random();
        public Tuple<PrivateKey, PublicKey> GenerateKeyPair()
        {
            /*
                q = 11       # selected prime divisor
                p = 23       # computed prime modulus: (p-1) mod q = 0
                g = 4        # computed: 1 < g < p, g**q mod p = 1: 
                             #           and g = h**((p–1)/q) mod p
                             #           4**11 mod 23 = 1: 4194304 mod 23 = 1
                x = 7        # selected: 0 < x < q
                y = 8        # computed: y = g**x mod p = 4**7 mod 23
                {23,11,4,8}  # the public key: {p,q,g,y}
                {23,11,4,7}  # the private key: {p,q,g,x} 
             */

            var primeQ = 11;
            var primeP = 23;

            var randomH = GetRandom(RandomPosition.RandomH, 1, primeQ - 1);
            var baseG = (int)Math.Pow(randomH, (primeP - 1) / primeQ);

            var privateX = GetRandom(RandomPosition.RandomX, 1, primeQ - 1); 
            var publicY = (int)Math.Pow(baseG, privateX) % primeP;

            return BaseKey.ConstructKeyPair(primeQ, primeP, baseG, privateX, publicY);
        }

        public MessageSignature SignMessage(int messageHash, PrivateKey privateKey)
        {
            /*
                h = 3      # the hash value as the message digest
                k = 5      # selected: 0 < k < q
                r = 1      # computed: r = (g**k mod p) mod q = (4**5 mod 23) mod 11
                i = 9      # computed: k*i mod q = 1: 5*i mod 11 = 1
                s = 2      # computed: s = i*(h+r*x) mod q = 9*(3+1*7) mod 11
                {1,2}      # the digital signature: {r,s}
             */
            var randomK = GetRandom(RandomPosition.RandomK, 1, privateKey.PrimeQ - 1);
            var randomR = (int)Math.Pow(privateKey.BaseG, randomK) % privateKey.PrimeP % privateKey.PrimeQ;
            var inverseI = NaiveModuloInverse(randomK, privateKey.PrimeQ);

            var signatureS = inverseI * (messageHash + randomR * privateKey.PrivateKeyX)
                             % privateKey.PrimeQ;

            return new MessageSignature
            {
                RandomR = randomR,
                SignatureS = signatureS
            };
        }

        public bool VerifyMessageSignature(int messageHash, MessageSignature messageSignature, PublicKey publicKey)
        {
            /*
                h = 3      # the hash value as the message digest
                w = 6      # computed: s*w mod q = 1: 2*w mod 11 = 1
                u1 = 7     # computed: u1 = h*w mod q = 3*6 mod 11 = 7
                u2 = 6     # computed: u2 = r*w mod q = 1*6 mod 11 = 6
                v = 1      # computed: v = (((g**u1)*(y**u2)) mod p) mod q
                           #             = (((4**7)*(8**6)) mod 23) mod 11 = 2
                           #             = 16384*262144 mod 23 mod 11 = 1
                v == r     # verification passed
             */

            var inverseW = NaiveModuloInverse(messageSignature.SignatureS, publicKey.PrimeQ);
            var factorU1 = messageHash * inverseW % publicKey.PrimeQ;
            var factorU2 = messageSignature.RandomR * inverseW % publicKey.PrimeQ;

            var verificationV =
                ((long)Math.Pow(publicKey.BaseG, factorU1) % publicKey.PrimeP) * 
                ((long)Math.Pow(publicKey.PublicKeyY, factorU2) % publicKey.PrimeP)
                % publicKey.PrimeP 
                % publicKey.PrimeQ;

            return verificationV == messageSignature.RandomR;
        }

        private static int NaiveModuloInverse(int k, int g)
        {
            var counter = 1;
            while (k * counter % g != 1)
                counter++;
            return counter;
        }
    }
}
