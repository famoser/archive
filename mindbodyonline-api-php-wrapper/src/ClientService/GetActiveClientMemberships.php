<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetActiveClientMemberships
{

    /**
     * @var GetActiveClientMembershipsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetActiveClientMembershipsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetActiveClientMembershipsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetActiveClientMembershipsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetActiveClientMemberships
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
