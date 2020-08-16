<?php

namespace Famoser\MBOApiWrapper\DataService;

class GetSitesWithFunctionDataAccess
{

    /**
     * @var GetSitesWithFunctionDataAccessRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetSitesWithFunctionDataAccessRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetSitesWithFunctionDataAccessRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetSitesWithFunctionDataAccessRequest $Request
     * @return \Famoser\MBOApiWrapper\DataService\GetSitesWithFunctionDataAccess
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
