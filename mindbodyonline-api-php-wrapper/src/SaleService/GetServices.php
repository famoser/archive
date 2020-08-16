<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetServices
{

    /**
     * @var GetServicesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetServicesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetServicesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetServicesRequest $Request
     * @return \Famoser\MBOApiWrapper\SaleService\GetServices
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
