<?php

namespace Famoser\MBOApiWrapper\FinderService;

class ShoppingCart extends MBObject
{

    /**
     * @var string $AuthCode
     */
    protected $AuthCode = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var string $ID
     */
    protected $ID = null;

    /**
     * @var ArrayOfCartItem $CartItems
     */
    protected $CartItems = null;

    /**
     * @var float $SubTotal
     */
    protected $SubTotal = null;

    /**
     * @var float $DiscountTotal
     */
    protected $DiscountTotal = null;

    /**
     * @var float $TaxTotal
     */
    protected $TaxTotal = null;

    /**
     * @var float $GrandTotal
     */
    protected $GrandTotal = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getAuthCode()
    {
      return $this->AuthCode;
    }

    /**
     * @param string $AuthCode
     * @return \Famoser\MBOApiWrapper\FinderService\ShoppingCart
     */
    public function setAuthCode($AuthCode)
    {
      $this->AuthCode = $AuthCode;
      return $this;
    }

    /**
     * @return ActionCode
     */
    public function getAction()
    {
      return $this->Action;
    }

    /**
     * @param ActionCode $Action
     * @return \Famoser\MBOApiWrapper\FinderService\ShoppingCart
     */
    public function setAction($Action)
    {
      $this->Action = $Action;
      return $this;
    }

    /**
     * @return string
     */
    public function getID()
    {
      return $this->ID;
    }

    /**
     * @param string $ID
     * @return \Famoser\MBOApiWrapper\FinderService\ShoppingCart
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return ArrayOfCartItem
     */
    public function getCartItems()
    {
      return $this->CartItems;
    }

    /**
     * @param ArrayOfCartItem $CartItems
     * @return \Famoser\MBOApiWrapper\FinderService\ShoppingCart
     */
    public function setCartItems($CartItems)
    {
      $this->CartItems = $CartItems;
      return $this;
    }

    /**
     * @return float
     */
    public function getSubTotal()
    {
      return $this->SubTotal;
    }

    /**
     * @param float $SubTotal
     * @return \Famoser\MBOApiWrapper\FinderService\ShoppingCart
     */
    public function setSubTotal($SubTotal)
    {
      $this->SubTotal = $SubTotal;
      return $this;
    }

    /**
     * @return float
     */
    public function getDiscountTotal()
    {
      return $this->DiscountTotal;
    }

    /**
     * @param float $DiscountTotal
     * @return \Famoser\MBOApiWrapper\FinderService\ShoppingCart
     */
    public function setDiscountTotal($DiscountTotal)
    {
      $this->DiscountTotal = $DiscountTotal;
      return $this;
    }

    /**
     * @return float
     */
    public function getTaxTotal()
    {
      return $this->TaxTotal;
    }

    /**
     * @param float $TaxTotal
     * @return \Famoser\MBOApiWrapper\FinderService\ShoppingCart
     */
    public function setTaxTotal($TaxTotal)
    {
      $this->TaxTotal = $TaxTotal;
      return $this;
    }

    /**
     * @return float
     */
    public function getGrandTotal()
    {
      return $this->GrandTotal;
    }

    /**
     * @param float $GrandTotal
     * @return \Famoser\MBOApiWrapper\FinderService\ShoppingCart
     */
    public function setGrandTotal($GrandTotal)
    {
      $this->GrandTotal = $GrandTotal;
      return $this;
    }

}
