<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 22:43
 */

namespace famoser\opc\htmlnodes\base;


use famoser\opc\htmlnodes\interfaces\iHtmlElement;

class keyvaluenode implements iHtmlElement
{
    private $node;
    private $keyvalues = array();

    public function __construct($node)
    {
        $this->node = $node;
    }

    public function addKeyValue($key, $value)
    {
        $this->keyvalues[$key] = $value;
    }

    public function getCss()
    {
        return null;
    }

    public function getCssIdentifier()
    {
        return null;
    }

    public function getJavascript()
    {
        return null;
    }

    public function getHtml()
    {
        $output = "<" . $this->node . " ";
        foreach ($this->keyvalues as $key => $val) {
            $output .= $key . '="' . $val . '" ';
        }
        if ($this->node == "link" || $this->node == "meta" || $this->node == "base" || $this->node == "br")
            $output .= "/>";
        else
            $output .= "></" . $this->node . ">";
        return $output;
    }
}