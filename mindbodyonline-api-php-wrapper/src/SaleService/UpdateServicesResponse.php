<?php

namespace Famoser\MBOApiWrapper\SaleService;

class UpdateServicesResponse
{

    /**
     * @var UpdateServicesResult $UpdateServicesResult
     */
    protected $UpdateServicesResult = null;

    /**
     * @param UpdateServicesResult $UpdateServicesResult
     */
    public function __construct($UpdateServicesResult)
    {
      $this->UpdateServicesResult = $UpdateServicesResult;
    }

    /**
     * @return UpdateServicesResult
     */
    public function getUpdateServicesResult()
    {
      return $this->UpdateServicesResult;
    }

    /**
     * @param UpdateServicesResult $UpdateServicesResult
     * @return \Famoser\MBOApiWrapper\SaleService\UpdateServicesResponse
     */
    public function setUpdateServicesResult($UpdateServicesResult)
    {
      $this->UpdateServicesResult = $UpdateServicesResult;
      return $this;
    }

}
