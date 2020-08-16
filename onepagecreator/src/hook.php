<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 20.12.2015
 * Time: 22:01
 */
use famoser\opc\framework\interfaces\iProjektHook;
use famoser\opc\framework\logging\logger;
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

    $proj = init_projekt("helloworld");
    if ($proj instanceof iProjektHook) {
        $proj->execute();
        header("Location: " . PROJECT_DEPLOY_URL);
    } else {
        echo "Projekt not found";
    }

    bye_framework();
} catch (Exception $ex) {
    logger::getInstance()->logException($ex);
    echo logger::getInstance()->retrieveAllLogs();
}


