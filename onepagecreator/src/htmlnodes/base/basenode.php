<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 20.12.2015
 * Time: 18:59
 */


namespace famoser\opc\htmlnodes\base;

use famoser\opc\css\interfaces\iCssElement;
use famoser\opc\css\models\cssElementCollector;
use function famoser\opc\framework\phphelper\fusion_arrays;
use famoser\opc\htmlnodes\interfaces\iHtmlElement;
use famoser\opc\javascript\interfaces\iJavascriptElement;

class basenode extends textnode
{
    private $id;

    private $classes = array();
    private $class;

    private $cssElements = array();
    private $javascriptElements = array();
    private $children = array();
    private $properties = array();
    private $attributes = array();

    public function __construct($node, $id = null)
    {
        parent::__construct($node);
        if ($id != null) {
            $this->setId($id);
        } else {
            $this->class = $this->getNode() . "_" . uniqid();
        }
    }

    public function setClass($class)
    {
        $this->class = $class;
    }

    public function addClass($classes)
    {
        if (is_array($classes)) {
            foreach ($classes as $child) {
                $this->addClass($child);
            }
        } else {
            $this->classes[] = $classes;
        }
    }

    public function setId($id)
    {
        if ($id != null) {
            $this->id = $id;
            $this->class = $this->getNode() . "_" . $this->id;
        }
    }

    public function addChildren($children)
    {
        if (is_array($children)) {
            foreach ($children as $child) {
                $this->addChildren($child);
            }
        } else if ($children instanceof iHtmlElement) {
            $this->children[] = $children;
        }
    }

    public function clearChildren()
    {
        $this->children[] = array();
    }

    public function addCssElements($properties)
    {
        if (is_array($properties)) {
            foreach ($properties as $prop) {
                $this->addCssElements($prop);
            }
        } else if ($properties instanceof iCssElement) {
            $this->cssElements[] = $properties;
        }
    }

    public function addJavascriptElements($javascriptElements)
    {
        if (is_array($javascriptElements)) {
            foreach ($javascriptElements as $javascript) {
                $this->addJavascriptElements($javascript);
            }
        } else if ($javascriptElements instanceof iJavascriptElement) {
            $this->javascriptElements[] = $javascriptElements;
        }
    }

    public function setProperty($key, $value)
    {
        $this->properties[$key] = $value;
    }

    public function setAttribute($attr)
    {
        $this->attributes[] = $attr;
    }

    public function getCss()
    {
        $props = array();
        $props[] = new cssElementCollector($this->getCssIdentifier(), $this->cssElements);
        foreach ($this->children as $child) {
            if ($child instanceof iHtmlElement) {
                $props = fusion_arrays($child->getCss(), $props);
            }
        }
        return $props;
    }

    public function getJavascript()
    {
        $props = $this->javascriptElements;
        foreach ($this->children as $child) {
            if ($child instanceof iJavascriptElement) {
                $props = fusion_arrays($child->getJavacript(), $props);
            }
        }
        return $props;
    }

    public function getCssIdentifier()
    {
        if ($this->id == "")
            return "." . $this->class;
        else
            return "#" . $this->id;
    }

    public function getClassPart()
    {
        $output = "";
        if (isset($this->classes))
            $output = implode(" ", $this->classes);
        if (isset($this->class)) {
            if ($output != "")
                $output .= " ";
            $output .= $this->class;
        }
        if ($output != "")
            return 'class="' . $output . '"';
        return "";
    }

    public function getIdPart()
    {
        if ($this->id != null)
            return 'id="' . $this->id . '"';
        return "";
    }

    public function getHtml()
    {
        $nodeContent = $this->getNode();
        $id = $this->getIdPart();
        if ($id != "")
            $nodeContent .= " " . $id;
        $class = $this->getClassPart();
        if ($class != "")
            $nodeContent .= " " . $class;

        foreach ($this->properties as $key => $val) {
            $nodeContent .= " " . $key . '="' . $val . '"';
        }

        foreach ($this->attributes as $attr) {
            $nodeContent .= " " . $attr;
        }

        $start = '<' . $nodeContent . '>';
        if ($this->getText() != "")
            $start .= $this->getText();
        foreach ($this->children as $child) {
            if ($child instanceof iHtmlElement)
                $start .= $child->getHtml();
        }
        return $start . '</' . $this->getNode() . '>';
    }
}