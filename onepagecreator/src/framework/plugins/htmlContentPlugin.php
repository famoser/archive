<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 26.12.2015
 * Time: 16:17
 */

namespace famoser\opc\framework\plugins;


use famoser\opc\framework\interfaces\iPluginHook;

abstract class htmlContentPlugin implements iPluginHook
{
    public function getHeadNodes()
    {
        return null;
    }

    public function getJavascript()
    {
        return null;
    }

    public function getJavascriptElement()
    {
        return null;
    }

    public function getCss()
    {
        return null;
    }
}