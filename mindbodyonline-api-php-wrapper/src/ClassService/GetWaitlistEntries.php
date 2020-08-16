<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetWaitlistEntries
{

    /**
     * @var GetWaitlistEntriesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetWaitlistEntriesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetWaitlistEntriesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetWaitlistEntriesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\GetWaitlistEntries
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
