using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Famoser.CSharpTests
{
    class Parent
    {
        public const string DoStuffReturnValue = "hi mom";
        protected string DoStuff()
        {
            return DoStuffReturnValue;
        }
    }

    class Child : Parent
    {
        public string DoStuff()
        {
            return base.DoStuff();
        }
    }

    [TestClass]
    public class InheritanceTests
    {
        [TestMethod]
        public void TestProtectedInheritance()
        {
            var parent = new Parent();
            var child = new Child();
            Assert.AreEqual(child.DoStuff(), Parent.DoStuffReturnValue);
        }
    }
}
