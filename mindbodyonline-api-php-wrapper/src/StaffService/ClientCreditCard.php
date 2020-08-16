<?php

namespace Famoser\MBOApiWrapper\StaffService;

class ClientCreditCard
{

    /**
     * @var string $CardType
     */
    protected $CardType = null;

    /**
     * @var string $LastFour
     */
    protected $LastFour = null;

    /**
     * @var string $CardNumber
     */
    protected $CardNumber = null;

    /**
     * @var string $CardHolder
     */
    protected $CardHolder = null;

    /**
     * @var string $ExpMonth
     */
    protected $ExpMonth = null;

    /**
     * @var string $ExpYear
     */
    protected $ExpYear = null;

    /**
     * @var string $Address
     */
    protected $Address = null;

    /**
     * @var string $City
     */
    protected $City = null;

    /**
     * @var string $State
     */
    protected $State = null;

    /**
     * @var string $PostalCode
     */
    protected $PostalCode = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return string
     */
    public function getCardType()
    {
      return $this->CardType;
    }

    /**
     * @param string $CardType
     * @return \Famoser\MBOApiWrapper\StaffService\ClientCreditCard
     */
    public function setCardType($CardType)
    {
      $this->CardType = $CardType;
      return $this;
    }

    /**
     * @return string
     */
    public function getLastFour()
    {
      return $this->LastFour;
    }

    /**
     * @param string $LastFour
     * @return \Famoser\MBOApiWrapper\StaffService\ClientCreditCard
     */
    public function setLastFour($LastFour)
    {
      $this->LastFour = $LastFour;
      return $this;
    }

    /**
     * @return string
     */
    public function getCardNumber()
    {
      return $this->CardNumber;
    }

    /**
     * @param string $CardNumber
     * @return \Famoser\MBOApiWrapper\StaffService\ClientCreditCard
     */
    public function setCardNumber($CardNumber)
    {
      $this->CardNumber = $CardNumber;
      return $this;
    }

    /**
     * @return string
     */
    public function getCardHolder()
    {
      return $this->CardHolder;
    }

    /**
     * @param string $CardHolder
     * @return \Famoser\MBOApiWrapper\StaffService\ClientCreditCard
     */
    public function setCardHolder($CardHolder)
    {
      $this->CardHolder = $CardHolder;
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
     * @return \Famoser\MBOApiWrapper\StaffService\ClientCreditCard
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
     * @return \Famoser\MBOApiWrapper\StaffService\ClientCreditCard
     */
    public function setExpYear($ExpYear)
    {
      $this->ExpYear = $ExpYear;
      return $this;
    }

    /**
     * @return string
     */
    public function getAddress()
    {
      return $this->Address;
    }

    /**
     * @param string $Address
     * @return \Famoser\MBOApiWrapper\StaffService\ClientCreditCard
     */
    public function setAddress($Address)
    {
      $this->Address = $Address;
      return $this;
    }

    /**
     * @return string
     */
    public function getCity()
    {
      return $this->City;
    }

    /**
     * @param string $City
     * @return \Famoser\MBOApiWrapper\StaffService\ClientCreditCard
     */
    public function setCity($City)
    {
      $this->City = $City;
      return $this;
    }

    /**
     * @return string
     */
    public function getState()
    {
      return $this->State;
    }

    /**
     * @param string $State
     * @return \Famoser\MBOApiWrapper\StaffService\ClientCreditCard
     */
    public function setState($State)
    {
      $this->State = $State;
      return $this;
    }

    /**
     * @return string
     */
    public function getPostalCode()
    {
      return $this->PostalCode;
    }

    /**
     * @param string $PostalCode
     * @return \Famoser\MBOApiWrapper\StaffService\ClientCreditCard
     */
    public function setPostalCode($PostalCode)
    {
      $this->PostalCode = $PostalCode;
      return $this;
    }

}
