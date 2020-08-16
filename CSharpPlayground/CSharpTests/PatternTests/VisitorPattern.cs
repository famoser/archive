namespace Famoser.CSharpTests.PatternTests
{
    class Shape
    {
        public virtual Shape Intersect(Shape s)
        {
            return s.IntersectShape(this);
        }

        public Shape IntersectShape(Shape s)
        {
            // general code for all shapes 

            //just return s in this sample "implementation"
            return new Shape();
        }

        public virtual Shape IntersectRectangle(Rectangle r)
        {
            return IntersectShape(r);
        }
    }

    class Rectangle : Shape
    {
        public override Shape Intersect(Shape s)
        {
            return s.IntersectRectangle(this);
        }

        public override Shape IntersectRectangle(Rectangle r)
        {
            // efficient code for two rectangles 

            return r;
        }
    }
}
