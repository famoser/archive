<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientIndexes
{

    /**
     * @var GetClientIndexesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClientIndexesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClientIndexesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClientIndexesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientIndexes
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
