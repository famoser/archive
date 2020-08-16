<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class Client extends MBObject
{

    /**
     * @var string $NewID
     */
    protected $NewID = null;

    /**
     * @var float $AccountBalance
     */
    protected $AccountBalance = null;

    /**
     * @var ArrayOfClientIndex $ClientIndexes
     */
    protected $ClientIndexes = null;

    /**
     * @var string $Username
     */
    protected $Username = null;

    /**
     * @var string $Password
     */
    protected $Password = null;

    /**
     * @var string $Notes
     */
    protected $Notes = null;

    /**
     * @var int $MobileProvider
     */
    protected $MobileProvider = null;

    /**
     * @var ClientCreditCard $ClientCreditCard
     */
    protected $ClientCreditCard = null;

    /**
     * @var string $LastFormulaNotes
     */
    protected $LastFormulaNotes = null;

    /**
     * @var string $AppointmentGenderPreference
     */
    protected $AppointmentGenderPreference = null;

    /**
     * @var string $Gender
     */
    protected $Gender = null;

    /**
     * @var boolean $IsCompany
     */
    protected $IsCompany = null;

    /**
     * @var boolean $Inactive
     */
    protected $Inactive = null;

    /**
     * @var ArrayOfClientRelationship $ClientRelationships
     */
    protected $ClientRelationships = null;

    /**
     * @var ArrayOfRep $Reps
     */
    protected $Reps = null;

    /**
     * @var ArrayOfSalesRep $SaleReps
     */
    protected $SaleReps = null;

    /**
     * @var ArrayOfCustomClientField $CustomClientFields
     */
    protected $CustomClientFields = null;

    /**
     * @var boolean $LiabilityRelease
     */
    protected $LiabilityRelease = null;

    /**
     * @var string $EmergencyContactInfoName
     */
    protected $EmergencyContactInfoName = null;

    /**
     * @var string $EmergencyContactInfoRelationship
     */
    protected $EmergencyContactInfoRelationship = null;

    /**
     * @var string $EmergencyContactInfoPhone
     */
    protected $EmergencyContactInfoPhone = null;

    /**
     * @var string $EmergencyContactInfoEmail
     */
    protected $EmergencyContactInfoEmail = null;

    /**
     * @var boolean $PromotionalEmailOptIn
     */
    protected $PromotionalEmailOptIn = null;

    /**
     * @var \DateTime $CreationDate
     */
    protected $CreationDate = null;

    /**
     * @var Liability $Liability
     */
    protected $Liability = null;

    /**
     * @var ProspectStage $ProspectStage
     */
    protected $ProspectStage = null;

    /**
     * @var int $UniqueID
     */
    protected $UniqueID = null;

    /**
     * @var int $MembershipIcon
     */
    protected $MembershipIcon = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var string $ID
     */
    protected $ID = null;

    /**
     * @var string $FirstName
     */
    protected $FirstName = null;

    /**
     * @var string $MiddleName
     */
    protected $MiddleName = null;

    /**
     * @var string $LastName
     */
    protected $LastName = null;

    /**
     * @var string $Email
     */
    protected $Email = null;

    /**
     * @var boolean $EmailOptIn
     */
    protected $EmailOptIn = null;

    /**
     * @var string $AddressLine1
     */
    protected $AddressLine1 = null;

    /**
     * @var string $AddressLine2
     */
    protected $AddressLine2 = null;

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

    /**
     * @var string $Country
     */
    protected $Country = null;

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
     * @var string $WorkExtension
     */
    protected $WorkExtension = null;

    /**
     * @var \DateTime $BirthDate
     */
    protected $BirthDate = null;

    /**
     * @var \DateTime $FirstAppointmentDate
     */
    protected $FirstAppointmentDate = null;

    /**
     * @var string $ReferredBy
     */
    protected $ReferredBy = null;

    /**
     * @var Location $HomeLocation
     */
    protected $HomeLocation = null;

    /**
     * @var string $YellowAlert
     */
    protected $YellowAlert = null;

    /**
     * @var string $RedAlert
     */
    protected $RedAlert = null;

    /**
     * @var string $PhotoURL
     */
    protected $PhotoURL = null;

    /**
     * @var boolean $IsProspect
     */
    protected $IsProspect = null;

    /**
     * @var string $Status
     */
    protected $Status = null;

    /**
     * @var int $ContactMethod
     */
    protected $ContactMethod = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getNewID()
    {
      return $this->NewID;
    }

    /**
     * @param string $NewID
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setNewID($NewID)
    {
      $this->NewID = $NewID;
      return $this;
    }

    /**
     * @return float
     */
    public function getAccountBalance()
    {
      return $this->AccountBalance;
    }

    /**
     * @param float $AccountBalance
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setAccountBalance($AccountBalance)
    {
      $this->AccountBalance = $AccountBalance;
      return $this;
    }

    /**
     * @return ArrayOfClientIndex
     */
    public function getClientIndexes()
    {
      return $this->ClientIndexes;
    }

    /**
     * @param ArrayOfClientIndex $ClientIndexes
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setClientIndexes($ClientIndexes)
    {
      $this->ClientIndexes = $ClientIndexes;
      return $this;
    }

    /**
     * @return string
     */
    public function getUsername()
    {
      return $this->Username;
    }

    /**
     * @param string $Username
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setUsername($Username)
    {
      $this->Username = $Username;
      return $this;
    }

    /**
     * @return string
     */
    public function getPassword()
    {
      return $this->Password;
    }

    /**
     * @param string $Password
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setPassword($Password)
    {
      $this->Password = $Password;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setNotes($Notes)
    {
      $this->Notes = $Notes;
      return $this;
    }

    /**
     * @return int
     */
    public function getMobileProvider()
    {
      return $this->MobileProvider;
    }

    /**
     * @param int $MobileProvider
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setMobileProvider($MobileProvider)
    {
      $this->MobileProvider = $MobileProvider;
      return $this;
    }

    /**
     * @return ClientCreditCard
     */
    public function getClientCreditCard()
    {
      return $this->ClientCreditCard;
    }

    /**
     * @param ClientCreditCard $ClientCreditCard
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setClientCreditCard($ClientCreditCard)
    {
      $this->ClientCreditCard = $ClientCreditCard;
      return $this;
    }

    /**
     * @return string
     */
    public function getLastFormulaNotes()
    {
      return $this->LastFormulaNotes;
    }

    /**
     * @param string $LastFormulaNotes
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setLastFormulaNotes($LastFormulaNotes)
    {
      $this->LastFormulaNotes = $LastFormulaNotes;
      return $this;
    }

    /**
     * @return string
     */
    public function getAppointmentGenderPreference()
    {
      return $this->AppointmentGenderPreference;
    }

    /**
     * @param string $AppointmentGenderPreference
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setAppointmentGenderPreference($AppointmentGenderPreference)
    {
      $this->AppointmentGenderPreference = $AppointmentGenderPreference;
      return $this;
    }

    /**
     * @return string
     */
    public function getGender()
    {
      return $this->Gender;
    }

    /**
     * @param string $Gender
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setGender($Gender)
    {
      $this->Gender = $Gender;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsCompany()
    {
      return $this->IsCompany;
    }

    /**
     * @param boolean $IsCompany
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setIsCompany($IsCompany)
    {
      $this->IsCompany = $IsCompany;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getInactive()
    {
      return $this->Inactive;
    }

    /**
     * @param boolean $Inactive
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setInactive($Inactive)
    {
      $this->Inactive = $Inactive;
      return $this;
    }

    /**
     * @return ArrayOfClientRelationship
     */
    public function getClientRelationships()
    {
      return $this->ClientRelationships;
    }

    /**
     * @param ArrayOfClientRelationship $ClientRelationships
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setClientRelationships($ClientRelationships)
    {
      $this->ClientRelationships = $ClientRelationships;
      return $this;
    }

    /**
     * @return ArrayOfRep
     */
    public function getReps()
    {
      return $this->Reps;
    }

    /**
     * @param ArrayOfRep $Reps
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setReps($Reps)
    {
      $this->Reps = $Reps;
      return $this;
    }

    /**
     * @return ArrayOfSalesRep
     */
    public function getSaleReps()
    {
      return $this->SaleReps;
    }

    /**
     * @param ArrayOfSalesRep $SaleReps
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setSaleReps($SaleReps)
    {
      $this->SaleReps = $SaleReps;
      return $this;
    }

    /**
     * @return ArrayOfCustomClientField
     */
    public function getCustomClientFields()
    {
      return $this->CustomClientFields;
    }

    /**
     * @param ArrayOfCustomClientField $CustomClientFields
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setCustomClientFields($CustomClientFields)
    {
      $this->CustomClientFields = $CustomClientFields;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getLiabilityRelease()
    {
      return $this->LiabilityRelease;
    }

    /**
     * @param boolean $LiabilityRelease
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setLiabilityRelease($LiabilityRelease)
    {
      $this->LiabilityRelease = $LiabilityRelease;
      return $this;
    }

    /**
     * @return string
     */
    public function getEmergencyContactInfoName()
    {
      return $this->EmergencyContactInfoName;
    }

    /**
     * @param string $EmergencyContactInfoName
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setEmergencyContactInfoName($EmergencyContactInfoName)
    {
      $this->EmergencyContactInfoName = $EmergencyContactInfoName;
      return $this;
    }

    /**
     * @return string
     */
    public function getEmergencyContactInfoRelationship()
    {
      return $this->EmergencyContactInfoRelationship;
    }

    /**
     * @param string $EmergencyContactInfoRelationship
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setEmergencyContactInfoRelationship($EmergencyContactInfoRelationship)
    {
      $this->EmergencyContactInfoRelationship = $EmergencyContactInfoRelationship;
      return $this;
    }

    /**
     * @return string
     */
    public function getEmergencyContactInfoPhone()
    {
      return $this->EmergencyContactInfoPhone;
    }

    /**
     * @param string $EmergencyContactInfoPhone
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setEmergencyContactInfoPhone($EmergencyContactInfoPhone)
    {
      $this->EmergencyContactInfoPhone = $EmergencyContactInfoPhone;
      return $this;
    }

    /**
     * @return string
     */
    public function getEmergencyContactInfoEmail()
    {
      return $this->EmergencyContactInfoEmail;
    }

    /**
     * @param string $EmergencyContactInfoEmail
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setEmergencyContactInfoEmail($EmergencyContactInfoEmail)
    {
      $this->EmergencyContactInfoEmail = $EmergencyContactInfoEmail;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getPromotionalEmailOptIn()
    {
      return $this->PromotionalEmailOptIn;
    }

    /**
     * @param boolean $PromotionalEmailOptIn
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setPromotionalEmailOptIn($PromotionalEmailOptIn)
    {
      $this->PromotionalEmailOptIn = $PromotionalEmailOptIn;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getCreationDate()
    {
      if ($this->CreationDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->CreationDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $CreationDate
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setCreationDate(\DateTime $CreationDate = null)
    {
      if ($CreationDate == null) {
       $this->CreationDate = null;
      } else {
        $this->CreationDate = $CreationDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return Liability
     */
    public function getLiability()
    {
      return $this->Liability;
    }

    /**
     * @param Liability $Liability
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setLiability($Liability)
    {
      $this->Liability = $Liability;
      return $this;
    }

    /**
     * @return ProspectStage
     */
    public function getProspectStage()
    {
      return $this->ProspectStage;
    }

    /**
     * @param ProspectStage $ProspectStage
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setProspectStage($ProspectStage)
    {
      $this->ProspectStage = $ProspectStage;
      return $this;
    }

    /**
     * @return int
     */
    public function getUniqueID()
    {
      return $this->UniqueID;
    }

    /**
     * @param int $UniqueID
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setUniqueID($UniqueID)
    {
      $this->UniqueID = $UniqueID;
      return $this;
    }

    /**
     * @return int
     */
    public function getMembershipIcon()
    {
      return $this->MembershipIcon;
    }

    /**
     * @param int $MembershipIcon
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setMembershipIcon($MembershipIcon)
    {
      $this->MembershipIcon = $MembershipIcon;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setID($ID)
    {
      $this->ID = $ID;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setFirstName($FirstName)
    {
      $this->FirstName = $FirstName;
      return $this;
    }

    /**
     * @return string
     */
    public function getMiddleName()
    {
      return $this->MiddleName;
    }

    /**
     * @param string $MiddleName
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setMiddleName($MiddleName)
    {
      $this->MiddleName = $MiddleName;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setLastName($LastName)
    {
      $this->LastName = $LastName;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setEmail($Email)
    {
      $this->Email = $Email;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getEmailOptIn()
    {
      return $this->EmailOptIn;
    }

    /**
     * @param boolean $EmailOptIn
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setEmailOptIn($EmailOptIn)
    {
      $this->EmailOptIn = $EmailOptIn;
      return $this;
    }

    /**
     * @return string
     */
    public function getAddressLine1()
    {
      return $this->AddressLine1;
    }

    /**
     * @param string $AddressLine1
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setAddressLine1($AddressLine1)
    {
      $this->AddressLine1 = $AddressLine1;
      return $this;
    }

    /**
     * @return string
     */
    public function getAddressLine2()
    {
      return $this->AddressLine2;
    }

    /**
     * @param string $AddressLine2
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setAddressLine2($AddressLine2)
    {
      $this->AddressLine2 = $AddressLine2;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setPostalCode($PostalCode)
    {
      $this->PostalCode = $PostalCode;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setCountry($Country)
    {
      $this->Country = $Country;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setWorkPhone($WorkPhone)
    {
      $this->WorkPhone = $WorkPhone;
      return $this;
    }

    /**
     * @return string
     */
    public function getWorkExtension()
    {
      return $this->WorkExtension;
    }

    /**
     * @param string $WorkExtension
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setWorkExtension($WorkExtension)
    {
      $this->WorkExtension = $WorkExtension;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getBirthDate()
    {
      if ($this->BirthDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->BirthDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $BirthDate
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setBirthDate(\DateTime $BirthDate = null)
    {
      if ($BirthDate == null) {
       $this->BirthDate = null;
      } else {
        $this->BirthDate = $BirthDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getFirstAppointmentDate()
    {
      if ($this->FirstAppointmentDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->FirstAppointmentDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $FirstAppointmentDate
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setFirstAppointmentDate(\DateTime $FirstAppointmentDate = null)
    {
      if ($FirstAppointmentDate == null) {
       $this->FirstAppointmentDate = null;
      } else {
        $this->FirstAppointmentDate = $FirstAppointmentDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return string
     */
    public function getReferredBy()
    {
      return $this->ReferredBy;
    }

    /**
     * @param string $ReferredBy
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setReferredBy($ReferredBy)
    {
      $this->ReferredBy = $ReferredBy;
      return $this;
    }

    /**
     * @return Location
     */
    public function getHomeLocation()
    {
      return $this->HomeLocation;
    }

    /**
     * @param Location $HomeLocation
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setHomeLocation($HomeLocation)
    {
      $this->HomeLocation = $HomeLocation;
      return $this;
    }

    /**
     * @return string
     */
    public function getYellowAlert()
    {
      return $this->YellowAlert;
    }

    /**
     * @param string $YellowAlert
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setYellowAlert($YellowAlert)
    {
      $this->YellowAlert = $YellowAlert;
      return $this;
    }

    /**
     * @return string
     */
    public function getRedAlert()
    {
      return $this->RedAlert;
    }

    /**
     * @param string $RedAlert
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setRedAlert($RedAlert)
    {
      $this->RedAlert = $RedAlert;
      return $this;
    }

    /**
     * @return string
     */
    public function getPhotoURL()
    {
      return $this->PhotoURL;
    }

    /**
     * @param string $PhotoURL
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setPhotoURL($PhotoURL)
    {
      $this->PhotoURL = $PhotoURL;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsProspect()
    {
      return $this->IsProspect;
    }

    /**
     * @param boolean $IsProspect
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setIsProspect($IsProspect)
    {
      $this->IsProspect = $IsProspect;
      return $this;
    }

    /**
     * @return string
     */
    public function getStatus()
    {
      return $this->Status;
    }

    /**
     * @param string $Status
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setStatus($Status)
    {
      $this->Status = $Status;
      return $this;
    }

    /**
     * @return int
     */
    public function getContactMethod()
    {
      return $this->ContactMethod;
    }

    /**
     * @param int $ContactMethod
     * @return \Famoser\MBOApiWrapper\AppointmentService\Client
     */
    public function setContactMethod($ContactMethod)
    {
      $this->ContactMethod = $ContactMethod;
      return $this;
    }

}
