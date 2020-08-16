<?php

namespace Famoser\MBOApiWrapper\ClassService;

class AddClientsToEnrollments
{

    /**
     * @var AddClientsToEnrollmentsRequest $Request
     */
    protected $Request = null;

    /**
     * @param AddClientsToEnrollmentsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return AddClientsToEnrollmentsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param AddClientsToEnrollmentsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollments
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
