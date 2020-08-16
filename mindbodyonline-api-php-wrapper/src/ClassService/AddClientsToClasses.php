<?php

namespace Famoser\MBOApiWrapper\ClassService;

class AddClientsToClasses
{

    /**
     * @var AddClientsToClassesRequest $Request
     */
    protected $Request = null;

    /**
     * @param AddClientsToClassesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return AddClientsToClassesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param AddClientsToClassesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToClasses
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
