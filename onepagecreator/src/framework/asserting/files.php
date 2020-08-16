<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 23.12.2015
 * Time: 14:02
 */

namespace famoser\opc\framework;

use famoser\opc\framework\logging\logger;

function assert_file_exists($path)
{
    if (file_exists($path))
        return true;
    logger::getInstance()->doLog(LOG_LEVEL_ASSERT, "file does not exist: " . $path);
    return false;
}

function assert_files_exists(array $path)
{
    $val = true;
    foreach ($path as $item) {
        $val = $val && assert_file_exists($item);
    }
    return $val;
}