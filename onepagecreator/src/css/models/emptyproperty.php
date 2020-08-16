<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 24.12.2015
 * Time: 14:51
 */

namespace famoser\opc\css\models;


use famoser\opc\css\interfaces\iCssProperty;

class emptyproperty implements iCssProperty
{
    public function render()
    {
        return null;
    }
}