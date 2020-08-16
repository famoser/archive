<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetResourceSchedule
{

    /**
     * @var GetResourceScheduleRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetResourceScheduleRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetResourceScheduleRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetResourceScheduleRequest $Request
     * @return \Famoser\MBOApiWrapper\SiteService\GetResourceSchedule
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
