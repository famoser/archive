<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 25.12.2015
 * Time: 23:58
 */

namespace famoser\opc\css\values;


use famoser\opc\css\values\base\basevalue;

class dimension extends basevalue
{
    public function __construct($key, $dimension)
    {
        parent::__construct($key);
        $this->setValue($dimension);
    }
}