<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddOrUpdateClients
{

    /**
     * @var AddOrUpdateClientsRequest $Request
     */
    protected $Request = null;

    /**
     * @param AddOrUpdateClientsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return AddOrUpdateClientsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param AddOrUpdateClientsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateClients
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
