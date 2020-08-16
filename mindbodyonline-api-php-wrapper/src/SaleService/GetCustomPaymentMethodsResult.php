<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetCustomPaymentMethodsResult extends MBResult
{

    /**
     * @var ArrayOfCustomPaymentInfo $PaymentMethods
     */
    protected $PaymentMethods = null;

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
     * @return ArrayOfCustomPaymentInfo
     */
    public function getPaymentMethods()
    {
      return $this->PaymentMethods;
    }

    /**
     * @param ArrayOfCustomPaymentInfo $PaymentMethods
     * @return \Famoser\MBOApiWrapper\SaleService\GetCustomPaymentMethodsResult
     */
    public function setPaymentMethods($PaymentMethods)
    {
      $this->PaymentMethods = $PaymentMethods;
      return $this;
    }

}
