<?php

namespace Famoser\MBOApiWrapper\ClassService;

class UpdateClientVisits
{

    /**
     * @var UpdateClientVisitsRequest $Request
     */
    protected $Request = null;

    /**
     * @param UpdateClientVisitsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return UpdateClientVisitsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param UpdateClientVisitsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClassService\UpdateClientVisits
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
