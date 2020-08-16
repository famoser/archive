<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 10:31
 */

namespace famoser\opc\css\values;


use famoser\opc\css\values\base\basevalue;
use function famoser\opc\helpers\csshelper\convertHexToRgba;

class color extends basevalue
{
    private $color;
    private $opacity;

    public function __construct($key, $color, $opacity = false)
    {
        parent::__construct($key);
        $this->color = $color;
        $this->opacity = $opacity;
    }

    public function render()
    {
        if (substr($this->color, 0, 1) == "#")
            $this->color = substr($this->color, 1);
        if (strlen($this->color) == 6 || strlen($this->color) == 3) {
            $this->setValue(convertHexToRgba($this->color, $this->opacity));
        } else {
            $this->setValue($this->color);
        }
        return parent::render();
    }
}