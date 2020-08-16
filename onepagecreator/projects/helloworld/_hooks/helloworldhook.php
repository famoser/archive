<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 23:19
 */

namespace famoser\opc\projects\helloworld\_hooks;


use famoser\opc\css\models\simpleproperty;
use famoser\opc\css\properties\base\height;
use famoser\opc\css\properties\base\width;
use famoser\opc\framework\interfaces\iProjektHook;
use famoser\opc\htmlnodes\div;
use famoser\opc\htmlnodes\footer;
use famoser\opc\htmlnodes\premades\sections\background;
use famoser\opc\htmlnodes\section;
use famoser\opc\models\page;
use famoser\opc\plugins\bootstrap\bootstraphook;
use famoser\opc\plugins\contactform\contactformhook;
use famoser\opc\plugins\famoser\famoserhook;
use famoser\opc\plugins\favicons\faviconshook;
use famoser\opc\plugins\googlemaps\googlemapshook;
use famoser\opc\plugins\jquery\jqueryhook;
use famoser\opc\plugins\openingtimes\openingtimeshook;

class helloworldhook implements iProjektHook
{
    public function execute()
    {
        $page = new page();

        $page->addPlugin(new jqueryhook());
        $page->addPlugin(new bootstraphook());
        $page->addPlugin(new famoserhook());
        $page->addPlugin(new faviconshook());

        $page->addContent(new background("/images/background.jpg", "100%"));

        $times = new openingtimeshook("#openingtimes");
        $page->addPlugin($times);
        $nodes = $times->getOpeningTimesTableNodes(
            array(
                array("Montag", "07:30-12:00", "13:00-17:00"),
                array("Dienstag", "07:30-12:00", "13:00-17:00"),
                array("Mittwoch", "07:30-12:00", "13:00-17:00"),
                array("Donnerstag", "07:30-12:00", "13:00-18:00"),
                array("Freitag", "07:30-12:00", "13:00-17:00"),
                array("Samstag", "07:30-12:00", "geschlossen"),
                array("Sonntag", "geschlossen", "geschlossen"),
            )
        );
        $section = new section("Angebot", COLOR_PRIMARY_FOREGROUND, COLOR_PRIMARY_BACKGROUND);
        $section->addContent($nodes, 6);

        $div = new div("google-maps");
        $div->addCssElements(new simpleproperty(new width("100%")));
        $div->addCssElements(new simpleproperty(new height("260px")));
        $hook = new googlemapshook("#google-maps", 47.5458451, 7.5525755, "Neuweilerstrasse 112<br/>4060 Basel");
        $page->addPlugin($hook);

        $section->addContent($div, 6);

        $page->addContent($section);

        $section = new section("Kontakt", COLOR_SECONDARY_FOREGROUND, COLOR_SECONDARY_BACKGROUND);
        $kontaktplugin = new contactformhook();
        $section->addChildren($kontaktplugin->getBodyNodes());
        $page->addContent($section);


        $page->addContent(new footer());

        //read!: http://www.leyva.ch/SEO-Tutorial.pdf
        $page->render();
    }
}