<?php

namespace Famoser\MBOApiWrapper\SaleService;

class Staff extends MBObject
{

    /**
     * @var ArrayOfAppointment $Appointments
     */
    protected $Appointments = null;

    /**
     * @var ArrayOfUnavailability $Unavailabilities
     */
    protected $Unavailabilities = null;

    /**
     * @var ArrayOfAvailability $Availabilities
     */
    protected $Availabilities = null;

    /**
     * @var string $Email
     */
    protected $Email = null;

    /**
     * @var string $MobilePhone
     */
    protected $MobilePhone = null;

    /**
     * @var string $HomePhone
     */
    protected $HomePhone = null;

    /**
     * @var string $WorkPhone
     */
    protected $WorkPhone = null;

    /**
     * @var string $Address
     */
    protected $Address = null;

    /**
     * @var string $Address2
     */
    protected $Address2 = null;

    /**
     * @var string $City
     */
    protected $City = null;

    /**
     * @var string $State
     */
    protected $State = null;

    /**
     * @var string $Country
     */
    protected $Country = null;

    /**
     * @var string $PostalCode
     */
    protected $PostalCode = null;

    /**
     * @var string $ForeignZip
     */
    protected $ForeignZip = null;

    /**
     * @var int $SortOrder
     */
    protected $SortOrder = null;

    /**
     * @var ArrayOfLocation $LoginLocations
     */
    protected $LoginLocations = null;

    /**
     * @var boolean $MultiLocation
     */
    protected $MultiLocation = null;

    /**
     * @var boolean $AppointmentTrn
     */
    protected $AppointmentTrn = null;

    /**
     * @var boolean $ReservationTrn
     */
    protected $ReservationTrn = null;

    /**
     * @var boolean $IndependentContractor
     */
    protected $IndependentContractor = null;

    /**
     * @var boolean $AlwaysAllowDoubleBooking
     */
    protected $AlwaysAllowDoubleBooking = null;

    /**
     * @var string $UserAccessLevel
     */
    protected $UserAccessLevel = null;

    /**
     * @var ArrayOfString $ProviderIDs
     */
    protected $ProviderIDs = null;

    /**
     * @var ArrayOfProviderIDUpdate $ProviderIDUpdateList
     */
    protected $ProviderIDUpdateList = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $Name
     */
    protected $Name = null;

    /**
     * @var string $FirstName
     */
    protected $FirstName = null;

    /**
     * @var string $LastName
     */
    protected $LastName = null;

    /**
     * @var string $ImageURL
     */
    protected $ImageURL = null;

    /**
     * @var string $Bio
     */
    protected $Bio = null;

    /**
     * @var boolean $isMale
     */
    protected $isMale = null;

    /**
     * @param boolean $isMale
     */
    public function __construct($isMale)
    {
      parent::__construct();
      $this->isMale = $isMale;
    }

    /**
     * @return ArrayOfAppointment
     */
    public function getAppointments()
    {
      return $this->Appointments;
    }

    /**
     * @param ArrayOfAppointment $Appointments
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setAppointments($Appointments)
    {
      $this->Appointments = $Appointments;
      return $this;
    }

    /**
     * @return ArrayOfUnavailability
     */
    public function getUnavailabilities()
    {
      return $this->Unavailabilities;
    }

    /**
     * @param ArrayOfUnavailability $Unavailabilities
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setUnavailabilities($Unavailabilities)
    {
      $this->Unavailabilities = $Unavailabilities;
      return $this;
    }

    /**
     * @return ArrayOfAvailability
     */
    public function getAvailabilities()
    {
      return $this->Availabilities;
    }

    /**
     * @param ArrayOfAvailability $Availabilities
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setAvailabilities($Availabilities)
    {
      $this->Availabilities = $Availabilities;
      return $this;
    }

    /**
     * @return string
     */
    public function getEmail()
    {
      return $this->Email;
    }

    /**
     * @param string $Email
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setEmail($Email)
    {
      $this->Email = $Email;
      return $this;
    }

    /**
     * @return string
     */
    public function getMobilePhone()
    {
      return $this->MobilePhone;
    }

    /**
     * @param string $MobilePhone
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setMobilePhone($MobilePhone)
    {
      $this->MobilePhone = $MobilePhone;
      return $this;
    }

    /**
     * @return string
     */
    public function getHomePhone()
    {
      return $this->HomePhone;
    }

    /**
     * @param string $HomePhone
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setHomePhone($HomePhone)
    {
      $this->HomePhone = $HomePhone;
      return $this;
    }

    /**
     * @return string
     */
    public function getWorkPhone()
    {
      return $this->WorkPhone;
    }

    /**
     * @param string $WorkPhone
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setWorkPhone($WorkPhone)
    {
      $this->WorkPhone = $WorkPhone;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setAddress($Address)
    {
      $this->Address = $Address;
      return $this;
    }

    /**
     * @return string
     */
    public function getAddress2()
    {
      return $this->Address2;
    }

