<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 25.12.2015
 * Time: 18:54
 */

namespace famoser\opc\plugins\openingtimes;


use famoser\opc\framework\plugins\htmlJavascriptPlugin;
use famoser\opc\htmlnodes\interfaces\iHtmlElement;
use famoser\opc\htmlnodes\table;
use famoser\opc\javascript\models\javascriptElement;

class openingtimeshook extends htmlJavascriptPlugin
{
    private $isCalled = false;

    public function getJavascript()
    {
        $file = file_get_contents(__DIR__ . "/js/scripts.js");
        return str_replace("[SELECTOR]", $this->getSelector(), $file);
    }

    public function getCss()
    {
        return file_get_contents(__DIR__ . "/css/styles.css");
    }

    /**
     * @param array $times : must look like this: array(array("Montag","07:30-12:00","14:00-18:00"))
     * @return iHtmlElement
     */
    public function getOpeningTimesTableNodes(array $times)
    {
        $this->isCalled = true;
        $tablenode = new table($this->tryGetId());
        $tablenode->addRows($times);
        return $tablenode;
    }


    public function IsUsed()
    {
        return $this->isCalled;
    }

    public function getJavascriptElement()
    {
        $javascriptElement = new javascriptElement();
        $javascriptElement->addDocumentReady('MarkTodaysDay("' . $this->getSelector() . '");');
        return $javascriptElement;
    }
}