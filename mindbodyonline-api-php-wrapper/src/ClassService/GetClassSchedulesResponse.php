<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassSchedulesResponse
{

    /**
     * @var GetClassSchedulesResult $GetClassSchedulesResult
     */
    protected $GetClassSchedulesResult = null;

    /**
     * @param GetClassSchedulesResult $GetClassSchedulesResult
     */
    public function __construct($GetClassSchedulesResult)
    {
      $this->GetClassSchedulesResult = $GetClassSchedulesResult;
    }

    /**
     * @return GetClassSchedulesResult
     */
    public function getGetClassSchedulesResult()
    {
      return $this->GetClassSchedulesResult;
    }

    /**
     * @param GetClassSchedulesResult $GetClassSchedulesResult
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassSchedulesResponse
     */
    public function setGetClassSchedulesResult($GetClassSchedulesResult)
    {
      $this->GetClassSchedulesResult = $GetClassSchedulesResult;
      return $this;
    }

}
