<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 10:51
 */

namespace famoser\opc\css\properties;


use famoser\opc\css\interfaces\iCssProperty;
use famoser\opc\css\properties\base\propertybase;

class spacing extends propertybase implements iCssProperty
{
    private $margin;
    private $padding;

    public function __construct(iCssProperty $margin = null, iCssProperty $padding = null)
    {
        $this->margin = $margin;
        $this->padding = $padding;
    }

    public function setMargin(iCssProperty $margin)
    {
        $this->margin = $margin;
    }

    public function setPadding(iCssProperty $padding)
    {
        $this->padding = $padding;
    }

    public function render()
    {
        $output = "";
        if ($this->margin != null)
            $output .= $this->margin->render();
        if ($this->padding != null)
            $output .= $this->padding->render();
        return $output;
    }
}