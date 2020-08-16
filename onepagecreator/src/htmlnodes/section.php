<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 20.12.2015
 * Time: 18:51
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\css\interfaces\iCssElement;
use famoser\opc\css\models\emptyproperty;
use famoser\opc\css\models\responsiveproperty;
use famoser\opc\css\models\simpleproperty;
use famoser\opc\css\properties\base\backgroundcolor;
use famoser\opc\css\properties\base\color;
use famoser\opc\css\properties\base\padding;
use famoser\opc\css\properties\colors;
use famoser\opc\htmlnodes\base\container;

class section extends container
{
    public function __construct($id, $foreground, $background, $customNode = "section", iCssElement $customSpacing = null)
    {
        parent::__construct($customNode);
        $this->setId($id);

        if ($customSpacing === null) {
            $this->addCssElements(new responsiveproperty(new emptyproperty(),
                new padding(SMALL_SPACER, NO_SPACER),
                new padding(LARGE_SPACER, NO_SPACER),
                new padding(EXTRA_LARGE_SPACER, NO_SPACER),
                new padding(EXTRA_LARGE_SPACER, NO_SPACER)
            ));
        } else {
            $this->addCssElements($customSpacing);
        }

        $foregroundColor = null;
        if ($foreground != null)
            $foregroundColor = new color($foreground);
        $backgroundColor = null;
        if ($background != null)
            $backgroundColor = new backgroundcolor($background);
        $this->addCssElements(new simpleproperty(new colors($foregroundColor, $backgroundColor)));
    }
}