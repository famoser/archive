<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetMobileProviders
{

    /**
     * @var GetMobileProvidersRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetMobileProvidersRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetMobileProvidersRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetMobileProvidersRequest $Request
     * @return \Famoser\MBOApiWrapper\SiteService\GetMobileProviders
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
