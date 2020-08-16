<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 23.12.2015
 * Time: 18:27
 */

namespace famoser\opc\css\interfaces;


interface iCssElement
{
    public function getCommonCss();

    public function getMobileCss();

    public function getTabletCss();

    public function getDesktopCss();

    public function getUltraCss();

}