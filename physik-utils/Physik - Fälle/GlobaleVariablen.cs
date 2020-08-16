using System;

static class GlobalClass
{
    private static double gravity2;
    public static double gravity
    {
        get { return gravity2; }
        set { gravity2 = value; }
    }
}