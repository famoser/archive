<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 21:22
 */

namespace famoser\opc\models;


use famoser\opc\htmlnodes\base\basenode;
use famoser\opc\htmlnodes\base\keyvaluenode;

class head extends basenode
{
    public function __construct()
    {
        parent::__construct("head");
        $this->setClass(null);

        $node = new keyvaluenode("meta");
        $node->addKeyValue("charset", "UTF-8");
        $this->addChildren($node);

        $node = new keyvaluenode("base");
        if (DEBUG_ENABLED) {
            $node->addKeyValue("href", PROJECT_DEPLOY_URL);
        } else {
            $node->addKeyValue("href", PROJEKT_URL);
        }
        $this->addChildren($node);

        $node = new keyvaluenode("meta");
        $node->addKeyValue("name", "author");
        $node->addKeyValue("content", AUTHOR_NAME);
        $node->addKeyValue("contentauthor", PROJEKT_CONTENT_AUTHOR);
        $this->addChildren($node);

        $node = new keyvaluenode("meta");
        $node->addKeyValue("name", "description");
        $node->addKeyValue("content", PROJEKT_DESCRIPTION);
        $this->addChildren($node);

        $node = new keyvaluenode("meta");
        $node->addKeyValue("name", "keywords");
        $node->addKeyValue("content", PROJEKT_KEYWORDS);
        $this->addChildren($node);

        $node = new keyvaluenode("meta");
        $node->addKeyValue("name", "copyright");
        $node->addKeyValue("content", AUTHOR_NAME . " " . date("Y"));
        $this->addChildren($node);

        $node = new keyvaluenode("meta");
        $node->addKeyValue("name", "robots");
        $node->addKeyValue("content", PROJEKT_ROBOTS_SETTING);
        $this->addChildren($node);

        $node = new keyvaluenode("meta");
        $node->addKeyValue("id", "viewport");
        $node->addKeyValue("name", "viewport");
        $node->addKeyValue("content", "width=device-width, initial-scale=1");
        $this->addChildren($node);

        $node = new keyvaluenode("meta");
        $node->addKeyValue("http-equiv", "Cache-Control");
        $node->addKeyValue("content", "public");
        $this->addChildren($node);

        $node = new keyvaluenode("meta");
        $node->addKeyValue("name", "generator");
        $node->addKeyValue("content", ONEPAGECREATOR_PUBLICNAME);
        $node->addKeyValue("version", ONEPAGECREATOR_VERSION);
        $node->addKeyValue("webpage", ONEPAGECREATOR_WEBPAGE);
        if (DEBUG_ENABLED) {
            $node->addKeyValue("generatedOn", "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]");
        }
        $this->addChildren($node);
    }

    public function addCssInclude($relativePath)
    {
        $node = new keyvaluenode("link");
        $node->addKeyValue("rel", "stylesheet");
        $node->addKeyValue("type", "text/css");
        $node->addKeyValue("href", $relativePath);
        $this->addChildren($node);
    }
}