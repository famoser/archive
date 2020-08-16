<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 00:16
 */

namespace famoser\opc\framework\logging;


class logitem
{
    private $level;
    private $message;


    public function __construct($level, $message) {
        $this->level = $level;
        $this->message = $message;
    }

    public function render()
    {
        return "<p><b>" . $this->level . "</b>: " . $this->message . "</p>";
    }
}