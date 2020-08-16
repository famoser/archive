namespace Famoser.CSharpTests.PatternTests
{
    class Shape2
    {
        public virtual Shape2 Intersect(Shape2 s)
        {
            //do general intersection here
            return new Shape2();
        }
    }

    class Rectangle2 : Shape2
    {
        public override Shape2 Intersect(Shape2 s)
        {
            if (s is Rectangle2 rectangle)
                return rectangle.IntersectRectangle(this);
            return base.Intersect(this);
        }

        public Shape2 IntersectRectangle(Rectangle2 r)
        {
            // efficient code for two rectangles 
            return r;
        }
    }
}
