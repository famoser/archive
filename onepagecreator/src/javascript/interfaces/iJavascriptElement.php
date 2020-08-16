<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 24.12.2015
 * Time: 00:25
 */

namespace famoser\opc\javascript\interfaces;


interface iJavascriptElement
{
    public function getJavacript();

    public function getDocumentReady();

    public function getWindowLoaded();
}