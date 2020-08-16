<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 23.12.2015
 * Time: 11:52
 */

namespace famoser\opc\models;


use function famoser\opc\framework\phphelper\file_to_string;
use function famoser\opc\framework\phphelper\fusion_arrays;
use function famoser\opc\framework\phphelper\string_array_to_string;
use famoser\opc\javascript\interfaces\iJavascriptElement;

class javascript
{
    public $pluginJavascript = array();

    public $javascript = array();
    // executes when HTML-Document is loaded and DOM is ready
    public $documentReady = array();
    // executes when all (incl images and files) are loaded
    public $windowsLoaded = array();

    public function addJavascriptFile($filepath)
    {
        $this->pluginJavascript[] = file_to_string($filepath);
    }

    public function addPluginJavascript($content)
    {
        $this->pluginJavascript[] = $content;
    }

    public function addJavascriptElements($jsElements)
    {
        if (is_array($jsElements)) {
            foreach ($jsElements as $jsElement) {
                $this->addJavascriptElements($jsElement);
            }
        } else if ($jsElements instanceof iJavascriptElement) {
            $this->javascript[] = $jsElements->getJavacript();
            $this->documentReady[] = $jsElements->getDocumentReady();
            $this->windowsLoaded[] = $jsElements->getWindowLoaded();
        }
    }

    private function getEventJavascript()
    {
        $output = "";
        $docu = string_array_to_string($this->documentReady);
        if ($docu != "") {
            $output .= " $(document).ready(function() {" . $docu . "});";
        }
        $docu = string_array_to_string($this->windowsLoaded);
        if ($docu != "") {
            $output .= " window.onload = function() {" . $docu . "};";
        }
        return $output;
    }

    public function getFileContents()
    {
        $customJS = $this->javascript;
        $events = $this->getEventJavascript();
        if ($events != "") {
            $customJS[] = $events;
        }
        return string_array_to_string(fusion_arrays($this->pluginJavascript, $customJS));
    }
}