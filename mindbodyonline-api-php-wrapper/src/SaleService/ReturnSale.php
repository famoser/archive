<?php

namespace Famoser\MBOApiWrapper\SaleService;

class ReturnSale
{

    /**
     * @var ReturnSaleRequest $Request
     */
    protected $Request = null;

    /**
     * @param ReturnSaleRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return ReturnSaleRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param ReturnSaleRequest $Request
     * @return \Famoser\MBOApiWrapper\SaleService\ReturnSale
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
