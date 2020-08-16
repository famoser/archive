<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddOrUpdateContactLogs
{

    /**
     * @var AddOrUpdateContactLogsRequest $Request
     */
    protected $Request = null;

    /**
     * @param AddOrUpdateContactLogsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return AddOrUpdateContactLogsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param AddOrUpdateContactLogsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateContactLogs
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
