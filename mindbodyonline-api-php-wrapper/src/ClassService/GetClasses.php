<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClasses
{

    /**
     * @var GetClassesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClassesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClassesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClassesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\GetClasses
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
