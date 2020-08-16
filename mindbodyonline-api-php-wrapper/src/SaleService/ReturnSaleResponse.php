<?php

namespace Famoser\MBOApiWrapper\SaleService;

class ReturnSaleResponse
{

    /**
     * @var ReturnSaleResult $ReturnSaleResult
     */
    protected $ReturnSaleResult = null;

    /**
     * @param ReturnSaleResult $ReturnSaleResult
     */
    public function __construct($ReturnSaleResult)
    {
      $this->ReturnSaleResult = $ReturnSaleResult;
    }

    /**
     * @return ReturnSaleResult
     */
    public function getReturnSaleResult()
    {
      return $this->ReturnSaleResult;
    }

    /**
     * @param ReturnSaleResult $ReturnSaleResult
     * @return \Famoser\MBOApiWrapper\SaleService\ReturnSaleResponse
     */
    public function setReturnSaleResult($ReturnSaleResult)
    {
      $this->ReturnSaleResult = $ReturnSaleResult;
      return $this;
    }

}
