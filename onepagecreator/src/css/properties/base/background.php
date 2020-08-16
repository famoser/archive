<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 26.12.2015
 * Time: 00:15
 */

namespace famoser\opc\css\properties\base;


use famoser\opc\css\values\base\basevalue;

class background extends basevalue
{
    private $backgroundSource;
    private $repeating;
    private $xposition;
    private $yposition;

    public function __construct($backgroundSource, $repeating = "no-repeat", $xposition = "center", $yposition = "center")
    {
        parent::__construct("background");
        $this->backgroundSource = $backgroundSource;
        $this->repeating = $repeating;
        $this->xposition = $xposition;
        $this->yposition = $yposition;
    }

    public function render()
    {
        $this->setValue($this->backgroundSource . " " . $this->repeating . " " . $this->xposition . " " . $this->yposition);
        return parent::render();
    }
}