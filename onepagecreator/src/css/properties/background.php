<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 26.12.2015
 * Time: 00:27
 */

namespace famoser\opc\css\properties;


use famoser\opc\css\interfaces\iCssProperty;
use famoser\opc\css\properties\base\backgroundattached;
use famoser\opc\css\properties\base\propertybase;

class background extends propertybase implements iCssProperty
{
    private $background;
    private $background_size;
    private $background_attachment;

    public function __construct(iCssProperty $background = null, iCssProperty $backgroundSize = null, $backgroundFixed = false)
    {
        $this->background = $background;
        $this->background_size = $backgroundSize;
        if ($backgroundFixed) {
            $this->background_attachment = new backgroundattached();
        }
    }

    public function setBackground(iCssProperty $background)
    {
        $this->background = $background;
    }

    public function setBackgroundSize(iCssProperty $backgroundSize)
    {
        $this->background_size = $backgroundSize;
    }

    public function setBackgroundFixed(iCssProperty $backgroundFixed)
    {
        $this->background_attachment = $backgroundFixed;
    }

    public function render()
    {
        $output = "";
        if ($this->background != null)
            $output .= $this->background->render();
        if ($this->background_size != null)
            $output .= $this->background_size->render();
        if ($this->background_attachment != null)
            $output .= $this->background_attachment->render();
        return $output;
    }
}