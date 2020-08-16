<?php

namespace Famoser\MBOApiWrapper\StaffService;

class GetStaffRequest extends MBRequest
{

    /**
     * @var ArrayOfLong $StaffIDs
     */
    protected $StaffIDs = null;

    /**
     * @var StaffCredentials $StaffCredentials
     */
    protected $StaffCredentials = null;

    /**
     * @var ArrayOfStaffFilter $Filters
     */
    protected $Filters = null;

    /**
     * @var int $SessionTypeID
     */
    protected $SessionTypeID = null;

    /**
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var int $LocationID
     */
    protected $LocationID = null;

    
    public function __construct()
    {
      parent::__construct();
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
     * @return \Famoser\MBOApiWrapper\StaffService\GetStaffRequest
     */
    public function setStaffIDs($StaffIDs)
    {
      $this->StaffIDs = $StaffIDs;
      return $this;
    }

    /**
     * @return StaffCredentials
     */
    public function getStaffCredentials()
    {
      return $this->StaffCredentials;
    }

    /**
     * @param StaffCredentials $StaffCredentials
     * @return \Famoser\MBOApiWrapper\StaffService\GetStaffRequest
     */
    public function setStaffCredentials($StaffCredentials)
    {
      $this->StaffCredentials = $StaffCredentials;
      return $this;
    }

    /**
     * @return ArrayOfStaffFilter
     */
    public function getFilters()
    {
      return $this->Filters;
    }

    /**
     * @param ArrayOfStaffFilter $Filters
     * @return \Famoser\MBOApiWrapper\StaffService\GetStaffRequest
     */
    public function setFilters($Filters)
    {
      $this->Filters = $Filters;
      return $this;
    }

    /**
     * @return int
     */
    public function getSessionTypeID()
    {
      return $this->SessionTypeID;
    }

    /**
     * @param int $SessionTypeID
     * @return \Famoser\MBOApiWrapper\StaffService\GetStaffRequest
     */
    public function setSessionTypeID($SessionTypeID)
    {
      $this->SessionTypeID = $SessionTypeID;
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
     * @return \Famoser\MBOApiWrapper\StaffService\GetStaffRequest
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
     * @return int
     */
    public function getLocationID()
    {
      return $this->LocationID;
    }

    /**
     * @param int $LocationID
     * @return \Famoser\MBOApiWrapper\StaffService\GetStaffRequest
     */
    public function setLocationID($LocationID)
    {
      $this->LocationID = $LocationID;
      return $this;
    }

}
