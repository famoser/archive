<?php

namespace Famoser\MBOApiWrapper\FinderService;

class FinderCheckoutShoppingCartResponse
{

    /**
     * @var FinderCheckoutShoppingCartResult $FinderCheckoutShoppingCartResult
     */
    protected $FinderCheckoutShoppingCartResult = null;

    /**
     * @param FinderCheckoutShoppingCartResult $FinderCheckoutShoppingCartResult
     */
    public function __construct($FinderCheckoutShoppingCartResult)
    {
      $this->FinderCheckoutShoppingCartResult = $FinderCheckoutShoppingCartResult;
    }

    /**
     * @return FinderCheckoutShoppingCartResult
     */
    public function getFinderCheckoutShoppingCartResult()
    {
      return $this->FinderCheckoutShoppingCartResult;
    }

    /**
     * @param FinderCheckoutShoppingCartResult $FinderCheckoutShoppingCartResult
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartResponse
     */
    public function setFinderCheckoutShoppingCartResult($FinderCheckoutShoppingCartResult)
    {
      $this->FinderCheckoutShoppingCartResult = $FinderCheckoutShoppingCartResult;
      return $this;
    }

}
