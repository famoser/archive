<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetCoursesResponse
{

    /**
     * @var GetCoursesResult $GetCoursesResult
     */
    protected $GetCoursesResult = null;

    /**
     * @param GetCoursesResult $GetCoursesResult
     */
    public function __construct($GetCoursesResult)
    {
      $this->GetCoursesResult = $GetCoursesResult;
    }

    /**
     * @return GetCoursesResult
     */
    public function getGetCoursesResult()
    {
      return $this->GetCoursesResult;
    }

    /**
     * @param GetCoursesResult $GetCoursesResult
     * @return \Famoser\MBOApiWrapper\ClassService\GetCoursesResponse
     */
    public function setGetCoursesResult($GetCoursesResult)
    {
      $this->GetCoursesResult = $GetCoursesResult;
      return $this;
    }

}
