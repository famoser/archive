<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 26.12.2015
 * Time: 00:34
 */

namespace famoser\opc\css\properties\base;


use famoser\opc\css\values\base\basevalue;

class backgroundattached extends basevalue
{
    public function __construct()
    {
        parent::__construct("background-attached");
        $this->setValue("fixed");
    }
}