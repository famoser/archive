<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 25.12.2015
 * Time: 23:50
 */

namespace famoser\opc\htmlnodes\premades\sections;


use famoser\opc\css\models\simpleproperty;
use famoser\opc\css\properties\base\backgroundsize;
use famoser\opc\css\properties\base\height;
use famoser\opc\css\properties\base\padding;
use famoser\opc\css\properties\base\position;
use famoser\opc\css\properties\base\width;
use famoser\opc\htmlnodes\section;

class background extends section
{
    public function __construct($backgroundimagePath, $height, $absolute = false, $fixed = false, $id = null)
    {
        parent::__construct($id, null, null, "section", new simpleproperty(new padding(0)));
        $background = new \famoser\opc\css\properties\background(
            new \famoser\opc\css\properties\base\background('url("..' . $backgroundimagePath . '")'),
            new backgroundsize("cover"),
            $fixed
        );
        $this->addCssElements(new simpleproperty($background));
        $this->addCssElements(new simpleproperty(new width("100%")));
        $this->addCssElements(new simpleproperty(new height($height)));
        if ($absolute == true)
            $this->addCssElements(new simpleproperty(new position("absolute")));
    }

}