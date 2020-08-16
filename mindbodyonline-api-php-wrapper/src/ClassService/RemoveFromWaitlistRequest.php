<?php

namespace Famoser\MBOApiWrapper\ClassService;

class RemoveFromWaitlistRequest extends MBRequest
{

    /**
     * @var ArrayOfInt $WaitlistEntryIDs
     */
    protected $WaitlistEntryIDs = null;

    
    public function __construct()
    {
      parent::__construct();
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
     * @return \Famoser\MBOApiWrapper\ClassService\RemoveFromWaitlistRequest
     */
    public function setWaitlistEntryIDs($WaitlistEntryIDs)
    {
      $this->WaitlistEntryIDs = $WaitlistEntryIDs;
      return $this;
    }

}
