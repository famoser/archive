<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 10:30
 */

namespace famoser\opc\css\properties;


use famoser\opc\css\interfaces\iCssProperty;
use famoser\opc\css\properties\base\propertybase;
use function famoser\opc\framework\reflectionhelper\allPropertiesToString;

class colors extends propertybase implements iCssProperty
{
    private $foreground_color;
    private $background_color;

    public function __construct(iCssProperty $foreground = null, iCssProperty $background = null)
    {
        $this->foreground_color = $foreground;
        $this->background_color = $background;
    }

    public function setForeground(iCssProperty $foreground)
    {
        $this->foreground_color = $foreground;
    }

    public function setBackground(iCssProperty $background)
    {
        $this->background_color = $background;
    }

    public function render()
    {
        $output = "";
        if ($this->foreground_color != null)
            $output .= $this->foreground_color->render();
        if ($this->background_color != null)
            $output .= $this->background_color->render();
        return $output;
    }
}