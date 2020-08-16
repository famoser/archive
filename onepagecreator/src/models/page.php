<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 21:21
 */

namespace famoser\opc\models;


use Exception;
use function famoser\opc\framework\fileshelper\copy_directory_contents;
use function famoser\opc\framework\fileshelper\empty_directory_contents;
use function famoser\opc\framework\fileshelper\write_string_to_file;
use famoser\opc\framework\interfaces\iPluginHook;
use famoser\opc\framework\logging\logger;
use famoser\opc\htmlnodes\base\basenode;
use famoser\opc\htmlnodes\premades\sections\debug;
use famoser\opc\libs\minifier\minifierClient;

class page extends basenode
{
    private $head;
    private $body;

    private $javascript;
    private $css;

    private $plugins = array();

    public function __construct()
    {
        parent::__construct("html");
        $this->setClass("");
        $this->body = new body();
        $this->head = new head();
        $this->javascript = new javascript();
        $this->css = new css();


        $this->addChildren($this->head);
        $this->addChildren($this->body);
    }

    public function addPlugin(iPluginHook $hook)
    {
        $key = get_class($hook);
        if (!isset($this->plugins[$key])) {
            $this->plugins[$key] = $hook;
        }
    }

    public function addContent($children)
    {
        $this->body->addChildren($children);
    }

    public function render()
    {
        try {
            $this->preparePlugins();
            $this->css->addCssElements($this->getCss());
            $this->javascript->addJavascriptElements($this->getJavascript());

            empty_directory_contents(ACTIVE_PROJECT_DIR . "/_deploy");
            copy_directory_contents(ACTIVE_PROJECT_DIR, ACTIVE_PROJECT_DIR . "/_deploy");

            $minifier = new minifierClient(DEBUG_ENABLED);

            $id = uniqid();
            write_string_to_file(PROJECT_DEPLOY_DIR . "/styles/styles_" . $id . ".css", $minifier->minify_css($this->css->getFileContents()));
            write_string_to_file(PROJECT_DEPLOY_DIR . "/scripts/scripts_" . $id . ".js", $minifier->minify_js($this->javascript->getFileContents()));

            if (DEBUG_ENABLED) {
                $this->body->addChildren(new debug());
            }

            $this->head->addCssInclude("styles/styles_" . $id . ".css");
            $this->body->addJavascriptInclude("scripts/scripts_" . $id . ".js");

            write_string_to_file(PROJECT_DEPLOY_DIR . "/logs.html", "<h1>logs</h1>" . logger::getInstance()->retrieveAllLogs());
            write_string_to_file(PROJECT_DEPLOY_DIR . "/index.html", $minifier->minify_html('<!DOCTYPE html>' . $this->getHtml()));
        } catch (Exception $exception) {
            write_string_to_file(PROJECT_DEPLOY_DIR . "/exception.html", $exception);
        }
    }

    private function preparePlugins()
    {
        foreach ($this->plugins as $key => $plugin) {
            if ($plugin instanceof iPluginHook) {
                if ($plugin->isUsed()) {
                    if ($plugin->isValid()) {
                        $this->css->addPluginCss($plugin->getCss());
                        $this->javascript->addPluginJavascript($plugin->getJavascript());
                        $this->body->addChildren($plugin->getBodyNodes());
                        $this->head->addChildren($plugin->getHeadNodes());
                        $this->javascript->addJavascriptElements($plugin->getJavascriptElement());
                    } else {
                        logger::getInstance()->doLog(LOG_LEVEL_ERROR, "plugin not valid! " . $key);
                    }
                } else {
                    logger::getInstance()->doLog(LOG_LEVEL_INFO, "plugin deaktivated because not in use: " . $key);
                }
            }
        }
    }
}