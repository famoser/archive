<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddOrUpdateContactLogsRequest extends MBRequest
{

    /**
     * @var string $UpdateAction
     */
    protected $UpdateAction = null;

    /**
     * @var boolean $Test
     */
    protected $Test = null;

    /**
     * @var ArrayOfContactLog $ContactLogs
     */
    protected $ContactLogs = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getUpdateAction()
    {
      return $this->UpdateAction;
    }

    /**
     * @param string $UpdateAction
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateContactLogsRequest
     */
    public function setUpdateAction($UpdateAction)
    {
      $this->UpdateAction = $UpdateAction;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getTest()
    {
      return $this->Test;
    }

    /**
     * @param boolean $Test
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateContactLogsRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
      return $this;
    }

    /**
     * @return ArrayOfContactLog
     */
    public function getContactLogs()
    {
      return $this->ContactLogs;
    }

    /**
     * @param ArrayOfContactLog $ContactLogs
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateContactLogsRequest
     */
    public function setContactLogs($ContactLogs)
    {
      $this->ContactLogs = $ContactLogs;
      return $this;
    }

}
