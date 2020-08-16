<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientContracts
{

    /**
     * @var GetClientContractsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClientContractsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClientContractsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClientContractsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientContracts
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
