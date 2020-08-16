<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class GetStaffAppointmentsResponse
{

    /**
     * @var GetStaffAppointmentsResult $GetStaffAppointmentsResult
     */
    protected $GetStaffAppointmentsResult = null;

    /**
     * @param GetStaffAppointmentsResult $GetStaffAppointmentsResult
     */
    public function __construct($GetStaffAppointmentsResult)
    {
      $this->GetStaffAppointmentsResult = $GetStaffAppointmentsResult;
    }

    /**
     * @return GetStaffAppointmentsResult
     */
    public function getGetStaffAppointmentsResult()
    {
      return $this->GetStaffAppointmentsResult;
    }

    /**
     * @param GetStaffAppointmentsResult $GetStaffAppointmentsResult
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetStaffAppointmentsResponse
     */
    public function setGetStaffAppointmentsResult($GetStaffAppointmentsResult)
    {
      $this->GetStaffAppointmentsResult = $GetStaffAppointmentsResult;
      return $this;
    }

}
