<?php

namespace Famoser\MBOApiWrapper\SaleService;

class UpdateSaleDateResponse
{

    /**
     * @var UpdateSaleDateResult $UpdateSaleDateResult
     */
    protected $UpdateSaleDateResult = null;

    /**
     * @param UpdateSaleDateResult $UpdateSaleDateResult
     */
    public function __construct($UpdateSaleDateResult)
    {
      $this->UpdateSaleDateResult = $UpdateSaleDateResult;
    }

    /**
     * @return UpdateSaleDateResult
     */
    public function getUpdateSaleDateResult()
    {
      return $this->UpdateSaleDateResult;
    }

    /**
     * @param UpdateSaleDateResult $UpdateSaleDateResult
     * @return \Famoser\MBOApiWrapper\SaleService\UpdateSaleDateResponse
     */
    public function setUpdateSaleDateResult($UpdateSaleDateResult)
    {
      $this->UpdateSaleDateResult = $UpdateSaleDateResult;
      return $this;
    }

}
