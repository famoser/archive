<?php

namespace Famoser\MBOApiWrapper\SaleService;

class CheckoutShoppingCartResponse
{

    /**
     * @var CheckoutShoppingCartResult $CheckoutShoppingCartResult
     */
    protected $CheckoutShoppingCartResult = null;

    /**
     * @param CheckoutShoppingCartResult $CheckoutShoppingCartResult
     */
    public function __construct($CheckoutShoppingCartResult)
    {
      $this->CheckoutShoppingCartResult = $CheckoutShoppingCartResult;
    }

    /**
     * @return CheckoutShoppingCartResult
     */
    public function getCheckoutShoppingCartResult()
    {
      return $this->CheckoutShoppingCartResult;
    }

    /**
     * @param CheckoutShoppingCartResult $CheckoutShoppingCartResult
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartResponse
     */
    public function setCheckoutShoppingCartResult($CheckoutShoppingCartResult)
    {
      $this->CheckoutShoppingCartResult = $CheckoutShoppingCartResult;
      return $this;
    }

}
