<?php

namespace Famoser\MBOApiWrapper\SaleService;

class CheckoutShoppingCartRequest extends MBRequest
{

    /**
     * @var string $CartID
     */
    protected $CartID = null;

    /**
     * @var string $ClientID
     */
    protected $ClientID = null;

    /**
     * @var boolean $Test
     */
    protected $Test = null;

    /**
     * @var ArrayOfCartItem $CartItems
     */
    protected $CartItems = null;

    /**
     * @var boolean $InStore
     */
    protected $InStore = null;

    /**
     * @var string $PromotionCode
     */
    protected $PromotionCode = null;

    /**
     * @var ArrayOfPaymentInfo $Payments
     */
    protected $Payments = null;

    /**
     * @var boolean $SendEmail
     */
    protected $SendEmail = null;

    /**
     * @var int $LocationID
     */
    protected $LocationID = null;

    /**
     * @var base64Binary $Image
     */
    protected $Image = null;

    /**
     * @var string $ImageFileName
     */
    protected $ImageFileName = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getCartID()
    {
      return $this->CartID;
    }

    /**
     * @param string $CartID
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setCartID($CartID)
    {
      $this->CartID = $CartID;
      return $this;
    }

    /**
     * @return string
     */
    public function getClientID()
    {
      return $this->ClientID;
    }

    /**
     * @param string $ClientID
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getTest()
    {
      return $this->Test;
    }

    /**
     * @param boolean $Test
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
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
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setCartItems($CartItems)
    {
      $this->CartItems = $CartItems;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getInStore()
    {
      return $this->InStore;
    }

    /**
     * @param boolean $InStore
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setInStore($InStore)
    {
      $this->InStore = $InStore;
      return $this;
    }

    /**
     * @return string
     */
    public function getPromotionCode()
    {
      return $this->PromotionCode;
    }

    /**
     * @param string $PromotionCode
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setPromotionCode($PromotionCode)
    {
      $this->PromotionCode = $PromotionCode;
      return $this;
    }

    /**
     * @return ArrayOfPaymentInfo
     */
    public function getPayments()
    {
      return $this->Payments;
    }

    /**
     * @param ArrayOfPaymentInfo $Payments
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setPayments($Payments)
    {
      $this->Payments = $Payments;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSendEmail()
    {
      return $this->SendEmail;
    }

    /**
     * @param boolean $SendEmail
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setSendEmail($SendEmail)
    {
      $this->SendEmail = $SendEmail;
      return $this;
    }

    /**
     * @return int
     */
    public function getLocationID()
    {
      return $this->LocationID;
    }

    /**
     * @param int $LocationID
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setLocationID($LocationID)
    {
      $this->LocationID = $LocationID;
      return $this;
    }

    /**
     * @return base64Binary
     */
    public function getImage()
    {
      return $this->Image;
    }

    /**
     * @param base64Binary $Image
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setImage($Image)
    {
      $this->Image = $Image;
      return $this;
    }

    /**
     * @return string
     */
    public function getImageFileName()
    {
      return $this->ImageFileName;
    }

    /**
     * @param string $ImageFileName
     * @return \Famoser\MBOApiWrapper\SaleService\CheckoutShoppingCartRequest
     */
    public function setImageFileName($ImageFileName)
    {
      $this->ImageFileName = $ImageFileName;
      return $this;
    }

}
