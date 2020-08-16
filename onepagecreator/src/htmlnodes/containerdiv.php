<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 27.12.2015
 * Time: 20:58
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\css\models\simpleproperty;
use famoser\opc\css\properties\base\backgroundcolor;
use famoser\opc\css\properties\base\color;
use famoser\opc\css\properties\colors;
use famoser\opc\htmlnodes\base\container;

class containerdiv extends container
{
    public function __construct($id, $foreground = null, $background = null, $customNode = "div")
    {
        parent::__construct($customNode);
        $this->setId($id);

        $foregroundColor = null;
        if ($foreground != null)
            $foregroundColor = new color($foreground);
        $backgroundColor = null;
        if ($background != null)
            $backgroundColor = new backgroundcolor($background);
        $this->addCssElements(new simpleproperty(new colors($foregroundColor, $backgroundColor)));
    }
}