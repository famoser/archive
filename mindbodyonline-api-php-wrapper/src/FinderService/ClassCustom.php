<?php

namespace Famoser\MBOApiWrapper\FinderService;

class ClassCustom extends MBObject
{

    /**
     * @var int $ClassScheduleID
     */
    protected $ClassScheduleID = null;

    /**
     * @var ArrayOfVisit $Visits
     */
    protected $Visits = null;

    /**
     * @var ArrayOfClient $Clients
     */
    protected $Clients = null;

    /**
     * @var Location $Location
     */
    protected $Location = null;

    /**
     * @var Resource $Resource
     */
    protected $Resource = null;

    /**
     * @var int $MaxCapacity
     */
    protected $MaxCapacity = null;

    /**
     * @var int $WebCapacity
     */
    protected $WebCapacity = null;

    /**
     * @var int $TotalBooked
     */
    protected $TotalBooked = null;

    /**
     * @var int $TotalBookedWaitlist
     */
    protected $TotalBookedWaitlist = null;

    /**
     * @var int $WebBooked
     */
    protected $WebBooked = null;

    /**
     * @var int $SemesterID
     */
    protected $SemesterID = null;

    /**
     * @var boolean $IsCanceled
     */
    protected $IsCanceled = null;

    /**
     * @var boolean $Substitute
     */
    protected $Substitute = null;

    /**
     * @var boolean $Active
     */
    protected $Active = null;

    /**
     * @var boolean $IsWaitlistAvailable
     */
    protected $IsWaitlistAvailable = null;

    /**
     * @var boolean $IsEnrolled
     */
    protected $IsEnrolled = null;

    /**
     * @var boolean $HideCancel
     */
    protected $HideCancel = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var boolean $IsAvailable
     */
    protected $IsAvailable = null;

    /**
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var \DateTime $EndDateTime
     */
    protected $EndDateTime = null;

    /**
     * @var ClassDescription $ClassDescription
     */
    protected $ClassDescription = null;

    /**
     * @var Staff $Staff
     */
    protected $Staff = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return int
     */
    public function getClassScheduleID()
    {
      return $this->ClassScheduleID;
    }

    /**
     * @param int $ClassScheduleID
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setClassScheduleID($ClassScheduleID)
    {
      $this->ClassScheduleID = $ClassScheduleID;
      return $this;
    }

    /**
     * @return ArrayOfVisit
     */
    public function getVisits()
    {
      return $this->Visits;
    }

    /**
     * @param ArrayOfVisit $Visits
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setVisits($Visits)
    {
      $this->Visits = $Visits;
      return $this;
    }

    /**
     * @return ArrayOfClient
     */
    public function getClients()
    {
      return $this->Clients;
    }

    /**
     * @param ArrayOfClient $Clients
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setClients($Clients)
    {
      $this->Clients = $Clients;
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
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setLocation($Location)
    {
      $this->Location = $Location;
      return $this;
    }

    /**
     * @return Resource
     */
    public function getResource()
    {
      return $this->Resource;
    }

    /**
     * @param Resource $Resource
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setResource($Resource)
    {
      $this->Resource = $Resource;
      return $this;
    }

    /**
     * @return int
     */
    public function getMaxCapacity()
    {
      return $this->MaxCapacity;
    }

    /**
     * @param int $MaxCapacity
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setMaxCapacity($MaxCapacity)
    {
      $this->MaxCapacity = $MaxCapacity;
      return $this;
    }

    /**
     * @return int
     */
    public function getWebCapacity()
    {
      return $this->WebCapacity;
    }

    /**
     * @param int $WebCapacity
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setWebCapacity($WebCapacity)
    {
      $this->WebCapacity = $WebCapacity;
      return $this;
    }

    /**
     * @return int
     */
    public function getTotalBooked()
    {
      return $this->TotalBooked;
    }

    /**
     * @param int $TotalBooked
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setTotalBooked($TotalBooked)
    {
      $this->TotalBooked = $TotalBooked;
      return $this;
    }

    /**
     * @return int
     */
    public function getTotalBookedWaitlist()
    {
      return $this->TotalBookedWaitlist;
    }

    /**
     * @param int $TotalBookedWaitlist
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setTotalBookedWaitlist($TotalBookedWaitlist)
    {
      $this->TotalBookedWaitlist = $TotalBookedWaitlist;
      return $this;
    }

    /**
     * @return int
     */
    public function getWebBooked()
    {
      return $this->WebBooked;
    }

    /**
     * @param int $WebBooked
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setWebBooked($WebBooked)
    {
      $this->WebBooked = $WebBooked;
      return $this;
    }

    /**
     * @return int
     */
    public function getSemesterID()
    {
      return $this->SemesterID;
    }

    /**
     * @param int $SemesterID
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setSemesterID($SemesterID)
    {
      $this->SemesterID = $SemesterID;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsCanceled()
    {
      return $this->IsCanceled;
    }

    /**
     * @param boolean $IsCanceled
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setIsCanceled($IsCanceled)
    {
      $this->IsCanceled = $IsCanceled;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSubstitute()
    {
      return $this->Substitute;
    }

    /**
     * @param boolean $Substitute
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setSubstitute($Substitute)
    {
      $this->Substitute = $Substitute;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getActive()
    {
      return $this->Active;
    }

    /**
     * @param boolean $Active
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setActive($Active)
    {
      $this->Active = $Active;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsWaitlistAvailable()
    {
      return $this->IsWaitlistAvailable;
    }

    /**
     * @param boolean $IsWaitlistAvailable
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setIsWaitlistAvailable($IsWaitlistAvailable)
    {
      $this->IsWaitlistAvailable = $IsWaitlistAvailable;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsEnrolled()
    {
      return $this->IsEnrolled;
    }

    /**
     * @param boolean $IsEnrolled
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setIsEnrolled($IsEnrolled)
    {
      $this->IsEnrolled = $IsEnrolled;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getHideCancel()
    {
      return $this->HideCancel;
    }

    /**
     * @param boolean $HideCancel
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setHideCancel($HideCancel)
    {
      $this->HideCancel = $HideCancel;
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
     * @return \Famoser\MBOApiWrapper\FinderService\Class
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
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsAvailable()
    {
      return $this->IsAvailable;
    }

    /**
     * @param boolean $IsAvailable
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setIsAvailable($IsAvailable)
    {
      $this->IsAvailable = $IsAvailable;
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
     * @return \Famoser\MBOApiWrapper\FinderService\Class
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
     * @return \Famoser\MBOApiWrapper\FinderService\Class
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
     * @return ClassDescription
     */
    public function getClassDescription()
    {
      return $this->ClassDescription;
    }

    /**
     * @param ClassDescription $ClassDescription
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setClassDescription($ClassDescription)
    {
      $this->ClassDescription = $ClassDescription;
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
     * @return \Famoser\MBOApiWrapper\FinderService\Class
     */
    public function setStaff($Staff)
    {
      $this->Staff = $Staff;
      return $this;
    }

}
