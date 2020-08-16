<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class Availability extends ScheduleItem
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var Staff $Staff
     */
    protected $Staff = null;

    /**
     * @var SessionType $SessionType
     */
    protected $SessionType = null;

    /**
     * @var ArrayOfProgram $Programs
     */
    protected $Programs = null;

    /**
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var \DateTime $EndDateTime
     */
    protected $EndDateTime = null;

    /**
     * @var \DateTime $BookableEndDateTime
     */
    protected $BookableEndDateTime = null;

    /**
     * @var Location $Location
     */
    protected $Location = null;

    /**
     * @param int $ID
     * @param \DateTime $StartDateTime
     * @param \DateTime $EndDateTime
     */
    public function __construct($ID, \DateTime $StartDateTime, \DateTime $EndDateTime)
    {
      parent::__construct();
      $this->ID = $ID;
      $this->StartDateTime = $StartDateTime->format(\DateTime::ATOM);
      $this->EndDateTime = $EndDateTime->format(\DateTime::ATOM);
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Availability
     */
    public function setID($ID)
    {
      $this->ID = $ID;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Availability
     */
    public function setStaff($Staff)
    {
      $this->Staff = $Staff;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Availability
     */
    public function setSessionType($SessionType)
    {
      $this->SessionType = $SessionType;
      return $this;
    }

    /**
     * @return ArrayOfProgram
     */
    public function getPrograms()
    {
      return $this->Programs;
    }

    /**
     * @param ArrayOfProgram $Programs
     * @return \Famoser\MBOApiWrapper\AppointmentService\Availability
     */
    public function setPrograms($Programs)
    {
      $this->Programs = $Programs;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Availability
     */
    public function setStartDateTime(\DateTime $StartDateTime)
    {
      $this->StartDateTime = $StartDateTime->format(\DateTime::ATOM);
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Availability
     */
    public function setEndDateTime(\DateTime $EndDateTime)
    {
      $this->EndDateTime = $EndDateTime->format(\DateTime::ATOM);
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getBookableEndDateTime()
    {
      if ($this->BookableEndDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->BookableEndDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $BookableEndDateTime
     * @return \Famoser\MBOApiWrapper\AppointmentService\Availability
     */
    public function setBookableEndDateTime(\DateTime $BookableEndDateTime = null)
    {
      if ($BookableEndDateTime == null) {
       $this->BookableEndDateTime = null;
      } else {
        $this->BookableEndDateTime = $BookableEndDateTime->format(\DateTime::ATOM);
      }
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\Availability
     */
    public function setLocation($Location)
    {
      $this->Location = $Location;
      return $this;
    }

}
