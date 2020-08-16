<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 23.12.2015
 * Time: 15:34
 */

namespace famoser\opc\htmlnodes\base;


use function famoser\opc\framework\phphelper\file_to_string;
use famoser\opc\htmlnodes\interfaces\iHtmlElement;

class rawhtmlnode implements iHtmlElement
{
    private $html;

    public function __construct($filepath = null)
    {
        if ($filepath != null)
            $this->html = file_to_string($filepath);
    }

    public function setHtml($html)
    {
        $this->html = $html;
    }

    public function getCss()
    {
        return null;
    }

    public function getJavascript()
    {
        return null;
    }

    public function getCssIdentifier()
    {
        return null;
    }

    public function getHtml()
    {
        return $this->html;
    }
}