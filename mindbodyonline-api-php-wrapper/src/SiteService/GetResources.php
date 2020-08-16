<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetResources
{

    /**
     * @var GetResourcesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetResourcesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetResourcesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetResourcesRequest $Request
     * @return \Famoser\MBOApiWrapper\SiteService\GetResources
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
