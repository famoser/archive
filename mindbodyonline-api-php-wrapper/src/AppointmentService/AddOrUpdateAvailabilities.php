<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class AddOrUpdateAvailabilities
{

    /**
     * @var AddOrUpdateAvailabilitiesRequest $Request
     */
    protected $Request = null;

    /**
     * @param AddOrUpdateAvailabilitiesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return AddOrUpdateAvailabilitiesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param AddOrUpdateAvailabilitiesRequest $Request
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAvailabilities
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
