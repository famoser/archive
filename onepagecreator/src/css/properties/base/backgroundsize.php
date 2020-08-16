<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 26.12.2015
 * Time: 00:36
 */

namespace famoser\opc\css\properties\base;


use famoser\opc\css\values\base\basecrossbrowservalue;

class backgroundsize extends basecrossbrowservalue
{
    public function __construct($backgroundSize)
    {
        parent::__construct("background-size");
        $this->setValue($backgroundSize);
    }
}