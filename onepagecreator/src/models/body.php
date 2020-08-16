<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 21:22
 */

namespace famoser\opc\models;


use famoser\opc\htmlnodes\base\basenode;
use famoser\opc\htmlnodes\base\keyvaluenode;

class body extends basenode
{
    public function __construct()
    {
        parent::__construct("body");
        $this->setClass(null);
    }

    public function addJavascriptInclude($relativePath)
    {
        $node = new keyvaluenode("script");
        $node->addKeyValue("type", "text/javascript");
        $node->addKeyValue("src", $relativePath);
        $this->addChildren($node);
    }
}