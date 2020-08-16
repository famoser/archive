using System;
using Famoser.Encryption.Encryption;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Famoser.Encryption
{
    [TestClass]
    public class DsaTest
    {
        [TestMethod]
        public void DeterministicExample()
        {
            //choose deterministic path 
            var messageHash = 3;
            var manager = new DsaKeyManager(true);

            var keyPair = manager.GenerateKeyPair();

            //verify private key
            Assert.AreEqual(23, keyPair.Item1.PrimeP);
            Assert.AreEqual(11, keyPair.Item1.PrimeQ);
            Assert.AreEqual(4, keyPair.Item1.BaseG);
            Assert.AreEqual(7, keyPair.Item1.PrivateKeyX);

            //verify public key
            Assert.AreEqual(23, keyPair.Item2.PrimeP);
            Assert.AreEqual(11, keyPair.Item2.PrimeQ);
            Assert.AreEqual(4, keyPair.Item2.BaseG);
            Assert.AreEqual(8, keyPair.Item2.PublicKeyY);

            var signature = manager.SignMessage(messageHash, keyPair.Item1);

            //verify signature
            Assert.AreEqual(1, signature.RandomR);
            Assert.AreEqual(2, signature.SignatureS);

            var verification = manager.VerifyMessageSignature(messageHash, signature, keyPair.Item2);
            Assert.AreEqual(true, verification);
        }


        [TestMethod]
        public void RandomExample()
        {
            //choose random path 
            var messageHash = 5;
            var manager = new DsaKeyManager();

            //generate keys & use them
            var keyPair = manager.GenerateKeyPair();
            var signature = manager.SignMessage(messageHash, keyPair.Item1);
            var verification = manager.VerifyMessageSignature(messageHash, signature, keyPair.Item2);

            //check that it succeeds
            Assert.AreEqual(true, verification);
        }
    }
}
