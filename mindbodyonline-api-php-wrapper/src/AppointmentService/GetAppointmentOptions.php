<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class GetAppointmentOptions
{

    /**
     * @var GetAppointmentOptionsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetAppointmentOptionsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetAppointmentOptionsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetAppointmentOptionsRequest $Request
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetAppointmentOptions
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
