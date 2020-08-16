<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 24.12.2015
 * Time: 01:23
 */

use famoser\opc\css\models\simpleproperty;
use famoser\opc\css\properties\base\backgroundcolor;
use famoser\opc\css\properties\base\color;
use famoser\opc\css\properties\colors;
use function famoser\opc\framework\phphelper\bye_framework;
use function famoser\opc\framework\phphelper\hi_framework;

define("SOURCE_DIR", __DIR__);
define("PROJECTS_DIR", dirname(__DIR__) . "/projects");
define("PLUGINS_DIR", dirname(__DIR__) . "/plugins");

foreach (glob(SOURCE_DIR . "/framework/*.php") as $filename) {
    include_once $filename;
}

try {
    hi_framework();

    $css = '
    position: fixed;
    top: 0;
    z-index: 1000;
}

.text-center {
    text-align: center;
    ';

    echo $css;
    echo "minified:";
    $minifier = new \famoser\opc\libs\minifier\minifierClient(true);
    echo $minifier->minify_css($css);

    $node = new simpleproperty(new colors(new color("#222222"), new backgroundcolor("#224444")));
    echo $node->getCommonCss();
    bye_framework();
} catch (Exception $ex) {
    \famoser\opc\framework\logging\logger::getInstance()->logException($ex);
    echo \famoser\opc\framework\logging\logger::getInstance()->retrieveAllLogs();
}

