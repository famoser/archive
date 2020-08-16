<?php

namespace Famoser\MBOApiWrapper\SaleService;

class RedeemSpaFinderWellnessCardRequest extends MBRequest
{

    /**
     * @var string $CardID
     */
    protected $CardID = null;

    /**
     * @var float $FaceAmount
     */
    protected $FaceAmount = null;

    /**
     * @var string $Currency
     */
    protected $Currency = null;

    /**
     * @var string $ClientID
     */
    protected $ClientID = null;

    /**
     * @var int $LocationID
     */
    protected $LocationID = null;

    /**
     * @param float $FaceAmount
     */
    public function __construct($FaceAmount)
    {
      parent::__construct();
      $this->FaceAmount = $FaceAmount;
    }

    /**
     * @return string
     */
    public function getCardID()
    {
      return $this->CardID;
    }

    /**
     * @param string $CardID
     * @return \Famoser\MBOApiWrapper\SaleService\RedeemSpaFinderWellnessCardRequest
     */
    public function setCardID($CardID)
    {
      $this->CardID = $CardID;
      return $this;
    }

    /**
     * @return float
     */
    public function getFaceAmount()
    {
      return $this->FaceAmount;
    }

    /**
     * @param float $FaceAmount
     * @return \Famoser\MBOApiWrapper\SaleService\RedeemSpaFinderWellnessCardRequest
     */
    public function setFaceAmount($FaceAmount)
    {
      $this->FaceAmount = $FaceAmount;
      return $this;
    }

    /**
     * @return string
     */
    public function getCurrency()
    {
      return $this->Currency;
    }

    /**
     * @param string $Currency
     * @return \Famoser\MBOApiWrapper\SaleService\RedeemSpaFinderWellnessCardRequest
     */
    public function setCurrency($Currency)
    {
      $this->Currency = $Currency;
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
     * @return \Famoser\MBOApiWrapper\SaleService\RedeemSpaFinderWellnessCardRequest
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
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
     * @return \Famoser\MBOApiWrapper\SaleService\RedeemSpaFinderWellnessCardRequest
     */
    public function setLocationID($LocationID)
    {
      $this->LocationID = $LocationID;
      return $this;
    }

}
