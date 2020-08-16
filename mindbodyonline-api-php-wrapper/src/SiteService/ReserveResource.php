<?php

namespace Famoser\MBOApiWrapper\SiteService;

class ReserveResource
{

    /**
     * @var ReserveResourceRequest $Request
     */
    protected $Request = null;

    /**
     * @param ReserveResourceRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return ReserveResourceRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param ReserveResourceRequest $Request
     * @return \Famoser\MBOApiWrapper\SiteService\ReserveResource
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
