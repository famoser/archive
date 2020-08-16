<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class AddOrUpdateAvailabilitiesRequest extends MBRequest
{

    /**
     * @var string $UpdateAction
     */
    protected $UpdateAction = null;

    /**
     * @var boolean $Test
     */
    protected $Test = null;

    /**
     * @var ArrayOfInt $AvailabilityIDs
     */
    protected $AvailabilityIDs = null;

    /**
     * @var int $LocationID
     */
    protected $LocationID = null;

    /**
     * @var ArrayOfLong $StaffIDs
     */
    protected $StaffIDs = null;

    /**
     * @var ArrayOfInt $ProgramIDs
     */
    protected $ProgramIDs = null;

    /**
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var \DateTime $EndDateTime
     */
    protected $EndDateTime = null;

    /**
     * @var ArrayOfDayOfWeek $DaysOfWeek
     */
    protected $DaysOfWeek = null;

    /**
     * @var string $UnavailableDescription
     */
    protected $UnavailableDescription = null;

    /**
     * @var boolean $IsUnavailable
     */
    protected $IsUnavailable = null;

    /**
     * @var AvailabilityDisplay $PublicDisplay
     */
    protected $PublicDisplay = null;

    /**
     * @var string $Execute
     */
    protected $Execute = null;

    /**
     * @param boolean $IsUnavailable
     */
    public function __construct($IsUnavailable)
    {
      parent::__construct();
      $this->IsUnavailable = $IsUnavailable;
    }

    /**
     * @return string
     */
    public function getUpdateAction()
    {
      return $this->UpdateAction;
    }

    /**
     * @param string $UpdateAction
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setUpdateAction($UpdateAction)
    {
      $this->UpdateAction = $UpdateAction;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getAvailabilityIDs()
    {
      return $this->AvailabilityIDs;
    }

    /**
     * @param ArrayOfInt $AvailabilityIDs
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setAvailabilityIDs($AvailabilityIDs)
    {
      $this->AvailabilityIDs = $AvailabilityIDs;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setLocationID($LocationID)
    {
      $this->LocationID = $LocationID;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setStaffIDs($StaffIDs)
    {
      $this->StaffIDs = $StaffIDs;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setProgramIDs($ProgramIDs)
    {
      $this->ProgramIDs = $ProgramIDs;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
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
     * @return ArrayOfDayOfWeek
     */
    public function getDaysOfWeek()
    {
      return $this->DaysOfWeek;
    }

    /**
     * @param ArrayOfDayOfWeek $DaysOfWeek
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setDaysOfWeek($DaysOfWeek)
    {
      $this->DaysOfWeek = $DaysOfWeek;
      return $this;
    }

    /**
     * @return string
     */
    public function getUnavailableDescription()
    {
      return $this->UnavailableDescription;
    }

    /**
     * @param string $UnavailableDescription
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setUnavailableDescription($UnavailableDescription)
    {
      $this->UnavailableDescription = $UnavailableDescription;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsUnavailable()
    {
      return $this->IsUnavailable;
    }

    /**
     * @param boolean $IsUnavailable
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setIsUnavailable($IsUnavailable)
    {
      $this->IsUnavailable = $IsUnavailable;
      return $this;
    }

    /**
     * @return AvailabilityDisplay
     */
    public function getPublicDisplay()
    {
      return $this->PublicDisplay;
    }

    /**
     * @param AvailabilityDisplay $PublicDisplay
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setPublicDisplay($PublicDisplay)
    {
      $this->PublicDisplay = $PublicDisplay;
      return $this;
    }

    /**
     * @return string
     */
    public function getExecute()
    {
      return $this->Execute;
    }

    /**
     * @param string $Execute
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilitiesRequest
     */
    public function setExecute($Execute)
    {
      $this->Execute = $Execute;
      return $this;
    }

}
