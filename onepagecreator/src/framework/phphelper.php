<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 20.12.2015
 * Time: 22:02
 */

namespace famoser\opc\framework\phphelper;


use function famoser\opc\framework\fileshelper\include_all_files_in_dir;
use famoser\opc\framework\logging\logger;

function hi_framework()
{
    configure_autoloader();
    include_helpers();
}

function bye_framework()
{

}

function include_helpers()
{
    include_all_files_in_dir(dirname(__DIR__) . "/helpers", "php");
    include_all_files_in_dir(__DIR__ . "/asserting", "php");
}

function configure_autoloader()
{
    spl_autoload_extensions('.php, .class.php');

    /*** register the loader functions ***/
    spl_autoload_register('spl_autoload_register');
}

/*** class Loader ***/
spl_autoload_register(function ($class) {

    // project-specific namespace prefix
    $prefix = 'famoser\\opc\\';
    $basedir = null;
    $relative_class = null;

    // does the class use the namespace prefix?
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) === 0) {
        $relative_class = substr($class, $len);
        $basedir = SOURCE_DIR;
    }

    //prefix for projects
    $prefix = 'famoser\\opc\\projects\\';
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) === 0) {
        $relative_class = substr($class, $len);
        $basedir = PROJECTS_DIR;
    }

    //prefix for plugins
    $prefix = 'famoser\\opc\\plugins\\';
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) === 0) {
        $relative_class = substr($class, $len);
        $basedir = PLUGINS_DIR;
    }

    // get the relative class name

    // replace the namespace prefix with the base directory, replace namespace
    // separators with directory separators in the relative class name, append
    // with .php
    $file = $basedir . "/" . str_replace('\\', '/', $relative_class) . '.php';

    // if the file exists, require it
    if (file_exists($file)) {
        require $file;
    } else {
        logger::getInstance()->doLog(LOG_LEVEL_FATAL, "class not found! class: " . $class . " | path: " . $file);
    }
});

function fusion_arrays_with_keys($arr1, $arr2)
{
    if (!is_array($arr1))
        return $arr2;
    if (!is_array($arr2))
        return $arr1;

    $res = array();
    foreach ($arr1 as $key => $value) {
        $res[$key] = $value;
    }
    foreach ($arr2 as $key => $value) {
        if (isset($res[$key]))
            $res[$key] .= $value;
        else
            $res[$key] = $value;
    }
    return $res;
}

function fusion_arrays($arr1, $arr2)
{
    if (!is_array($arr1))
        return $arr2;
    if (!is_array($arr2))
        return $arr1;

    return array_merge($arr1, $arr2);
}

function string_array_to_string($arr)
{
    $output = "";
    if (is_array($arr)) {
        foreach ($arr as $item) {
            $output .= string_array_to_string($item);
        }
    } else {
        $output .= $arr;
    }
    return $output;
}

function obj_array_to_arr($arr)
{
    $output = "";
    if (is_array($arr)) {
        foreach ($arr as $item) {
            $output .= string_array_to_string($item);
        }
    }
    $output .= $arr;
    return $output;
}

function file_to_string($filepath)
{
    if (file_exists($filepath)) {
        ob_start();
        include $filepath;
        $res = ob_get_contents();
        ob_end_clean();
        return $res;
    } else {
        logger::getInstance()->doLog(LOG_LEVEL_ERROR, "File not found: " . $filepath);
        return "";
    }
}

