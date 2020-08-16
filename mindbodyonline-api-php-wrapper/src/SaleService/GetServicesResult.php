<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetServicesResult extends MBResult
{

    /**
     * @var ArrayOfService $Services
     */
    protected $Services = null;

    /**
     * @param StatusCode $Status
     * @param int $ErrorCode
     * @param XMLDetailLevel $XMLDetail
     * @param int $ResultCount
     * @param int $CurrentPageIndex
     * @param int $TotalPageCount
     */
    public function __construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount)
    {
      parent::__construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount);
    }

    /**
     * @return ArrayOfService
     */
    public function getServices()
    {
      return $this->Services;
    }

    /**
     * @param ArrayOfService $Services
     * @return \Famoser\MBOApiWrapper\SaleService\GetServicesResult
     */
    public function setServices($Services)
    {
      $this->Services = $Services;
      return $this;
    }

}
