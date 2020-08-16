<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 24.12.2015
 * Time: 19:59
 */

namespace famoser\opc\plugins\jquery;


use famoser\opc\framework\plugins\htmlContentPlugin;

class jqueryhook extends htmlContentPlugin
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
        return file_get_contents(__DIR__ . "/js/jquery-2.1.4.min.js");
    }

    public function isValid()
    {
        return true;
    }
}