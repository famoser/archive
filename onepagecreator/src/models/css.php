<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 23.12.2015
 * Time: 11:51
 */

namespace famoser\opc\models;


use famoser\opc\css\interfaces\iCssElement;
use function famoser\opc\framework\phphelper\file_to_string;
use function famoser\opc\framework\phphelper\string_array_to_string;

class css
{
    private $pluginCss = array();

    private $common = array();
    private $mobile = array();
    private $tablet = array();
    private $desktop = array();
    private $ultra = array();

    public function addCssFile($filepath)
    {
        $this->pluginCss[] = file_to_string($filepath);
    }

    public function addPluginCss($content)
    {
        $this->pluginCss[] = $content;
    }

    public function addCssElements($cssElements)
    {
        if (is_array($cssElements)) {
            foreach ($cssElements as $cssElement) {
                $this->addCssElements($cssElement);
            }
        } else if ($cssElements instanceof iCssElement) {
            $this->common[] = $cssElements->getCommonCss();
            $this->mobile[] = $cssElements->getDesktopCss();
            $this->tablet[] = $cssElements->getTabletCss();
            $this->desktop[] = $cssElements->getDesktopCss();
            $this->ultra[] = $cssElements->getUltraCss();
        }
    }

    public function getFileContents()
    {
        $output = string_array_to_string($this->pluginCss);
        $output .= $this->renderCss($this->common);
        $output .= "@media (max-width: 768px) {" . $this->renderCss($this->mobile) . "}";
        $output .= "@media (min-width: 768px) and (max-width: 1200px) {" . $this->renderCss($this->tablet) . "}";
        $output .= "@media (min-width: 992px) and (max-width: 1920px) {" . $this->renderCss($this->desktop) . "}";
        $output .= "@media (min-width: 1920) {" . $this->renderCss($this->ultra) . "}";
        return $output;
    }

    private function renderCss($children)
    {
        $output = "";
        if (is_array($children)) {
            foreach ($children as $child) {
                $output .= $this->renderCss($child);
            }
        } else {
            $output .= $children;
        }
        return $output;
    }
}