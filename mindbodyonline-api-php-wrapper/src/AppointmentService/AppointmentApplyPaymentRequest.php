<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class AppointmentApplyPaymentRequest extends MBRequest
{

    /**
     * @var int $AppointmentID
     */
    protected $AppointmentID = null;

    /**
     * @var int $ClientServiceID
     */
    protected $ClientServiceID = null;

    /**
     * @param int $AppointmentID
     */
    public function __construct($AppointmentID)
    {
      parent::__construct();
      $this->AppointmentID = $AppointmentID;
    }

    /**
     * @return int
     */
    public function getAppointmentID()
    {
      return $this->AppointmentID;
    }

    /**
     * @param int $AppointmentID
     * @return \Famoser\MBOApiWrapper\AppointmentService\AppointmentApplyPaymentRequest
     */
    public function setAppointmentID($AppointmentID)
    {
      $this->AppointmentID = $AppointmentID;
      return $this;
    }

    /**
     * @return int
     */
    public function getClientServiceID()
    {
      return $this->ClientServiceID;
    }

    /**
     * @param int $ClientServiceID
     * @return \Famoser\MBOApiWrapper\AppointmentService\AppointmentApplyPaymentRequest
     */
    public function setClientServiceID($ClientServiceID)
    {
      $this->ClientServiceID = $ClientServiceID;
      return $this;
    }

}
