<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetContactLogTypes
{

    /**
     * @var GetContactLogTypesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetContactLogTypesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetContactLogTypesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetContactLogTypesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetContactLogTypes
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
