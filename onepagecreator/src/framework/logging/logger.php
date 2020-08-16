<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 22.12.2015
 * Time: 00:13
 */

namespace famoser\opc\framework\logging;


class logger
{
    private $logs = array();

    private static $instance = null;

    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new self;
        }

        return self::$instance;
    }

    public function doLog($level,$message)
    {
        $log = new logitem($level, $message);
        $this->logs[] = $log;
    }

    public function logException($ex)
    {
        $log = new logitem(LOG_LEVEL_ERROR, $ex);
        $this->logs[] = $log;
    }

    public function retrieveAllLogs()
    {
        $output = "";
        foreach ($this->logs as $log) {
            if ($log instanceof logitem)
                $output .= $log->render();
        }
        return $output;
    }
}