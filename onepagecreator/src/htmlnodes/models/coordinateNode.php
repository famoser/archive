<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 26.12.2015
 * Time: 13:24
 */

namespace famoser\opc\htmlnodes\models;


use famoser\opc\htmlnodes\interfaces\iHtmlElement;

class coordinateNode
{
    private $content;
    private $width;
    private $paddingLeft;

    public function __construct(iHtmlElement $content, $width, $paddingleft)
    {
        $this->content = $content;
        $this->width = $width;
        $this->paddingLeft = $paddingleft;
    }

    public function getWidth()
    {
        return $this->width;
    }

    public function getPaddingLeft()
    {
        return $this->paddingLeft;
    }

    public function getContent()
    {
        return $this->content;
    }
}