<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 10:57
 */

namespace famoser\opc\css\properties\base;


use famoser\opc\css\values\color;

class backgroundcolor extends color
{
    public function __construct($color, $opacity = false)
    {
        parent::__construct("background-color", $color, $opacity);
    }
}