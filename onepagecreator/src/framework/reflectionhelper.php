<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 11:00
 */

namespace famoser\opc\framework\reflectionhelper;

use famoser\opc\css\interfaces\iCssProperty;

function allPropertiesToString($obj)
{
    $output = "";
    $arr = get_object_vars($obj);
    foreach ($arr as $item) {
        if ($item != null) {
            $output .= (string)$item;
        }
    }
    return $output;
}

function allCssProperties($obj)
{
    $output = array();
    $arr = get_object_vars($obj);
    foreach ($arr as $item) {
        if ($item instanceof iCssProperty) {
            $output[] = $item;
        }
    }
    return $output;
}

function methodResultToString($obj, $methodname)
{
    $output = "";
    if (is_array($obj)) {
        foreach ($obj as $item) {
            $output .= $item->$methodname;
        }
    } else if (method_exists($obj, $methodname)) {
        $output .= $obj->$methodname;
    }
    return $output;
}