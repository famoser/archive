<?php

namespace Famoser\MBOApiWrapper\ClassService;

class ClassSchedule extends MBObject
{

    /**
     * @var ArrayOfClass $Classes
     */
    protected $Classes = null;

    /**
     * @var ArrayOfClient $Clients
     */
    protected $Clients = null;

    /**
     * @var Course $Course
     */
    protected $Course = null;

    /**
     * @var int $SemesterID
     */
    protected $SemesterID = null;

    /**
     * @var boolean $IsAvailable
     */
    protected $IsAvailable = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var ClassDescription $ClassDescription
     */
    protected $ClassDescription = null;

    /**
     * @var boolean $DaySunday
     */
    protected $DaySunday = null;

    /**
     * @var boolean $DayMonday
     */
    protected $DayMonday = null;

    /**
     * @var boolean $DayTuesday
     */
    protected $DayTuesday = null;

    /**
     * @var boolean $DayWednesday
     */
    protected $DayWednesday = null;

    /**
     * @var boolean $DayThursday
     */
    protected $DayThursday = null;

    /**
     * @var boolean $DayFriday
     */
    protected $DayFriday = null;

    /**
     * @var boolean $DaySaturday
     */
    protected $DaySaturday = null;

    /**
     * @var boolean $AllowOpenEnrollment
     */
    protected $AllowOpenEnrollment = null;

    /**
     * @var boolean $AllowDateForwardEnrollment
     */
    protected $AllowDateForwardEnrollment = null;

    /**
     * @var \DateTime $StartTime
     */
    protected $StartTime = null;

    /**
     * @var \DateTime $EndTime
     */
    protected $EndTime = null;

    /**
     * @var \DateTime $StartDate
     */
    protected $StartDate = null;

    /**
     * @var \DateTime $EndDate
     */
    protected $EndDate = null;

    /**
     * @var Staff $Staff
     */
    protected $Staff = null;

    /**
     * @var Location $Location
     */
    protected $Location = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return ArrayOfClass
     */
    public function getClasses()
    {
      return $this->Classes;
    }

    /**
     * @param ArrayOfClass $Classes
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setClasses($Classes)
    {
      $this->Classes = $Classes;
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
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setClients($Clients)
    {
      $this->Clients = $Clients;
      return $this;
    }

    /**
     * @return Course
     */
    public function getCourse()
    {
      return $this->Course;
    }

    /**
     * @param Course $Course
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setCourse($Course)
    {
      $this->Course = $Course;
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
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setSemesterID($SemesterID)
    {
      $this->SemesterID = $SemesterID;
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
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setIsAvailable($IsAvailable)
    {
      $this->IsAvailable = $IsAvailable;
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
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
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
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setID($ID)
    {
      $this->ID = $ID;
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
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setClassDescription($ClassDescription)
    {
      $this->ClassDescription = $ClassDescription;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getDaySunday()
    {
      return $this->DaySunday;
    }

    /**
     * @param boolean $DaySunday
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setDaySunday($DaySunday)
    {
      $this->DaySunday = $DaySunday;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getDayMonday()
    {
      return $this->DayMonday;
    }

    /**
     * @param boolean $DayMonday
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setDayMonday($DayMonday)
    {
      $this->DayMonday = $DayMonday;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getDayTuesday()
    {
      return $this->DayTuesday;
    }

    /**
     * @param boolean $DayTuesday
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setDayTuesday($DayTuesday)
    {
      $this->DayTuesday = $DayTuesday;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getDayWednesday()
    {
      return $this->DayWednesday;
    }

    /**
     * @param boolean $DayWednesday
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setDayWednesday($DayWednesday)
    {
      $this->DayWednesday = $DayWednesday;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getDayThursday()
    {
      return $this->DayThursday;
    }

    /**
     * @param boolean $DayThursday
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setDayThursday($DayThursday)
    {
      $this->DayThursday = $DayThursday;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getDayFriday()
    {
      return $this->DayFriday;
    }

    /**
     * @param boolean $DayFriday
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setDayFriday($DayFriday)
    {
      $this->DayFriday = $DayFriday;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getDaySaturday()
    {
      return $this->DaySaturday;
    }

    /**
     * @param boolean $DaySaturday
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setDaySaturday($DaySaturday)
    {
      $this->DaySaturday = $DaySaturday;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getAllowOpenEnrollment()
    {
      return $this->AllowOpenEnrollment;
    }

    /**
     * @param boolean $AllowOpenEnrollment
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setAllowOpenEnrollment($AllowOpenEnrollment)
    {
      $this->AllowOpenEnrollment = $AllowOpenEnrollment;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getAllowDateForwardEnrollment()
    {
      return $this->AllowDateForwardEnrollment;
    }

    /**
     * @param boolean $AllowDateForwardEnrollment
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setAllowDateForwardEnrollment($AllowDateForwardEnrollment)
    {
      $this->AllowDateForwardEnrollment = $AllowDateForwardEnrollment;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getStartTime()
    {
      if ($this->StartTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->StartTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $StartTime
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setStartTime(\DateTime $StartTime = null)
    {
      if ($StartTime == null) {
       $this->StartTime = null;
      } else {
        $this->StartTime = $StartTime->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEndTime()
    {
      if ($this->EndTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EndTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EndTime
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setEndTime(\DateTime $EndTime = null)
    {
      if ($EndTime == null) {
       $this->EndTime = null;
      } else {
        $this->EndTime = $EndTime->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getStartDate()
    {
      if ($this->StartDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->StartDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $StartDate
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setStartDate(\DateTime $StartDate = null)
    {
      if ($StartDate == null) {
       $this->StartDate = null;
      } else {
        $this->StartDate = $StartDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEndDate()
    {
      if ($this->EndDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EndDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EndDate
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setEndDate(\DateTime $EndDate = null)
    {
      if ($EndDate == null) {
       $this->EndDate = null;
      } else {
        $this->EndDate = $EndDate->format(\DateTime::ATOM);
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
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setStaff($Staff)
    {
      $this->Staff = $Staff;
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
     * @return \Famoser\MBOApiWrapper\ClassService\ClassSchedule
     */
    public function setLocation($Location)
    {
      $this->Location = $Location;
      return $this;
    }

}
