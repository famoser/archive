<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetCustomPaymentMethods
{

    /**
     * @var GetCustomPaymentMethodsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetCustomPaymentMethodsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetCustomPaymentMethodsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetCustomPaymentMethodsRequest $Request
     * @return \Famoser\MBOApiWrapper\SaleService\GetCustomPaymentMethods
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
