<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetPackagesResponse
{

    /**
     * @var GetPackagesResult $GetPackagesResult
     */
    protected $GetPackagesResult = null;

    /**
     * @param GetPackagesResult $GetPackagesResult
     */
    public function __construct($GetPackagesResult)
    {
      $this->GetPackagesResult = $GetPackagesResult;
    }

    /**
     * @return GetPackagesResult
     */
    public function getGetPackagesResult()
    {
      return $this->GetPackagesResult;
    }

    /**
     * @param GetPackagesResult $GetPackagesResult
     * @return \Famoser\MBOApiWrapper\SaleService\GetPackagesResponse
     */
    public function setGetPackagesResult($GetPackagesResult)
    {
      $this->GetPackagesResult = $GetPackagesResult;
      return $this;
    }

}
