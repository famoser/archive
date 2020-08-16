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

class header extends section
{
    private $is_fixedtop = false;

    public function __construct($foreground, $background)
    {
        parent::__construct("header", $foreground, $background, "header",
            new responsiveproperty(new emptyproperty(),
                new padding(EXTRA_SMALL_SPACER, NO_SPACER),
                new padding(SMALL_SPACER, NO_SPACER),
                new padding(EXTRA_SMALL_SPACER, NO_SPACER),
                new padding(SMALL_SPACER, NO_SPACER)
            ));
        $this->setNode("header");
    }

    public function makeFixedTop()
    {
        $this->addClass("fixed-top");
        $this->is_fixedtop = true;
    }
}