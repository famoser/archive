<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetGenders
{

    /**
     * @var GetGendersRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetGendersRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetGendersRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetGendersRequest $Request
     * @return \Famoser\MBOApiWrapper\SiteService\GetGenders
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
