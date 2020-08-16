<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientSchedule
{

    /**
     * @var GetClientScheduleRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClientScheduleRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClientScheduleRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClientScheduleRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientSchedule
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
