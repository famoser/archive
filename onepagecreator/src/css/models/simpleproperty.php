<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 23.12.2015
 * Time: 20:38
 */

namespace famoser\opc\css\models;


use famoser\opc\css\interfaces\iCssElement;
use famoser\opc\css\interfaces\iCssProperty;

class simpleproperty implements iCssElement
{
    private $property;

    public function __construct(iCssProperty $property)
    {
        $this->property = $property;
    }

    public function getCommonCss()
    {
        if ($this->property instanceof iCssProperty)
            return $this->property->render();
        return null;
    }

    public function getMobileCss()
    {
        return null;
    }

    public function getTabletCss()
    {
        return null;
    }

    public function getDesktopCss()
    {
        return null;
    }

    public function getUltraCss()
    {
        return null;
    }
}