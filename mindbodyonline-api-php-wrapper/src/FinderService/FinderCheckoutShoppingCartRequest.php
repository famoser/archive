<?php

namespace Famoser\MBOApiWrapper\FinderService;

class FinderCheckoutShoppingCartRequest extends MBRequest
{

    /**
     * @var boolean $Test
     */
    protected $Test = null;

    /**
     * @var boolean $NoClientEmail
     */
    protected $NoClientEmail = null;

    /**
     * @var int $MBFClassID
     */
    protected $MBFClassID = null;

    /**
     * @var int $MBFSessionTypeID
     */
    protected $MBFSessionTypeID = null;

    /**
     * @var \DateTime $SessionDateTime
     */
    protected $SessionDateTime = null;

    /**
     * @var int $StaffID
     */
    protected $StaffID = null;

    /**
     * @var int $PartnerID
     */
    protected $PartnerID = null;

    /**
     * @var float $SearchLatitude
     */
    protected $SearchLatitude = null;

    /**
     * @var float $SearchLongitude
     */
    protected $SearchLongitude = null;

    /**
     * @var boolean $SaveCCInfo
     */
    protected $SaveCCInfo = null;

    /**
     * @var SpaFinderWellnessCard $SpaFinderWellnessCard
     */
    protected $SpaFinderWellnessCard = null;

    /**
     * @var PaymentInfo $PaymentInfo
     */
    protected $PaymentInfo = null;

    /**
     * @param int $MBFClassID
     * @param int $MBFSessionTypeID
     * @param \DateTime $SessionDateTime
     * @param int $StaffID
     * @param int $PartnerID
     * @param float $SearchLatitude
     * @param float $SearchLongitude
     */
    public function __construct($MBFClassID, $MBFSessionTypeID, \DateTime $SessionDateTime, $StaffID, $PartnerID, $SearchLatitude, $SearchLongitude)
    {
      parent::__construct();
      $this->MBFClassID = $MBFClassID;
      $this->MBFSessionTypeID = $MBFSessionTypeID;
      $this->SessionDateTime = $SessionDateTime->format(\DateTime::ATOM);
      $this->StaffID = $StaffID;
      $this->PartnerID = $PartnerID;
      $this->SearchLatitude = $SearchLatitude;
      $this->SearchLongitude = $SearchLongitude;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getNoClientEmail()
    {
      return $this->NoClientEmail;
    }

    /**
     * @param boolean $NoClientEmail
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setNoClientEmail($NoClientEmail)
    {
      $this->NoClientEmail = $NoClientEmail;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setMBFClassID($MBFClassID)
    {
      $this->MBFClassID = $MBFClassID;
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setMBFSessionTypeID($MBFSessionTypeID)
    {
      $this->MBFSessionTypeID = $MBFSessionTypeID;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getSessionDateTime()
    {
      if ($this->SessionDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->SessionDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $SessionDateTime
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setSessionDateTime(\DateTime $SessionDateTime)
    {
      $this->SessionDateTime = $SessionDateTime->format(\DateTime::ATOM);
      return $this;
    }

    /**
     * @return int
     */
    public function getStaffID()
    {
      return $this->StaffID;
    }

    /**
     * @param int $StaffID
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setStaffID($StaffID)
    {
      $this->StaffID = $StaffID;
      return $this;
    }

    /**
     * @return int
     */
    public function getPartnerID()
    {
      return $this->PartnerID;
    }

    /**
     * @param int $PartnerID
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setPartnerID($PartnerID)
    {
      $this->PartnerID = $PartnerID;
      return $this;
    }

    /**
     * @return float
     */
    public function getSearchLatitude()
    {
      return $this->SearchLatitude;
    }

    /**
     * @param float $SearchLatitude
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setSearchLatitude($SearchLatitude)
    {
      $this->SearchLatitude = $SearchLatitude;
      return $this;
    }

    /**
     * @return float
     */
    public function getSearchLongitude()
    {
      return $this->SearchLongitude;
    }

    /**
     * @param float $SearchLongitude
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setSearchLongitude($SearchLongitude)
    {
      $this->SearchLongitude = $SearchLongitude;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSaveCCInfo()
    {
      return $this->SaveCCInfo;
    }

    /**
     * @param boolean $SaveCCInfo
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setSaveCCInfo($SaveCCInfo)
    {
      $this->SaveCCInfo = $SaveCCInfo;
      return $this;
    }

    /**
     * @return SpaFinderWellnessCard
     */
    public function getSpaFinderWellnessCard()
    {
      return $this->SpaFinderWellnessCard;
    }

    /**
     * @param SpaFinderWellnessCard $SpaFinderWellnessCard
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setSpaFinderWellnessCard($SpaFinderWellnessCard)
    {
      $this->SpaFinderWellnessCard = $SpaFinderWellnessCard;
      return $this;
    }

    /**
     * @return PaymentInfo
     */
    public function getPaymentInfo()
    {
      return $this->PaymentInfo;
    }

    /**
     * @param PaymentInfo $PaymentInfo
     * @return \Famoser\MBOApiWrapper\FinderService\FinderCheckoutShoppingCartRequest
     */
    public function setPaymentInfo($PaymentInfo)
    {
      $this->PaymentInfo = $PaymentInfo;
      return $this;
    }

}
