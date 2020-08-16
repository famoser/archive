<?php

namespace Famoser\MBOApiWrapper\SaleService;

class UpdateProductsResponse
{

    /**
     * @var UpdateProductsResult $UpdateProductsResult
     */
    protected $UpdateProductsResult = null;

    /**
     * @param UpdateProductsResult $UpdateProductsResult
     */
    public function __construct($UpdateProductsResult)
    {
      $this->UpdateProductsResult = $UpdateProductsResult;
    }

    /**
     * @return UpdateProductsResult
     */
    public function getUpdateProductsResult()
    {
      return $this->UpdateProductsResult;
    }

    /**
     * @param UpdateProductsResult $UpdateProductsResult
     * @return \Famoser\MBOApiWrapper\SaleService\UpdateProductsResponse
     */
    public function setUpdateProductsResult($UpdateProductsResult)
    {
      $this->UpdateProductsResult = $UpdateProductsResult;
      return $this;
    }

}
