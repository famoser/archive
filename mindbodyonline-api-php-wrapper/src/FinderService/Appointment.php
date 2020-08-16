<?php

namespace Famoser\MBOApiWrapper\FinderService;

class Appointment extends ScheduleItem
{

    /**
     * @var string $GenderPreference
     */
    protected $GenderPreference = null;

    /**
     * @var int $Duration
     */
    protected $Duration = null;

    /**
     * @var string $ProviderID
     */
    protected $ProviderID = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var AppointmentStatus $Status
     */
    protected $Status = null;

    /**
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var \DateTime $EndDateTime
     */
    protected $EndDateTime = null;

    /**
     * @var string $Notes
     */
    protected $Notes = null;

    /**
     * @var boolean $StaffRequested
     */
    protected $StaffRequested = null;

    /**
     * @var Program $Program
     */
    protected $Program = null;

    /**
     * @var SessionType $SessionType
     */
    protected $SessionType = null;

    /**
     * @var Location $Location
     */
    protected $Location = null;

    /**
     * @var Staff $Staff
     */
    protected $Staff = null;

    /**
     * @var Client $Client
     */
    protected $Client = null;

    /**
     * @var boolean $FirstAppointment
     */
    protected $FirstAppointment = null;

    /**
     * @var ClientService $ClientService
     */
    protected $ClientService = null;

    /**
     * @var ArrayOfResource $Resources
     */
    protected $Resources = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getGenderPreference()
    {
      return $this->GenderPreference;
    }

    /**
     * @param string $GenderPreference
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setGenderPreference($GenderPreference)
    {
      $this->GenderPreference = $GenderPreference;
      return $this;
    }

    /**
     * @return int
     */
    public function getDuration()
    {
      return $this->Duration;
    }

    /**
     * @param int $Duration
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setDuration($Duration)
    {
      $this->Duration = $Duration;
      return $this;
    }

    /**
     * @return string
     */
    public function getProviderID()
    {
      return $this->ProviderID;
    }

    /**
     * @param string $ProviderID
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setProviderID($ProviderID)
    {
      $this->ProviderID = $ProviderID;
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
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
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
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return AppointmentStatus
     */
    public function getStatus()
    {
      return $this->Status;
    }

    /**
     * @param AppointmentStatus $Status
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setStatus($Status)
    {
      $this->Status = $Status;
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
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
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
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
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
    public function getNotes()
    {
      return $this->Notes;
    }

    /**
     * @param string $Notes
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setNotes($Notes)
    {
      $this->Notes = $Notes;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getStaffRequested()
    {
      return $this->StaffRequested;
    }

    /**
     * @param boolean $StaffRequested
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setStaffRequested($StaffRequested)
    {
      $this->StaffRequested = $StaffRequested;
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
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setProgram($Program)
    {
      $this->Program = $Program;
      return $this;
    }

    /**
     * @return SessionType
     */
    public function getSessionType()
    {
      return $this->SessionType;
    }

    /**
     * @param SessionType $SessionType
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setSessionType($SessionType)
    {
      $this->SessionType = $SessionType;
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
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setLocation($Location)
    {
      $this->Location = $Location;
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
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setStaff($Staff)
    {
      $this->Staff = $Staff;
      return $this;
    }

    /**
     * @return Client
     */
    public function getClient()
    {
      return $this->Client;
    }

    /**
     * @param Client $Client
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setClient($Client)
    {
      $this->Client = $Client;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getFirstAppointment()
    {
      return $this->FirstAppointment;
    }

    /**
     * @param boolean $FirstAppointment
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setFirstAppointment($FirstAppointment)
    {
      $this->FirstAppointment = $FirstAppointment;
      return $this;
    }

    /**
     * @return ClientService
     */
    public function getClientService()
    {
      return $this->ClientService;
    }

    /**
     * @param ClientService $ClientService
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setClientService($ClientService)
    {
      $this->ClientService = $ClientService;
      return $this;
    }

    /**
     * @return ArrayOfResource
     */
    public function getResources()
    {
      return $this->Resources;
    }

    /**
     * @param ArrayOfResource $Resources
     * @return \Famoser\MBOApiWrapper\FinderService\Appointment
     */
    public function setResources($Resources)
    {
      $this->Resources = $Resources;
      return $this;
    }

}
