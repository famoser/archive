<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetCustomPaymentMethodsResponse
{

    /**
     * @var GetCustomPaymentMethodsResult $GetCustomPaymentMethodsResult
     */
    protected $GetCustomPaymentMethodsResult = null;

    /**
     * @param GetCustomPaymentMethodsResult $GetCustomPaymentMethodsResult
     */
    public function __construct($GetCustomPaymentMethodsResult)
    {
      $this->GetCustomPaymentMethodsResult = $GetCustomPaymentMethodsResult;
    }

    /**
     * @return GetCustomPaymentMethodsResult
     */
    public function getGetCustomPaymentMethodsResult()
    {
      return $this->GetCustomPaymentMethodsResult;
    }

    /**
     * @param GetCustomPaymentMethodsResult $GetCustomPaymentMethodsResult
     * @return \Famoser\MBOApiWrapper\SaleService\GetCustomPaymentMethodsResponse
     */
    public function setGetCustomPaymentMethodsResult($GetCustomPaymentMethodsResult)
    {
      $this->GetCustomPaymentMethodsResult = $GetCustomPaymentMethodsResult;
      return $this;
    }

}
