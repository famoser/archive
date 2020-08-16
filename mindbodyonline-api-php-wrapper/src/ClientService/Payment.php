<?php

namespace Famoser\MBOApiWrapper\ClientService;

class Payment
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var float $Amount
     */
    protected $Amount = null;

    /**
     * @var int $Method
     */
    protected $Method = null;

    /**
     * @var string $Type
     */
    protected $Type = null;

    /**
     * @var string $LastFour
     */
    protected $LastFour = null;

    /**
     * @var string $Notes
     */
    protected $Notes = null;

    /**
     * @param int $ID
     * @param float $Amount
     * @param int $Method
     */
    public function __construct($ID, $Amount, $Method)
    {
      $this->ID = $ID;
      $this->Amount = $Amount;
      $this->Method = $Method;
    }

    /**
     * @return int
     */
    public function getID()
    {
      return $this->ID;
    }

    /**
     * @param int $ID
     * @return \Famoser\MBOApiWrapper\ClientService\Payment
     */
    public function setID($ID)
    {
      $this->ID = $ID;
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
     * @return \Famoser\MBOApiWrapper\ClientService\Payment
     */
    public function setAmount($Amount)
    {
      $this->Amount = $Amount;
      return $this;
    }

    /**
     * @return int
     */
    public function getMethod()
    {
      return $this->Method;
    }

    /**
     * @param int $Method
     * @return \Famoser\MBOApiWrapper\ClientService\Payment
     */
    public function setMethod($Method)
    {
      $this->Method = $Method;
      return $this;
    }

    /**
     * @return string
     */
    public function getType()
    {
      return $this->Type;
    }

    /**
     * @param string $Type
     * @return \Famoser\MBOApiWrapper\ClientService\Payment
     */
    public function setType($Type)
    {
      $this->Type = $Type;
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
     * @return \Famoser\MBOApiWrapper\ClientService\Payment
     */
    public function setLastFour($LastFour)
    {
      $this->LastFour = $LastFour;
      return $this;
    }

    /**
     * @return string
     */
    public function getNotes()
    {
      return $this->Notes;
    }

    /**
     * @param string $Notes
     * @return \Famoser\MBOApiWrapper\ClientService\Payment
     */
    public function setNotes($Notes)
    {
      $this->Notes = $Notes;
      return $this;
    }

}
