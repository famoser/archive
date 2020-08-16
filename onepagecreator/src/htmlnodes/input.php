<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 27.12.2015
 * Time: 22:13
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\htmlnodes\base\basenode;

class input extends basenode
{
    public function __construct($type, $id, $placeholder, $required = true)
    {
        parent::__construct("input", $id);
        $this->setProperty("placeholder", $placeholder);
        $this->setProperty("type", $type);

        if ($required)
            $this->setAttribute("required");
    }
}