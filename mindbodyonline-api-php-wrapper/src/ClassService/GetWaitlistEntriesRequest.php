<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetWaitlistEntriesRequest extends MBRequest
{

    /**
     * @var ArrayOfInt $ClassScheduleIDs
     */
    protected $ClassScheduleIDs = null;

    /**
     * @var ArrayOfString $ClientIDs
     */
    protected $ClientIDs = null;

    /**
     * @var ArrayOfInt $WaitlistEntryIDs
     */
    protected $WaitlistEntryIDs = null;

    /**
     * @var ArrayOfInt $ClassIDs
     */
    protected $ClassIDs = null;

    /**
     * @var boolean $HidePastEntries
     */
    protected $HidePastEntries = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return ArrayOfInt
     */
    public function getClassScheduleIDs()
    {
      return $this->ClassScheduleIDs;
    }

    /**
     * @param ArrayOfInt $ClassScheduleIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetWaitlistEntriesRequest
     */
    public function setClassScheduleIDs($ClassScheduleIDs)
    {
      $this->ClassScheduleIDs = $ClassScheduleIDs;
      return $this;
    }

    /**
     * @return ArrayOfString
     */
    public function getClientIDs()
    {
      return $this->ClientIDs;
    }

    /**
     * @param ArrayOfString $ClientIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetWaitlistEntriesRequest
     */
    public function setClientIDs($ClientIDs)
    {
      $this->ClientIDs = $ClientIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getWaitlistEntryIDs()
    {
      return $this->WaitlistEntryIDs;
    }

    /**
     * @param ArrayOfInt $WaitlistEntryIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetWaitlistEntriesRequest
     */
    public function setWaitlistEntryIDs($WaitlistEntryIDs)
    {
      $this->WaitlistEntryIDs = $WaitlistEntryIDs;
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
     * @return \Famoser\MBOApiWrapper\ClassService\GetWaitlistEntriesRequest
     */
    public function setClassIDs($ClassIDs)
    {
      $this->ClassIDs = $ClassIDs;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getHidePastEntries()
    {
      return $this->HidePastEntries;
    }

    /**
     * @param boolean $HidePastEntries
     * @return \Famoser\MBOApiWrapper\ClassService\GetWaitlistEntriesRequest
     */
    public function setHidePastEntries($HidePastEntries)
    {
      $this->HidePastEntries = $HidePastEntries;
      return $this;
    }

}
