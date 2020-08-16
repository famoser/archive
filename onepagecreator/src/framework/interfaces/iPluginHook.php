<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 23.12.2015
 * Time: 11:47
 */

namespace famoser\opc\framework\interfaces;


interface iPluginHook
{
    public function isUsed();

    public function getHeadNodes();

    public function getBodyNodes();

    public function getJavascript();

    public function getJavascriptElement();

    public function getCss();

    public function isValid();
}