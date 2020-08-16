<?php

namespace Famoser\MBOApiWrapper\ClassService;

class RemoveClientsFromClasses
{

    /**
     * @var RemoveClientsFromClassesRequest $Request
     */
    protected $Request = null;

    /**
     * @param RemoveClientsFromClassesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return RemoveClientsFromClassesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param RemoveClientsFromClassesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\RemoveClientsFromClasses
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
