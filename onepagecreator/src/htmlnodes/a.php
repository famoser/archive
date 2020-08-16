<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 18:02
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\htmlnodes\base\basenode;

class a extends basenode
{
    private $link;
    private $alt;
    private $target;

    public function __construct($link, $text = null, $alt = null, $target = "_blank")
    {
        parent::__construct("a");

        $this->link = $link;

        if ($text == null)
            $this->setText($link);
        else
            $this->setText($text);

        if ($alt == null)
            $this->alt = $text;
        else
            $this->alt = $alt;

        $this->target = $target;
    }

    public function getHtml()
    {
        return '<a href="' . $this->link . '" alt="' . $this->alt . '" target="' . $this->target . '">' . $this->getText() . '</a>';
    }
}