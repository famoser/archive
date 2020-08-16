using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Famoser.CSharpTests
{
    public class Matrix
    {
        public const string AddReturn = "M/M";

        public string Add(Matrix other)
        {
            return AddReturn;
        }
    }

    public class SparseMatrix : Matrix
    {
        public new const string AddReturn = "S/S";

        public string Add(SparseMatrix other)
        {
            return AddReturn;
        }
    }
    
    [TestClass]
    public class DynamicInheritanceExample
    {
        [TestMethod]
        public void TestMatrixInheritance()
        {
            Matrix m = new Matrix();
            Matrix s = new SparseMatrix();
            Assert.IsTrue(Matrix.AddReturn == Add(m, m));
            Assert.IsTrue(Matrix.AddReturn == Add(s, m));
            Assert.IsTrue(Matrix.AddReturn == Add(m, s));
            Assert.IsTrue(SparseMatrix.AddReturn == Add(s, s));
        }

        public string Add(Matrix m1, Matrix m2)
        {
            return ((dynamic)m1).Add((dynamic)m2);
        }
    }
}
