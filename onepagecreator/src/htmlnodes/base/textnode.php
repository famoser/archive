<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 20.12.2015
 * Time: 18:59
 */


namespace famoser\opc\htmlnodes\base;

class textnode extends text
{
    private $node;

    public function __construct($node, $text = null)
    {
        parent::__construct($text);
        $this->node = $node;
    }

    public function setNode($node)
    {
        $this->node = $node;
    }

    public function getNode()
    {
        return $this->node;
    }

    public function getHtml()
    {
        return '<' . $this->node . '>' . $this->getText() . '</' . $this->node . '>';
    }
}