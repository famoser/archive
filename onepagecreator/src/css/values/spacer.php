<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 20.12.2015
 * Time: 19:03
 */

namespace famoser\opc\css\values;

use famoser\opc\css\values\base\basevalue;

class spacer extends basevalue
{
    private $top;
    private $right;
    private $bottom;
    private $left;


    public function __construct($key, $value, $topbottom, $right, $bottom)
    {
        parent::__construct($key);
        if ($topbottom == null)
            $this->setValues($value, $value, $value, $value);
        else if ($right == null)
            $this->setValues($value, $topbottom, $value, $topbottom);
        else
            $this->setValues($value, $topbottom, $right, $bottom);
    }

    private function setValues($left, $top, $right, $bottom)
    {
        $this->left = $left;
        $this->top = $top;
        $this->right = $right;
        $this->bottom = $bottom;
    }

    public function render()
    {
        if ($this->left == $this->right && $this->top == $this->bottom) {
            if ($this->left == $this->top) {
                $this->setValue($this->left);
            } else {
                $this->setValue($this->left . " " . $this->top);
            }
        } else {
            $this->setValue($this->top . " " . $this->right . " " . $this->bottom . " " . $this->left);
        }
        return parent::render();
    }
}