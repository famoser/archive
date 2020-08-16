<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 12:14
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\htmlnodes\base\basenode;

class p extends basenode
{
    public function __construct()
    {
        parent::__construct("p");
    }
}