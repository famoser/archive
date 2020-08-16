<?php

namespace Famoser\MBOApiWrapper\SaleService;

class UpdateServices
{

    /**
     * @var UpdateServicesRequest $Request
     */
    protected $Request = null;

    /**
     * @param UpdateServicesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return UpdateServicesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param UpdateServicesRequest $Request
     * @return \Famoser\MBOApiWrapper\SaleService\UpdateServices
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
