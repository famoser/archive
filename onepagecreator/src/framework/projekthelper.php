<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 23:36
 */

function init_projekt($name)
{
    \famoser\opc\framework\fileshelper\include_all_files_in_dir(dirname(SOURCE_DIR) . "/projects/" . $name . "/_includes", "php");
    define("ACTIVE_PROJECT_DIR", dirname(SOURCE_DIR) . "/projects/" . $name);
    define("PROJECT_DEPLOY_DIR", ACTIVE_PROJECT_DIR . "/_deploy");
    define("PROJECT_DEPLOY_URL", "https://opc.famoser.ch/projects/" . $name . "/_deploy/");

    $classname = '\\famoser\\opc\\projects\\' . $name . '\\_hooks\\' . $name . 'hook';
    return new $classname();
}