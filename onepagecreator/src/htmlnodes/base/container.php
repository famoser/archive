<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 26.12.2015
 * Time: 13:17
 */

namespace famoser\opc\htmlnodes\base;


use famoser\opc\htmlnodes\div;
use famoser\opc\htmlnodes\interfaces\iHtmlElement;

class container extends basenode
{
    private $container;

    /**
     * @param iHtmlElement $node
     * @param int $width (1 -12)
     * @param int $paddingleft (1- 12)
     */
    public function addContent($nodes, $width = 12, $autoandjust = true, $paddingleft = 0, $mdwidth = 0)
    {
        if ($this->container == null) {
            $div = new div();
            $div->addClass("container");
            $this->addChildren($div);
            $this->container = $div;
        }
        if ($mdwidth == 0) {
            $mdwidth = $width;
            if ($autoandjust) {
                $mdwidth = 2 * $mdwidth;
                if ($mdwidth > 12)
                    $mdwidth = 12;
            }
        }

        $div = new div();
        $div->addClass("col-lg-" . $width);
        $div->addClass("col-md-" . $mdwidth);
        if ($paddingleft != 0) {
            $div->addClass("col-lg-offset-" . $paddingleft);
        }

        $div->addChildren($nodes);
        $this->container->addChildren($div);
    }
}