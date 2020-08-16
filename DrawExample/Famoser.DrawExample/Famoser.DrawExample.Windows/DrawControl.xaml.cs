using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices.WindowsRuntime;
using Windows.Foundation;
using Windows.Foundation.Collections;
using Windows.UI;
using Windows.UI.Xaml;
using Windows.UI.Xaml.Controls;
using Windows.UI.Xaml.Controls.Primitives;
using Windows.UI.Xaml.Data;
using Windows.UI.Xaml.Input;
using Windows.UI.Xaml.Media;
using Windows.UI.Xaml.Navigation;
using Windows.UI.Xaml.Shapes;

// The User Control item template is documented at http://go.microsoft.com/fwlink/?LinkId=234236

namespace Famoser.DrawExample
{
    public sealed partial class DrawControl : UserControl
    {
        public DrawControl()
        {
            this.InitializeComponent();

            _redPolygon = new Polygon
            {
                FillRule = FillRule.EvenOdd,
                Points = new PointCollection(),
                Fill = new SolidColorBrush(Colors.Red)
            };
            RedCanvas.Children.Add(_redPolygon);
        }

        private void IntializeGrid(int rows, int columns, Color color, int strokeThickness = 2)
        {
            var width = GridCanvas.ActualWidth / columns;
            var height = GridCanvas.ActualHeight / rows;
            if (width > height)
                width = height;
            else
                height = width;

            _xSpacer = width;
            _ySpacer = width;
            var fullheight = height * rows;
            var fullwidth = width * columns;

            Width = fullwidth;
            Height = fullheight;

            GridCanvas.Height = fullheight;
            GridCanvas.Width = fullwidth;

            double currentY = 0;
            for (int i = 0; i <= rows; i++)
            {
                var line = new Line
                {
                    X1 = 0,
                    X2 = fullwidth,
                    Y1 = currentY,
                    Y2 = currentY,
                    Width = fullwidth,
                    Height = fullheight,
                    Stroke = new SolidColorBrush(color),
                    StrokeThickness = strokeThickness
                };
                GridCanvas.Children.Add(line);
                currentY += width;
            }

            double currentX = 0;
            for (int i = 0; i <= columns; i++)
            {
                var line = new Line
                {
                    Y1 = 0,
                    Y2 = fullheight,
                    X1 = currentX,
                    X2 = currentX,
                    Width = fullwidth,
                    Height = fullheight,
                    Stroke = new SolidColorBrush(color),
                    StrokeThickness = strokeThickness
                };
                GridCanvas.Children.Add(line);
                currentX += width;
            }

            RedCanvas.Width = fullwidth;
            RedCanvas.Height = fullheight;
        }

        private void Canvas_Loaded(object sender, RoutedEventArgs e)
        {
            IntializeGrid(_rows, _columns, Colors.Black);
        }

        private double _xSpacer;
        private double _ySpacer;

        private int _rows = 3;
        private int _columns = 6;

        private readonly Polygon _redPolygon;

        private void InputGrid_Tapped(object sender, TappedRoutedEventArgs e)
        {
            var p = e.GetPosition(RedCanvas);
            var ellipse = new Ellipse()
            {
                Width = 30,
                Height = 30,
                Fill = new SolidColorBrush(Colors.Black)
            };

            var halfXSpacer = _xSpacer / 2;
            var halfYSpacer = _ySpacer / 2;
            var approachX = Math.Round(p.X / halfXSpacer) * halfXSpacer;
            var approachY = Math.Round(p.Y / halfYSpacer) * halfYSpacer;

            Canvas.SetLeft(ellipse, approachX - 15);
            Canvas.SetTop(ellipse, approachY - 15);

            _redPolygon.Points.Add(new Point(approachX, approachY));

            PointsCanvas.Children.Add(ellipse);
        }
    }
}
