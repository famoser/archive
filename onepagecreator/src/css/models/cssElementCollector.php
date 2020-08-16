<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 24.12.2015
 * Time: 16:58
 */

namespace famoser\opc\css\models;


use famoser\opc\css\interfaces\iCssElement;

class cssElementCollector implements iCssElement
{
    private $identifier;
    private $elements = array();

    public function __construct($identifier, $element)
    {
        $this->identifier = $identifier;
        $this->addElements($element);
    }

    public function addElements($element)
    {
        if (is_array($element)) {
            foreach ($element as $item) {
                $this->addElements($item);
            }
        } else if ($element instanceof iCssElement)
            $this->elements[] = $element;
    }

    public function getCommonCss()
    {
        $output = "";
        foreach ($this->elements as $element) {
            if ($element instanceof iCssElement)
                $output .= $element->getCommonCss();
        }
        return $this->export($output);
    }

    public function getMobileCss()
    {
        $output = "";
        foreach ($this->elements as $element) {
            if ($element instanceof iCssElement)
                $output .= $element->getMobileCss();
        }
        return $this->export($output);
    }

    public function getTabletCss()
    {
        $output = "";
        foreach ($this->elements as $element) {
            if ($element instanceof iCssElement)
                $output .= $element->getTabletCss();
        }
        return $this->export($output);
    }

    public function getDesktopCss()
    {
        $output = "";
        foreach ($this->elements as $element) {
            if ($element instanceof iCssElement)
                $output .= $element->getDesktopCss();
        }
        return $this->export($output);
    }

    public function getUltraCss()
    {
        $output = "";
        foreach ($this->elements as $element) {
            if ($element instanceof iCssElement)
                $output .= $element->getUltraCss();
        }
        return $this->export($output);
    }

    private function export($content)
    {
        if ($content == "") {
            return "";
        } else {
            return $this->identifier . "{" . $content . "}";
        }
    }
}