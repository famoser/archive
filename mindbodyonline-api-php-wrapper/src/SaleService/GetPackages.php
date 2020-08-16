<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetPackages
{

    /**
     * @var GetPackagesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetPackagesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetPackagesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetPackagesRequest $Request
     * @return \Famoser\MBOApiWrapper\SaleService\GetPackages
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
