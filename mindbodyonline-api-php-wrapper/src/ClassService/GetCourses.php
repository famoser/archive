<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetCourses
{

    /**
     * @var GetCoursesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetCoursesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetCoursesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetCoursesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\GetCourses
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
