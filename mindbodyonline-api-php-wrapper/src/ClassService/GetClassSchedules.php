<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassSchedules
{

    /**
     * @var GetClassSchedulesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClassSchedulesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClassSchedulesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClassSchedulesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassSchedules
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
