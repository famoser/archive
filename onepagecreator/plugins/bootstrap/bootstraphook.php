<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 23.12.2015
 * Time: 11:47
 */

namespace famoser\opc\plugins\bootstrap;

use famoser\opc\framework\plugins\htmlContentPlugin;

class bootstraphook extends htmlContentPlugin
{
    public function isUsed()
    {
        return true;
    }

    public function getBodyNodes()
    {
        return null;
    }

    public function getJavascript()
    {
        return file_get_contents(__DIR__ . "/js/bootstrap.min.js");
    }

    public function getCss()
    {
        return file_get_contents(__DIR__ . "/css/bootstrap.min.css");
    }

    public function isValid()
    {
        return true;
    }
}