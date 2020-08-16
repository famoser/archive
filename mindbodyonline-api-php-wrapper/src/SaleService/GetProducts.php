<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetProducts
{

    /**
     * @var GetProductsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetProductsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetProductsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetProductsRequest $Request
     * @return \Famoser\MBOApiWrapper\SaleService\GetProducts
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
