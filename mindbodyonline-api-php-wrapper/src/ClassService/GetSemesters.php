<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetSemesters
{

    /**
     * @var GetSemestersRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetSemestersRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetSemestersRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetSemestersRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\GetSemesters
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
