<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetBusinessLocationsWithinRadius
{

    /**
     * @var GetBusinessLocationsWithinRadiusRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetBusinessLocationsWithinRadiusRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetBusinessLocationsWithinRadiusRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetBusinessLocationsWithinRadiusRequest $Request
     * @return \Famoser\MBOApiWrapper\FinderService\GetBusinessLocationsWithinRadius
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
