<?php

namespace Famoser\MBOApiWrapper\FinderService;

class FinderCheckoutShoppingCart
{

    /**
     * @var FinderCheckoutShoppingCartRequest $Request
     */
    protected $Request = null;

    /**
     * @param FinderCheckoutShoppingCartRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return FinderCheckoutShoppingCartRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param FinderCheckoutShoppingCartRequest $Request
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCart
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
