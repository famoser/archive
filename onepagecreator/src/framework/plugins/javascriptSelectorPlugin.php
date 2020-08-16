<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 25.12.2015
 * Time: 18:15
 */

namespace famoser\opc\framework\plugins;


abstract class javascriptSelectorPlugin extends selectorPlugin
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