<?php

namespace Famoser\MBOApiWrapper\FinderService;

class FinderAppointment
{

    /**
     * @var Site $Site
     */
    protected $Site = null;

    /**
     * @var Organization $Organization
     */
    protected $Organization = null;

    /**
     * @var Location $Location
     */
    protected $Location = null;

    /**
     * @var int $MBFSessionTypeID
     */
    protected $MBFSessionTypeID = null;

    /**
     * @var string $GUID
     */
    protected $GUID = null;

    /**
     * @var FinderSessionType $SessionType
     */
    protected $SessionType = null;

    /**
     * @var Program $Program
     */
    protected $Program = null;

    /**
     * @var float $Price
     */
    protected $Price = null;

    /**
     * @var float $TaxRate
     */
    protected $TaxRate = null;

    /**
     * @var float $TaxAmount
     */
    protected $TaxAmount = null;

    /**
     * @var boolean $Featured
     */
    protected $Featured = null;

    /**
     * @param int $MBFSessionTypeID
     * @param float $TaxRate
     * @param float $TaxAmount
     * @param boolean $Featured
     */
    public function __construct($MBFSessionTypeID, $TaxRate, $TaxAmount, $Featured)
    {
      $this->MBFSessionTypeID = $MBFSessionTypeID;
      $this->TaxRate = $TaxRate;
      $this->TaxAmount = $TaxAmount;
      $this->Featured = $Featured;
    }

    /**
     * @return Site
     */
    public function getSite()
    {
      return $this->Site;
    }

    /**
     * @param Site $Site
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setSite($Site)
    {
      $this->Site = $Site;
      return $this;
    }

    /**
     * @return Organization
     */
    public function getOrganization()
    {
      return $this->Organization;
    }

    /**
     * @param Organization $Organization
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setOrganization($Organization)
    {
      $this->Organization = $Organization;
      return $this;
    }

    /**
     * @return Location
     */
    public function getLocation()
    {
      return $this->Location;
    }

    /**
     * @param Location $Location
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setLocation($Location)
    {
      $this->Location = $Location;
      return $this;
    }

    /**
     * @return int
     */
    public function getMBFSessionTypeID()
    {
      return $this->MBFSessionTypeID;
    }

    /**
     * @param int $MBFSessionTypeID
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setMBFSessionTypeID($MBFSessionTypeID)
    {
      $this->MBFSessionTypeID = $MBFSessionTypeID;
      return $this;
    }

    /**
     * @return string
     */
    public function getGUID()
    {
      return $this->GUID;
    }

    /**
     * @param string $GUID
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setGUID($GUID)
    {
      $this->GUID = $GUID;
      return $this;
    }

    /**
     * @return FinderSessionType
     */
    public function getSessionType()
    {
      return $this->SessionType;
    }

    /**
     * @param FinderSessionType $SessionType
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setSessionType($SessionType)
    {
      $this->SessionType = $SessionType;
      return $this;
    }

    /**
     * @return Program
     */
    public function getProgram()
    {
      return $this->Program;
    }

    /**
     * @param Program $Program
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setProgram($Program)
    {
      $this->Program = $Program;
      return $this;
    }

    /**
     * @return float
     */
    public function getPrice()
    {
      return $this->Price;
    }

    /**
     * @param float $Price
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setPrice($Price)
    {
      $this->Price = $Price;
      return $this;
    }

    /**
     * @return float
     */
    public function getTaxRate()
    {
      return $this->TaxRate;
    }

    /**
     * @param float $TaxRate
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setTaxRate($TaxRate)
    {
      $this->TaxRate = $TaxRate;
      return $this;
    }

    /**
     * @return float
     */
    public function getTaxAmount()
    {
      return $this->TaxAmount;
    }

    /**
     * @param float $TaxAmount
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setTaxAmount($TaxAmount)
    {
      $this->TaxAmount = $TaxAmount;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getFeatured()
    {
      return $this->Featured;
    }

    /**
     * @param boolean $Featured
     * @return \Famoser\MBOApiWrapper\FinderService\FinderAppointment
     */
    public function setFeatured($Featured)
    {
      $this->Featured = $Featured;
      return $this;
    }

}
