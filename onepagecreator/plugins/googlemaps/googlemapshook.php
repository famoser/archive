<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 25.12.2015
 * Time: 18:07
 */

namespace famoser\opc\plugins\googlemaps;


use famoser\opc\framework\logging\logger;
use famoser\opc\framework\plugins\javascriptSelectorPlugin;
use famoser\opc\htmlnodes\base\keyvaluenode;
use famoser\opc\javascript\models\javascriptElement;

class googlemapshook extends javascriptSelectorPlugin
{
    private $content;
    private $foregroundColor;
    private $lat;
    private $lng;

    public function __construct($selector, $lat, $lng, $content, $foreground = COLOR_PRIMARY_BACKGROUND)
    {
        parent::__construct($selector);
        $this->lat = $lat;
        $this->lng = $lng;
        $this->content = $content;
        $this->foregroundColor = $foreground;
    }

    public function getHeadNodes()
    {
        $nodes = array();
        $node = new keyvaluenode("script");
        $node->addKeyValue("src", "//maps.google.com/maps/api/js");
        $nodes[] = $node;
        return $nodes;
    }

    public function getJavascript()
    {
        $file = file_get_contents(__DIR__ . "/js/scripts.js");
        $file = str_replace("[SELECTOR]", substr($this->getSelector(), 1), $file);
        $file = str_replace("[LAT]", $this->lat, $file);
        $file = str_replace("[LNG]", $this->lng, $file);
        $file = str_replace("[GOOGLEMAPSCONTENT]", $this->content, $file);
        return str_replace("[FOREGROUNDCOLOR]", "color: #" . $this->foregroundColor . ";", $file);
    }

    public function getJavascriptElement()
    {
        $javascriptElement = new javascriptElement();
        $javascriptElement->addDocumentReady("InitializeMap();");
        return $javascriptElement;
    }

    public function isValid()
    {
        if (substr($this->getSelector(), 0, 1) == "#" && strpos($this->getSelector(), " ") === false) {
            if ($this->content != null) {
                return parent::isValid();
            } else {
                logger::getInstance()->doLog(LOG_LEVEL_ASSERT, "googlemapshook needs an ID as a selector! Selector given: " . $this->getSelector());
                return false;
            }
        } else {
            logger::getInstance()->doLog(LOG_LEVEL_ASSERT, "googlemapshook needs an ID as a selector! Selector given: " . $this->getSelector());
            return false;
        }
    }
}