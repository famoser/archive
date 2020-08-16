<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 24.12.2015
 * Time: 00:21
 */

namespace famoser\opc\javascript\models;


use famoser\opc\javascript\interfaces\iJavascriptElement;

class javascriptElement implements iJavascriptElement
{
    private $javascript = array();
    // executes when HTML-Document is loaded and DOM is ready
    private $documentReady = array();
    // executes when all (incl images and files) are loaded
    private $windowLoaded = array();

    public function addJavascript($script)
    {
        $this->javascript[] = $script;
    }

    public function addDocumentReady($script)
    {
        $this->documentReady[] = $script;
    }

    public function addWindowsLoaded($script)
    {
        $this->windowLoaded[] = $script;
    }

    public function getJavacript()
    {
        return $this->javascript;
    }

    public function getDocumentReady()
    {
        return $this->documentReady;
    }

    public function getWindowLoaded()
    {
        return $this->windowLoaded;
    }
}