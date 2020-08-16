<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 25.12.2015
 * Time: 18:12
 */

namespace famoser\opc\framework\plugins;


use famoser\opc\framework\interfaces\iPluginHook;

abstract class selectorPlugin implements iPluginHook
{
    private $selector;

    public function __construct($selector)
    {
        $this->selector = $selector;
    }

    public function setSelector($selector)
    {
        $this->selector = $selector;
    }

    public function getSelector()
    {
        return $this->selector;
    }

    public function tryGetId()
    {
        return substr($this->selector, 1);
    }

    public function isUsed()
    {
        return $this->selector != null;
    }

    public function isValid()
    {
        return $this->selector != null;
    }
}