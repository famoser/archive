<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 18:02
 */

namespace famoser\opc\htmlnodes;


use famoser\opc\htmlnodes\base\textnode;

class em extends textnode
{
    public function __construct($text)
    {
        parent::__construct("em", $text);
    }
}