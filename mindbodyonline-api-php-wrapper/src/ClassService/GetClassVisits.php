<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassVisits
{

    /**
     * @var GetClassVisitsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClassVisitsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClassVisitsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClassVisitsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassVisits
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
