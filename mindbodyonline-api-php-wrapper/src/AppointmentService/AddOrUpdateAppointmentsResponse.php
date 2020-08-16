<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class AddOrUpdateAppointmentsResponse
{

    /**
     * @var AddOrUpdateAppointmentsResult $AddOrUpdateAppointmentsResult
     */
    protected $AddOrUpdateAppointmentsResult = null;

    /**
     * @param AddOrUpdateAppointmentsResult $AddOrUpdateAppointmentsResult
     */
    public function __construct($AddOrUpdateAppointmentsResult)
    {
      $this->AddOrUpdateAppointmentsResult = $AddOrUpdateAppointmentsResult;
    }

    /**
     * @return AddOrUpdateAppointmentsResult
     */
    public function getAddOrUpdateAppointmentsResult()
    {
      return $this->AddOrUpdateAppointmentsResult;
    }

    /**
     * @param AddOrUpdateAppointmentsResult $AddOrUpdateAppointmentsResult
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAppointmentsResponse
     */
    public function setAddOrUpdateAppointmentsResult($AddOrUpdateAppointmentsResult)
    {
      $this->AddOrUpdateAppointmentsResult = $AddOrUpdateAppointmentsResult;
      return $this;
    }

}
