<?php

namespace Famoser\MBOApiWrapper\FinderService;

class CreditCardInfo extends PaymentInfo
{

    /**
     * @var string $CVV
     */
    protected $CVV = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var string $CreditCardNumber
     */
    protected $CreditCardNumber = null;

    /**
     * @var float $Amount
     */
    protected $Amount = null;

    /**
     * @var string $ExpMonth
     */
    protected $ExpMonth = null;

    /**
     * @var string $ExpYear
     */
    protected $ExpYear = null;

    /**
     * @var string $BillingName
     */
    protected $BillingName = null;

    /**
     * @var string $BillingAddress
     */
    protected $BillingAddress = null;

    /**
     * @var string $BillingCity
     */
    protected $BillingCity = null;

    /**
     * @var string $BillingState
     */
    protected $BillingState = null;

    /**
     * @var string $BillingPostalCode
     */
    protected $BillingPostalCode = null;

    /**
     * @var boolean $SaveInfo
     */
    protected $SaveInfo = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getCVV()
    {
      return $this->CVV;
    }

    /**
     * @param string $CVV
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setCVV($CVV)
    {
      $this->CVV = $CVV;
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
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setAction($Action)
    {
      $this->Action = $Action;
      return $this;
    }

    /**
     * @return string
     */
    public function getCreditCardNumber()
    {
      return $this->CreditCardNumber;
    }

    /**
     * @param string $CreditCardNumber
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setCreditCardNumber($CreditCardNumber)
    {
      $this->CreditCardNumber = $CreditCardNumber;
      return $this;
    }

    /**
     * @return float
     */
    public function getAmount()
    {
      return $this->Amount;
    }

    /**
     * @param float $Amount
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setAmount($Amount)
    {
      $this->Amount = $Amount;
      return $this;
    }

    /**
     * @return string
     */
    public function getExpMonth()
    {
      return $this->ExpMonth;
    }

    /**
     * @param string $ExpMonth
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setExpMonth($ExpMonth)
    {
      $this->ExpMonth = $ExpMonth;
      return $this;
    }

    /**
     * @return string
     */
    public function getExpYear()
    {
      return $this->ExpYear;
    }

    /**
     * @param string $ExpYear
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setExpYear($ExpYear)
    {
      $this->ExpYear = $ExpYear;
      return $this;
    }

    /**
     * @return string
     */
    public function getBillingName()
    {
      return $this->BillingName;
    }

    /**
     * @param string $BillingName
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setBillingName($BillingName)
    {
      $this->BillingName = $BillingName;
      return $this;
    }

    /**
     * @return string
     */
    public function getBillingAddress()
    {
      return $this->BillingAddress;
    }

    /**
     * @param string $BillingAddress
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setBillingAddress($BillingAddress)
    {
      $this->BillingAddress = $BillingAddress;
      return $this;
    }

    /**
     * @return string
     */
    public function getBillingCity()
    {
      return $this->BillingCity;
    }

    /**
     * @param string $BillingCity
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setBillingCity($BillingCity)
    {
      $this->BillingCity = $BillingCity;
      return $this;
    }

    /**
     * @return string
     */
    public function getBillingState()
    {
      return $this->BillingState;
    }

    /**
     * @param string $BillingState
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setBillingState($BillingState)
    {
      $this->BillingState = $BillingState;
      return $this;
    }

    /**
     * @return string
     */
    public function getBillingPostalCode()
    {
      return $this->BillingPostalCode;
    }

    /**
     * @param string $BillingPostalCode
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setBillingPostalCode($BillingPostalCode)
    {
      $this->BillingPostalCode = $BillingPostalCode;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSaveInfo()
    {
      return $this->SaveInfo;
    }

    /**
     * @param boolean $SaveInfo
     * @return \Famoser\MBOApiWrapper\FinderService\CreditCardInfo
     */
    public function setSaveInfo($SaveInfo)
    {
      $this->SaveInfo = $SaveInfo;
      return $this;
    }

}
