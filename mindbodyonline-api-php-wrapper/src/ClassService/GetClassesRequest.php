<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassesRequest extends MBRequest
{

    /**
     * @var ArrayOfInt $ClassDescriptionIDs
     */
    protected $ClassDescriptionIDs = null;

    /**
     * @var ArrayOfInt $ClassIDs
     */
    protected $ClassIDs = null;

    /**
     * @var ArrayOfLong $StaffIDs
     */
    protected $StaffIDs = null;

    /**
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var \DateTime $EndDateTime
     */
    protected $EndDateTime = null;

    /**
     * @var string $ClientID
     */
    protected $ClientID = null;

    /**
     * @var ArrayOfInt $ProgramIDs
     */
    protected $ProgramIDs = null;

    /**
     * @var ArrayOfInt $SessionTypeIDs
     */
    protected $SessionTypeIDs = null;

    /**
     * @var ArrayOfInt $LocationIDs
     */
    protected $LocationIDs = null;

    /**
     * @var ArrayOfInt $SemesterIDs
     */
    protected $SemesterIDs = null;

    /**
     * @var boolean $HideCanceledClasses
     */
    protected $HideCanceledClasses = null;

    /**
     * @var boolean $SchedulingWindow
     */
    protected $SchedulingWindow = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return ArrayOfInt
     */
    public function getClassDescriptionIDs()
    {
      return $this->ClassDescriptionIDs;
    }

    /**
     * @param ArrayOfInt $ClassDescriptionIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
     */
    public function setClassDescriptionIDs($ClassDescriptionIDs)
    {
      $this->ClassDescriptionIDs = $ClassDescriptionIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getClassIDs()
    {
      return $this->ClassIDs;
    }

    /**
     * @param ArrayOfInt $ClassIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
     */
    public function setClassIDs($ClassIDs)
    {
      $this->ClassIDs = $ClassIDs;
      return $this;
    }

    /**
     * @return ArrayOfLong
     */
    public function getStaffIDs()
    {
      return $this->StaffIDs;
    }

    /**
     * @param ArrayOfLong $StaffIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
     */
    public function setStaffIDs($StaffIDs)
    {
      $this->StaffIDs = $StaffIDs;
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
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
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
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
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
     * @return string
     */
    public function getClientID()
    {
      return $this->ClientID;
    }

    /**
     * @param string $ClientID
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getProgramIDs()
    {
      return $this->ProgramIDs;
    }

    /**
     * @param ArrayOfInt $ProgramIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
     */
    public function setProgramIDs($ProgramIDs)
    {
      $this->ProgramIDs = $ProgramIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getSessionTypeIDs()
    {
      return $this->SessionTypeIDs;
    }

    /**
     * @param ArrayOfInt $SessionTypeIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
     */
    public function setSessionTypeIDs($SessionTypeIDs)
    {
      $this->SessionTypeIDs = $SessionTypeIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getLocationIDs()
    {
      return $this->LocationIDs;
    }

    /**
     * @param ArrayOfInt $LocationIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
     */
    public function setLocationIDs($LocationIDs)
    {
      $this->LocationIDs = $LocationIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getSemesterIDs()
    {
      return $this->SemesterIDs;
    }

    /**
     * @param ArrayOfInt $SemesterIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
     */
    public function setSemesterIDs($SemesterIDs)
    {
      $this->SemesterIDs = $SemesterIDs;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getHideCanceledClasses()
    {
      return $this->HideCanceledClasses;
    }

    /**
     * @param boolean $HideCanceledClasses
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
     */
    public function setHideCanceledClasses($HideCanceledClasses)
    {
      $this->HideCanceledClasses = $HideCanceledClasses;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSchedulingWindow()
    {
      return $this->SchedulingWindow;
    }

    /**
     * @param boolean $SchedulingWindow
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesRequest
     */
    public function setSchedulingWindow($SchedulingWindow)
    {
      $this->SchedulingWindow = $SchedulingWindow;
      return $this;
    }

}
