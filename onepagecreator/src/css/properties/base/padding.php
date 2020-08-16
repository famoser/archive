<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 20.12.2015
 * Time: 21:48
 */

namespace famoser\opc\css\properties\base;


use famoser\opc\css\values\spacer;

class padding extends spacer
{
    /**
     * padding constructor.
     * 1 value: $margin
     * 2 values: $topbottom und $leftright
     * 4 values: $left, $top, $right, $bottom
     * @param $padding
     * @param null $topbottom
     * @param null $right
     * @param null $bottom
     */
    public function __construct($padding, $topbottom = null, $right = null, $bottom = null)
    {
        parent::__construct("padding", $padding, $topbottom, $right, $bottom);
    }
}