<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClients
{

    /**
     * @var GetClientsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClientsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClientsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClientsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetClients
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
