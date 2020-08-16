<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 21.12.2015
 * Time: 23:51
 */

namespace famoser\opc\htmlnodes\interfaces;


interface iHtmlElement
{
    public function getCssIdentifier();
    public function getCss();
    public function getJavascript();
    public function getHtml();
}