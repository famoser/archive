<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetWaitlistEntriesResponse
{

    /**
     * @var GetWaitlistEntriesResult $GetWaitlistEntriesResult
     */
    protected $GetWaitlistEntriesResult = null;

    /**
     * @param GetWaitlistEntriesResult $GetWaitlistEntriesResult
     */
    public function __construct($GetWaitlistEntriesResult)
    {
      $this->GetWaitlistEntriesResult = $GetWaitlistEntriesResult;
    }

    /**
     * @return GetWaitlistEntriesResult
     */
    public function getGetWaitlistEntriesResult()
    {
      return $this->GetWaitlistEntriesResult;
    }

    /**
     * @param GetWaitlistEntriesResult $GetWaitlistEntriesResult
     * @return \Famoser\MBOApiWrapper\ClassService\GetWaitlistEntriesResponse
     */
    public function setGetWaitlistEntriesResult($GetWaitlistEntriesResult)
    {
      $this->GetWaitlistEntriesResult = $GetWaitlistEntriesResult;
      return $this;
    }

}
