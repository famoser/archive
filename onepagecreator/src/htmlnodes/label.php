<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 27.12.2015
 * Time: 21:56
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\htmlnodes\base\basenode;

class label extends basenode
{
    public function __construct($for, $name = null)
    {
        parent::__construct("label");
        $this->setProperty("for", $for);
        if ($name == null)
            $name = $for;
        $this->setText($name);
    }
}