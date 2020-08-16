<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 12:16
 */

namespace famoser\opc\htmlnodes\premades\sections;


use famoser\opc\htmlnodes\a;
use famoser\opc\htmlnodes\base\text;
use famoser\opc\htmlnodes\div;
use famoser\opc\htmlnodes\p;
use famoser\opc\htmlnodes\section;

class debug extends section
{
    public function __construct($foreground = COLOR_GREY_DARK, $background = COLOR_GREY_LIGHT)
    {
        parent::__construct("debug", $foreground, $background);
        $div = new div();
        $div->addClass("wrapper");
        $p = new p();
        $p->addClass("text-center");
        $text = new text();
        $text->setText("try again @ ");
        $a = new a(ONEPAGECREATOR_HOOK);
        $p->addChildren($text);
        $p->addChildren($a);
        $div->addChildren($p);
        $this->addChildren($div);
    }
}