<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 20.12.2015
 * Time: 18:59
 */


namespace famoser\opc\htmlnodes\base;

use famoser\opc\htmlnodes\interfaces\iHtmlElement;

class text implements iHtmlElement
{
    private $text;

    public function __construct($text = null)
    {
        $this->text = $text;
    }

    public function setText($text)
    {
        $this->text = $text;
    }

    public function addText($text)
    {
        $this->text .= $text;
    }

    public function getText()
    {
        return $this->text;
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
        return $this->text;
    }
}