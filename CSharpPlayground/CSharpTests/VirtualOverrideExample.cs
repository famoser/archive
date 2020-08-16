using System;

namespace Famoser.CSharpTests
{
    class A : C
    {
        public override int Method(int x)
        {
            throw new NotImplementedException();
        }
    }
    class B
    {
        public virtual int Method(int x)
        {
            throw new NotImplementedException();
        }
    }
    class C
    {
        public virtual int Method(int x)
        {
            throw new NotImplementedException();
        }
    }
    class D : B
    {
        public override int Method(int x)
        {
            throw new NotImplementedException();
        }
    }
    class D2 : C
    {
        public override int Method(int x)
        {
            throw new NotImplementedException();
        }
    }
}
