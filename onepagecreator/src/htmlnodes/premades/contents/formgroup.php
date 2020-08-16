<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 27.12.2015
 * Time: 21:40
 */

namespace famoser\opc\htmlnodes\premades\contents;


use famoser\opc\framework\logging\logger;
use famoser\opc\htmlnodes\base\keyvaluenode;
use famoser\opc\htmlnodes\input;
use famoser\opc\htmlnodes\label;
use famoser\opc\htmlnodes\textarea;

class formgroup
{
    private $label;
    private $input;

    public function __construct($node, $name, $placeholder)
    {
        $this->label = new label($name);
        if ($node == "textarea") {
            $this->input = new textarea($name, $placeholder);
        } else {
            if ($node != "input")
                logger::getInstance()->doLog(LOG_LEVEL_ERROR, "not supported node" . $node);

            if (strtolower($name) == "email")
                $this->input = new input("email", $name, $placeholder);
            else
                $this->input = new input("text", $name, $placeholder);
        }
    }

    public function getNodes()
    {
        $nodes = array();
        $nodes[] = $this->label;
        $nodes[] = new keyvaluenode("br");
        $nodes[] = $this->input;
        return $nodes;
    }
}