<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 25.12.2015
 * Time: 19:00
 */

namespace famoser\opc\framework\plugins;


abstract class htmlJavascriptPlugin extends selectorPlugin
{
    public function getHeadNodes()
    {
        return null;
    }

    public function getBodyNodes()
    {
        return null;
    }

    public function getCss()
    {
        return null;
    }
}