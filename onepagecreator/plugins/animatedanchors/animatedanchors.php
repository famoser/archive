<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 25.12.2015
 * Time: 01:28
 */

namespace famoser\opc\plugins\animatedtopbar;


use famoser\opc\framework\plugins\javascriptSelectorPlugin;
use famoser\opc\javascript\models\javascriptElement;

class animatedanchors extends javascriptSelectorPlugin
{
    public function getJavascript()
    {
        return file_get_contents(__DIR__ . "/js/scripts.js");
    }

    public function getJavascriptElement()
    {
        $javascriptElement = new javascriptElement();
        $javascriptElement->addDocumentReady('animateAnchors("' . $this->getSelector() . '");');
        return $javascriptElement;
    }
}