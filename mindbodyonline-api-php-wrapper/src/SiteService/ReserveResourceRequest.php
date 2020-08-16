<?php

namespace Famoser\MBOApiWrapper\SiteService;

class ReserveResourceRequest extends MBRequest
{

    /**
     * @var int $ResourceID
     */
    protected $ResourceID = null;

    /**
     * @var int $ClientID
     */
    protected $ClientID = null;

    /**
     * @var int $StaffID
     */
    protected $StaffID = null;

    /**
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var \DateTime $EndDateTime
     */
    protected $EndDateTime = null;

    /**
     * @var int $LocationID
     */
    protected $LocationID = null;

    /**
     * @var int $ProgramID
     */
    protected $ProgramID = null;

    /**
     * @var string $Notes
     */
    protected $Notes = null;

    /**
     * @param int $ResourceID
     * @param int $ClientID
     * @param int $StaffID
     * @param \DateTime $StartDateTime
     * @param \DateTime $EndDateTime
     * @param int $LocationID
     * @param int $ProgramID
     */
    public function __construct($ResourceID, $ClientID, $StaffID, \DateTime $StartDateTime, \DateTime $EndDateTime, $LocationID, $ProgramID)
    {
      parent::__construct();
      $this->ResourceID = $ResourceID;
      $this->ClientID = $ClientID;
      $this->StaffID = $StaffID;
      $this->StartDateTime = $StartDateTime->format(\DateTime::ATOM);
      $this->EndDateTime = $EndDateTime->format(\DateTime::ATOM);
      $this->LocationID = $LocationID;
      $this->ProgramID = $ProgramID;
    }

    /**
     * @return int
     */
    public function getResourceID()
    {
      return $this->ResourceID;
    }

    /**
     * @param int $ResourceID
     * @return \Famoser\MBOApiWrapper\SiteService\ReserveResourceRequest
     */
    public function setResourceID($ResourceID)
    {
      $this->ResourceID = $ResourceID;
      return $this;
    }

    /**
     * @return int
     */
    public function getClientID()
    {
      return $this->ClientID;
    }

    /**
     * @param int $ClientID
     * @return \Famoser\MBOApiWrapper\SiteService\ReserveResourceRequest
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
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
     * @return \Famoser\MBOApiWrapper\SiteService\ReserveResourceRequest
     */
    public function setStaffID($StaffID)
    {
      $this->StaffID = $StaffID;
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
     * @return \Famoser\MBOApiWrapper\SiteService\ReserveResourceRequest
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
     * @return \Famoser\MBOApiWrapper\SiteService\ReserveResourceRequest
     */
    public function setEndDateTime(\DateTime $EndDateTime)
    {
      $this->EndDateTime = $EndDateTime->format(\DateTime::ATOM);
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
     * @return \Famoser\MBOApiWrapper\SiteService\ReserveResourceRequest
     */
    public function setLocationID($LocationID)
    {
      $this->LocationID = $LocationID;
      return $this;
    }

    /**
     * @return int
     */
    public function getProgramID()
    {
      return $this->ProgramID;
    }

    /**
     * @param int $ProgramID
     * @return \Famoser\MBOApiWrapper\SiteService\ReserveResourceRequest
     */
    public function setProgramID($ProgramID)
    {
      $this->ProgramID = $ProgramID;
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
     * @return \Famoser\MBOApiWrapper\SiteService\ReserveResourceRequest
     */
    public function setNotes($Notes)
    {
      $this->Notes = $Notes;
      return $this;
    }

}
