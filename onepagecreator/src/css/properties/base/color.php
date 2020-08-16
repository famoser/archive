<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 10:59
 */

namespace famoser\opc\css\properties\base;


class color extends \famoser\opc\css\values\color
{
    public function __construct($color, $opacity = false)
    {
        parent::__construct("color", $color, $opacity);
    }
}