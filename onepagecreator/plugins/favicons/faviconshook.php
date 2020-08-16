<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 23.12.2015
 * Time: 11:47
 */

namespace famoser\opc\plugins\favicons;


use function famoser\opc\framework\assert_files_exists;
use famoser\opc\framework\plugins\htmlContentPlugin;
use famoser\opc\htmlnodes\base\rawhtmlnode;

class faviconshook extends htmlContentPlugin
{
    private $files = array(
        "/apple-icon-57x57.png",
        "/apple-icon-60x60.png",
        "/apple-icon-72x72.png",
        "/apple-icon-76x76.png",
        "/apple-icon-114x114.png",
        "/apple-icon-120x120.png",
        "/apple-icon-144x144.png",
        "/apple-icon-152x152.png",
        "/apple-icon-180x180.png",
        "/android-icon-192x192.png",
        "/favicon-32x32.png",
        "/favicon-96x96.png",
        "/favicon-16x16.png",
        "/ms-icon-144x144.png"
    );
    private $filespath = "/images/favicons";

    public function isUsed()
    {
        return true;
    }

    public function getHeadNodes()
    {
        return new rawhtmlnode(__DIR__ . "/header_tags.php");
    }

    public function getBodyNodes()
    {
        return null;
    }

    public function isValid()
    {
        $files = array();
        foreach ($this->files as $key => $val) {
            $files[$key] = ACTIVE_PROJECT_DIR . $this->filespath . $this->files[$key];
        }

        return assert_files_exists($files);
    }
}