<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetProductsResponse
{

    /**
     * @var GetProductsResult $GetProductsResult
     */
    protected $GetProductsResult = null;

    /**
     * @param GetProductsResult $GetProductsResult
     */
    public function __construct($GetProductsResult)
    {
      $this->GetProductsResult = $GetProductsResult;
    }

    /**
     * @return GetProductsResult
     */
    public function getGetProductsResult()
    {
      return $this->GetProductsResult;
    }

    /**
     * @param GetProductsResult $GetProductsResult
     * @return \Famoser\MBOApiWrapper\SaleService\GetProductsResponse
     */
    public function setGetProductsResult($GetProductsResult)
    {
      $this->GetProductsResult = $GetProductsResult;
      return $this;
    }

}
