<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 26.12.2015
 * Time: 00:51
 */

namespace famoser\opc\css\properties\base;


use famoser\opc\css\values\base\basevalue;

class position extends basevalue
{
    public function __construct($position)
    {
        parent::__construct("position");
        $this->setValue($position);
    }
}