    /**
     * @param string $Address2
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setAddress2($Address2)
    {
      $this->Address2 = $Address2;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
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
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setState($State)
    {
      $this->State = $State;
      return $this;
    }

    /**
     * @return string
     */
    public function getCountry()
    {
      return $this->Country;
    }

    /**
     * @param string $Country
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setCountry($Country)
    {
      $this->Country = $Country;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setPostalCode($PostalCode)
    {
      $this->PostalCode = $PostalCode;
      return $this;
    }

    /**
     * @return string
     */
    public function getForeignZip()
    {
      return $this->ForeignZip;
    }

    /**
     * @param string $ForeignZip
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setForeignZip($ForeignZip)
    {
      $this->ForeignZip = $ForeignZip;
      return $this;
    }

    /**
     * @return int
     */
    public function getSortOrder()
    {
      return $this->SortOrder;
    }

    /**
     * @param int $SortOrder
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setSortOrder($SortOrder)
    {
      $this->SortOrder = $SortOrder;
      return $this;
    }

    /**
     * @return ArrayOfLocation
     */
    public function getLoginLocations()
    {
      return $this->LoginLocations;
    }

    /**
     * @param ArrayOfLocation $LoginLocations
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setLoginLocations($LoginLocations)
    {
      $this->LoginLocations = $LoginLocations;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getMultiLocation()
    {
      return $this->MultiLocation;
    }

    /**
     * @param boolean $MultiLocation
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setMultiLocation($MultiLocation)
    {
      $this->MultiLocation = $MultiLocation;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getAppointmentTrn()
    {
      return $this->AppointmentTrn;
    }

    /**
     * @param boolean $AppointmentTrn
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setAppointmentTrn($AppointmentTrn)
    {
      $this->AppointmentTrn = $AppointmentTrn;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getReservationTrn()
    {
      return $this->ReservationTrn;
    }

    /**
     * @param boolean $ReservationTrn
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setReservationTrn($ReservationTrn)
    {
      $this->ReservationTrn = $ReservationTrn;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIndependentContractor()
    {
      return $this->IndependentContractor;
    }

    /**
     * @param boolean $IndependentContractor
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setIndependentContractor($IndependentContractor)
    {
      $this->IndependentContractor = $IndependentContractor;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getAlwaysAllowDoubleBooking()
    {
      return $this->AlwaysAllowDoubleBooking;
    }

    /**
     * @param boolean $AlwaysAllowDoubleBooking
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setAlwaysAllowDoubleBooking($AlwaysAllowDoubleBooking)
    {
      $this->AlwaysAllowDoubleBooking = $AlwaysAllowDoubleBooking;
      return $this;
    }

    /**
     * @return string
     */
    public function getUserAccessLevel()
    {
      return $this->UserAccessLevel;
    }

    /**
     * @param string $UserAccessLevel
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setUserAccessLevel($UserAccessLevel)
    {
      $this->UserAccessLevel = $UserAccessLevel;
      return $this;
    }

    /**
     * @return ArrayOfString
     */
    public function getProviderIDs()
    {
      return $this->ProviderIDs;
    }

    /**
     * @param ArrayOfString $ProviderIDs
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setProviderIDs($ProviderIDs)
    {
      $this->ProviderIDs = $ProviderIDs;
      return $this;
    }

    /**
     * @return ArrayOfProviderIDUpdate
     */
    public function getProviderIDUpdateList()
    {
      return $this->ProviderIDUpdateList;
    }

    /**
     * @param ArrayOfProviderIDUpdate $ProviderIDUpdateList
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setProviderIDUpdateList($ProviderIDUpdateList)
    {
      $this->ProviderIDUpdateList = $ProviderIDUpdateList;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setAction($Action)
    {
      $this->Action = $Action;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return string
     */
    public function getName()
    {
      return $this->Name;
    }

    /**
     * @param string $Name
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

    /**
     * @return string
     */
    public function getFirstName()
    {
      return $this->FirstName;
    }

    /**
     * @param string $FirstName
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setFirstName($FirstName)
    {
      $this->FirstName = $FirstName;
      return $this;
    }

    /**
     * @return string
     */
    public function getLastName()
    {
      return $this->LastName;
    }

    /**
     * @param string $LastName
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setLastName($LastName)
    {
      $this->LastName = $LastName;
      return $this;
    }

    /**
     * @return string
     */
    public function getImageURL()
    {
      return $this->ImageURL;
    }

    /**
     * @param string $ImageURL
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setImageURL($ImageURL)
    {
      $this->ImageURL = $ImageURL;
      return $this;
    }

    /**
     * @return string
     */
    public function getBio()
    {
      return $this->Bio;
    }

    /**
     * @param string $Bio
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setBio($Bio)
    {
      $this->Bio = $Bio;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsMale()
    {
      return $this->isMale;
    }

    /**
     * @param boolean $isMale
     * @return \Famoser\MBOApiWrapper\SaleService\Staff
     */
    public function setIsMale($isMale)
    {
      $this->isMale = $isMale;
      return $this;
    }

}
