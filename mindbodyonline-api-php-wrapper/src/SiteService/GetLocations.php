<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetLocations
{

    /**
     * @var GetLocationsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetLocationsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetLocationsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetLocationsRequest $Request
     * @return \Famoser\MBOApiWrapper\SiteService\GetLocations
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
