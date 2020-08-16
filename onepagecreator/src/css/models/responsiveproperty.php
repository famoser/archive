<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 21.12.2015
 * Time: 23:09
 */

namespace famoser\opc\css\models;


use famoser\opc\css\interfaces\iCssElement;
use famoser\opc\css\interfaces\iCssProperty;

class responsiveproperty implements iCssElement
{
    public $common;
    public $mobile;
    public $tablet;
    public $dektop;
    public $ultra;

    public function __construct(iCssProperty $common, iCssProperty $mobile, iCssProperty $tablet, iCssProperty $desktop, iCssProperty $ultra)
    {
        $this->common = $common;
        $this->mobile = $mobile;
        $this->tablet = $tablet;
        $this->dektop = $desktop;
        $this->ultra = $ultra;
    }

    public function getCommonCss()
    {
        if ($this->common instanceof iCssProperty)
            return $this->common->render();
        return null;
    }

    public function getMobileCss()
    {
        if ($this->mobile instanceof iCssProperty)
            return $this->mobile->render();
        return null;
    }

    public function getTabletCss()
    {
        if ($this->tablet instanceof iCssProperty)
            return $this->tablet->render();
        return null;
    }

    public function getDesktopCss()
    {
        if ($this->dektop instanceof iCssProperty)
            return $this->dektop->render();
        return null;
    }

    public function getUltraCss()
    {
        if ($this->ultra instanceof iCssProperty)
            return $this->ultra->render();
        return null;
    }
}