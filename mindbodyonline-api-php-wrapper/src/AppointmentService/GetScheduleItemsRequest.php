<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class GetScheduleItemsRequest extends MBRequest
{

    /**
     * @var ArrayOfInt $LocationIDs
     */
    protected $LocationIDs = null;

    /**
     * @var ArrayOfLong $StaffIDs
     */
    protected $StaffIDs = null;

    /**
     * @var \DateTime $StartDate
     */
    protected $StartDate = null;

    /**
     * @var \DateTime $EndDate
     */
    protected $EndDate = null;

    /**
     * @var boolean $IgnorePrepFinishTimes
     */
    protected $IgnorePrepFinishTimes = null;

    /**
     * @param boolean $IgnorePrepFinishTimes
     */
    public function __construct($IgnorePrepFinishTimes)
    {
      parent::__construct();
      $this->IgnorePrepFinishTimes = $IgnorePrepFinishTimes;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetScheduleItemsRequest
     */
    public function setLocationIDs($LocationIDs)
    {
      $this->LocationIDs = $LocationIDs;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetScheduleItemsRequest
     */
    public function setStaffIDs($StaffIDs)
    {
      $this->StaffIDs = $StaffIDs;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetScheduleItemsRequest
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetScheduleItemsRequest
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
     * @return boolean
     */
    public function getIgnorePrepFinishTimes()
    {
      return $this->IgnorePrepFinishTimes;
    }

    /**
     * @param boolean $IgnorePrepFinishTimes
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetScheduleItemsRequest
     */
    public function setIgnorePrepFinishTimes($IgnorePrepFinishTimes)
    {
      $this->IgnorePrepFinishTimes = $IgnorePrepFinishTimes;
      return $this;
    }

}
