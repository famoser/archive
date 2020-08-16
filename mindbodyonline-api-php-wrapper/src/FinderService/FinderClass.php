<?php

namespace Famoser\MBOApiWrapper\FinderService;

class FinderClass
{

    /**
     * @var Organization $Organization
     */
    protected $Organization = null;

    /**
     * @var Site $Site
     */
    protected $Site = null;

    /**
     * @var FinderSessionType $SessionType
     */
    protected $SessionType = null;

    /**
     * @var float $Price
     */
    protected $Price = null;

    /**
     * @var float $TaxAmount
     */
    protected $TaxAmount = null;

    /**
     * @var float $TaxRate
     */
    protected $TaxRate = null;

    /**
     * @var boolean $Bookable
     */
    protected $Bookable = null;

    /**
     * @var int $MBFClassID
     */
    protected $MBFClassID = null;

    /**
     * @var string $GUID
     */
    protected $GUID = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var int $ClassID
     */
    protected $ClassID = null;

    /**
     * @var Location $Location
     */
    protected $Location = null;

    /**
     * @var \DateTime $ClassDate
     */
    protected $ClassDate = null;

    /**
     * @var string $ClassName
     */
    protected $ClassName = null;

    /**
     * @var string $ClassDescription
     */
    protected $ClassDescription = null;

    /**
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var \DateTime $EndDateTime
     */
    protected $EndDateTime = null;

    /**
     * @var Staff $Staff
     */
    protected $Staff = null;

    /**
     * @param float $TaxAmount
     * @param float $TaxRate
     * @param boolean $Bookable
     * @param int $MBFClassID
     */
    public function __construct($TaxAmount, $TaxRate, $Bookable, $MBFClassID)
    {
      $this->TaxAmount = $TaxAmount;
      $this->TaxRate = $TaxRate;
      $this->Bookable = $Bookable;
      $this->MBFClassID = $MBFClassID;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setOrganization($Organization)
    {
      $this->Organization = $Organization;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setSite($Site)
    {
      $this->Site = $Site;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setSessionType($SessionType)
    {
      $this->SessionType = $SessionType;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setPrice($Price)
    {
      $this->Price = $Price;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setTaxAmount($TaxAmount)
    {
      $this->TaxAmount = $TaxAmount;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setTaxRate($TaxRate)
    {
      $this->TaxRate = $TaxRate;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getBookable()
    {
      return $this->Bookable;
    }

    /**
     * @param boolean $Bookable
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setBookable($Bookable)
    {
      $this->Bookable = $Bookable;
      return $this;
    }

    /**
     * @return int
     */
    public function getMBFClassID()
    {
      return $this->MBFClassID;
    }

    /**
     * @param int $MBFClassID
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setMBFClassID($MBFClassID)
    {
      $this->MBFClassID = $MBFClassID;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setGUID($GUID)
    {
      $this->GUID = $GUID;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setAction($Action)
    {
      $this->Action = $Action;
      return $this;
    }

    /**
     * @return int
     */
    public function getClassID()
    {
      return $this->ClassID;
    }

    /**
     * @param int $ClassID
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setClassID($ClassID)
    {
      $this->ClassID = $ClassID;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setLocation($Location)
    {
      $this->Location = $Location;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getClassDate()
    {
      if ($this->ClassDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->ClassDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $ClassDate
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setClassDate(\DateTime $ClassDate = null)
    {
      if ($ClassDate == null) {
       $this->ClassDate = null;
      } else {
        $this->ClassDate = $ClassDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return string
     */
    public function getClassName()
    {
      return $this->ClassName;
    }

    /**
     * @param string $ClassName
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setClassName($ClassName)
    {
      $this->ClassName = $ClassName;
      return $this;
    }

    /**
     * @return string
     */
    public function getClassDescription()
    {
      return $this->ClassDescription;
    }

    /**
     * @param string $ClassDescription
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setClassDescription($ClassDescription)
    {
      $this->ClassDescription = $ClassDescription;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getStartDateTime()
    {
      if ($this->StartDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->StartDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $StartDateTime
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setStartDateTime(\DateTime $StartDateTime = null)
    {
      if ($StartDateTime == null) {
       $this->StartDateTime = null;
      } else {
        $this->StartDateTime = $StartDateTime->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEndDateTime()
    {
      if ($this->EndDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EndDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EndDateTime
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setEndDateTime(\DateTime $EndDateTime = null)
    {
      if ($EndDateTime == null) {
       $this->EndDateTime = null;
      } else {
        $this->EndDateTime = $EndDateTime->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return Staff
     */
    public function getStaff()
    {
      return $this->Staff;
    }

    /**
     * @param Staff $Staff
     * @return \Famoser\MBOApiWrapper\FinderService\FinderClass
     */
    public function setStaff($Staff)
    {
      $this->Staff = $Staff;
      return $this;
    }

}
