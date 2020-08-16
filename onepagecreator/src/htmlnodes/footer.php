<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 12:16
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\css\models\emptyproperty;
use famoser\opc\css\models\responsiveproperty;
use famoser\opc\css\properties\base\padding;
use famoser\opc\htmlnodes\base\text;

class footer extends section
{
    public function __construct($foreground = COLOR_GREY_DARK, $background = COLOR_GREY_LIGHT)
    {
        parent::__construct("footer", $foreground, $background, "footer",
            new responsiveproperty(new emptyproperty(),
                new padding(EXTRA_SMALL_SPACER, NO_SPACER, SMALL_SPACER, NO_SPACER),
                new padding(SMALL_SPACER, NO_SPACER, LARGE_SPACER, NO_SPACER),
                new padding(LARGE_SPACER, NO_SPACER, EXTRA_LARGE_SPACER, NO_SPACER),
                new padding(LARGE_SPACER, NO_SPACER, EXTRA_LARGE_SPACER, NO_SPACER)
            ));
        $div = new div();
        $div->addClass("wrapper");
        $p = new p();
        $p->addClass("text-center");
        $text = new text();
        $text->setText("Copyright © " . AUTHOR_NAME . " - ");
        $a = new a(AUTHOR_PAGE, AUTHOR_PAGE, AUTHOR_NAME, "_self");
        $p->addChildren($text);
        $p->addChildren($a);
        $div->addChildren($p);
        $this->addChildren($div);
    }
}