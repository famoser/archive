<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 27.12.2015
 * Time: 20:27
 */

namespace famoser\opc\plugins\contactform;


use famoser\opc\framework\logging\logger;
use famoser\opc\framework\plugins\htmlContentPlugin;
use famoser\opc\htmlnodes\form;
use famoser\opc\htmlnodes\premades\contents\formgroup;
use famoser\opc\javascript\models\javascriptElement;

class contactformhook extends htmlContentPlugin
{
    private $fields;
    private $contactformId;
    private $sendconfimationemail;
    private $emailId;
    private $nameId;

    /**
     * contactformhook constructor.
     * @param array $fields : should be of form array(array("input","Name","Vor- und Nachname","4"),...); which means array(array("node","Title","Placeholder","customWidth"),...)
     * @param string $contactformId
     */
    public function __construct(array $fields = null, $contactformId = "contactform", $sendconfimationemail = true, $emailId = "Email", $nameId = "Name")
    {
        if ($fields == null) {
            $this->fields = array(
                array("input", "Name", "Vor- und Nachname"),
                array("input", "Email", "Email"),
                array("input", "Betreff", "Betreff"),
                array("textarea", "Nachricht", "")
            );
        } else {
            $this->fields = array();
            foreach ($fields as $field) {
                $this->fields[] = $field;
            }
        }
        $this->contactformId = $contactformId;
        $this->sendconfimationemail = $sendconfimationemail;
        $this->emailId = $emailId;
        $this->nameId = $nameId;
    }

    public function isUsed()
    {
        return true;
    }

    public function getBodyNodes()
    {
        $form = new form($this->contactformId, "contact/mailer.php");
        foreach ($this->fields as $field) {
            $contentnodes = new formgroup($field[0], $field[1], $field[2]);
            if (strtolower($field[1]) == "betreff" || strtolower($field[0]) == "textarea") {
                $form->addContent($contentnodes->getNodes(), 12);
            } else {
                $form->addContent($contentnodes->getNodes(), 6);
            }
        }
        return $form;
    }

    public function getJavascriptElement()
    {
        $javascriptElement = new javascriptElement();
        $javascriptElement->addDocumentReady("MakeSubmitForm(#" . $this->contactformId . ");");
        return $javascriptElement;
    }

    public function isValid()
    {
        if (!file_exists(PROJECTS_DIR . "/contact/configuration.php")) {
            logger::getInstance()->doLog(LOG_LEVEL_ASSERT, PROJECTS_DIR . "/contact/configuration.php does not exist!");
            return false;
        }
        $str = 'array(';
        foreach ($this->fields as $field) {
            $str .= '"' . $field . '"';
        }
        $str .= ")";

        $contr = file_get_contents(__DIR__ . "/contact/mailer.php");
        $contr = str_replace("[KEYS]", $str, $contr);
        $contr = str_replace("[EMAIL_KEY]", $this->emailId, $contr);
        $contr = str_replace("[NAME_KEY]", $this->nameId, $contr);
        file_put_contents(PROJECTS_DIR . "/contact/mailer.php", $contr);

        \famoser\opc\framework\fileshelper\copy_directory_contents(__DIR__ . "/contact/libs", PROJECTS_DIR . "/contact/libs");

        logger::getInstance()->doLog(LOG_LEVEL_INFO, "testemail send to " . TEST_EMAIL . ". Please check your inbox");
        return true;
    }
}