<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 12:14
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\htmlnodes\base\basenode;

class div extends basenode
{
    public function __construct($id = null)
    {
        parent::__construct("div", $id);
    }
}