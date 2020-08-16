<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 25.12.2015
 * Time: 23:59
 */

namespace famoser\opc\css\properties\base;


use famoser\opc\css\values\dimension;

class height extends dimension
{
    public function __construct($height)
    {
        parent::__construct("height", $height);
    }
}