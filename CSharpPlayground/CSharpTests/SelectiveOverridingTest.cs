using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Famoser.CSharpTests
{
    class Seq
    {
        private int[] _a;

        public Seq(int size)
        {
            _a = new int[size];
        }
        // all initialized to 0 
        public int GetSize()
        {
            return _a.Length;
        }

        public int GetAt(int i)
        {
            return _a[i];
        }

        public void SetAt(int i, int x)
        {
            _a[i] = x;
        }

        public void AddTo(int i, int x)
        {
            _a[i] += x;
        }

        public void AddToAll(int x)
        {
            for (var i = 0; i < _a.Length; i++)
                AddTo(i, x);
        }

    }

    class SeqSum : Seq
    {
        private int _sum = 0;

        public SeqSum(int size) : base(size) { }

        public int GetSum()
        {
            return _sum;
        }

        public void SetAt(int i, int x)
        {
            var newSum = _sum + x - GetAt(i);
            base.SetAt(i, x); _sum = newSum;
        }

        public void AddTo(int i, int x)
        {
            var newSum = _sum + x;
            base.AddTo(i, x); _sum = newSum;
        }

        public void AddToAll(int x)
        {
            base.AddToAll(x); _sum += GetSize() * x;
        }
    }

    [TestClass]
    public class SelectiveOverridingTest
    {
        [TestMethod]
        public void TestStaticBinding()
        {
            var val = new SeqSum(1);
            val.AddToAll(2);
            Assert.AreEqual(val.GetSum(), 2);
        }
    }
}
