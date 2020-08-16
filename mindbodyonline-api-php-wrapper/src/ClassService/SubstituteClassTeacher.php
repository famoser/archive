<?php

namespace Famoser\MBOApiWrapper\ClassService;

class SubstituteClassTeacher
{

    /**
     * @var SubstituteClassTeacherRequest $Request
     */
    protected $Request = null;

    /**
     * @param SubstituteClassTeacherRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return SubstituteClassTeacherRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param SubstituteClassTeacherRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\SubstituteClassTeacher
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
