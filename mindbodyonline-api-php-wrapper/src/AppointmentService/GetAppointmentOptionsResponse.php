<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class GetAppointmentOptionsResponse
{

    /**
     * @var GetAppointmentOptionsResult $GetAppointmentOptionsResult
     */
    protected $GetAppointmentOptionsResult = null;

    /**
     * @param GetAppointmentOptionsResult $GetAppointmentOptionsResult
     */
    public function __construct($GetAppointmentOptionsResult)
    {
      $this->GetAppointmentOptionsResult = $GetAppointmentOptionsResult;
    }

    /**
     * @return GetAppointmentOptionsResult
     */
    public function getGetAppointmentOptionsResult()
    {
      return $this->GetAppointmentOptionsResult;
    }

    /**
     * @param GetAppointmentOptionsResult $GetAppointmentOptionsResult
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetAppointmentOptionsResponse
     */
    public function setGetAppointmentOptionsResult($GetAppointmentOptionsResult)
    {
      $this->GetAppointmentOptionsResult = $GetAppointmentOptionsResult;
      return $this;
    }

}
