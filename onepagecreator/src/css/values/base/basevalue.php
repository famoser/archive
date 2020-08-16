<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 10:49
 */

namespace famoser\opc\css\values\base;


use famoser\opc\css\interfaces\iCssProperty;

class basevalue implements iCssProperty
{
    private $value;
    private $key;

    public function __construct($key)
    {
        $this->key = $key;
    }

    public function setValue($value)
    {
        $this->value = $value;
    }

    public function render()
    {
        return $this->key . ":" . $this->value . ";";
    }
}