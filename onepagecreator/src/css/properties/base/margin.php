<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 20.12.2015
 * Time: 21:48
 */

namespace famoser\opc\css\properties\base;


use famoser\opc\css\values\spacer;

class margin extends spacer
{
    public function __construct($margin, $topbottom = null, $right = null, $bottom = null)
    {
        parent::__construct("margin", $margin, $topbottom, $right, $bottom);
    }
}