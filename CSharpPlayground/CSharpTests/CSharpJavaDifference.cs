using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Famoser.CSharpTests
{
    public class Super
    {
        public string m(object stuff)
        {
            return "SUPER object";
        }
        public string m2(string stuff)
        {
            return "SUPER";
        }
    }
    
    public interface AnotherSuper<in T>
    {
        void DoStuff(T voi);
    }

    public class Sub : Super
    {
        public string m(string stuff)
        {
            return "SUB";
        }
        public string m2(object stuff)
        {
            return "SUB";
        }
    }

    [TestClass]
   public class CSharpJavaDifference
    {
        [TestMethod]
        public void TestSubSuper()
        {
            Super s = new Sub();
            Assert.IsTrue(s.m("string") == "SUPER object");
            Assert.IsTrue(s.m2("string") == "SUPER");


            Sub s2 = new Sub();
            Assert.IsTrue(s2.m("string") == "SUB");
            Assert.IsTrue(s2.m2("string") == "SUB");
        }
    }
}
