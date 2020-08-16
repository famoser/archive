<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 27.12.2015
 * Time: 22:35
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\htmlnodes\base\basenode;

class textarea extends basenode
{
    public function __construct($id, $placeholder, $required = true)
    {
        parent::__construct("textarea", $id);
        $this->setProperty("placeholder", $placeholder);
        $this->setProperty("rows", "5");

        if ($required)
            $this->setAttribute("required");
    }

}