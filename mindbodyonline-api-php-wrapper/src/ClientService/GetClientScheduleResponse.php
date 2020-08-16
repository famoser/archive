<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientScheduleResponse
{

    /**
     * @var GetClientScheduleResult $GetClientScheduleResult
     */
    protected $GetClientScheduleResult = null;

    /**
     * @param GetClientScheduleResult $GetClientScheduleResult
     */
    public function __construct($GetClientScheduleResult)
    {
      $this->GetClientScheduleResult = $GetClientScheduleResult;
    }

    /**
     * @return GetClientScheduleResult
     */
    public function getGetClientScheduleResult()
    {
      return $this->GetClientScheduleResult;
    }

    /**
     * @param GetClientScheduleResult $GetClientScheduleResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientScheduleResponse
     */
    public function setGetClientScheduleResult($GetClientScheduleResult)
    {
      $this->GetClientScheduleResult = $GetClientScheduleResult;
      return $this;
    }

}
