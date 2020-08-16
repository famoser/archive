<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class AddOrUpdateAppointmentsRequest extends MBRequest
{

    /**
     * @var string $UpdateAction
     */
    protected $UpdateAction = null;

    /**
     * @var boolean $Test
     */
    protected $Test = null;

    /**
     * @var boolean $SendEmail
     */
    protected $SendEmail = null;

    /**
     * @var boolean $ApplyPayment
     */
    protected $ApplyPayment = null;

    /**
     * @var ArrayOfAppointment $Appointments
     */
    protected $Appointments = null;

    /**
     * @var boolean $IgnoreDefaultSessionLength
     */
    protected $IgnoreDefaultSessionLength = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getUpdateAction()
    {
      return $this->UpdateAction;
    }

    /**
     * @param string $UpdateAction
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAppointmentsRequest
     */
    public function setUpdateAction($UpdateAction)
    {
      $this->UpdateAction = $UpdateAction;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getTest()
    {
      return $this->Test;
    }

    /**
     * @param boolean $Test
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAppointmentsRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSendEmail()
    {
      return $this->SendEmail;
    }

    /**
     * @param boolean $SendEmail
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAppointmentsRequest
     */
    public function setSendEmail($SendEmail)
    {
      $this->SendEmail = $SendEmail;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getApplyPayment()
    {
      return $this->ApplyPayment;
    }

    /**
     * @param boolean $ApplyPayment
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAppointmentsRequest
     */
    public function setApplyPayment($ApplyPayment)
    {
      $this->ApplyPayment = $ApplyPayment;
      return $this;
    }

    /**
     * @return ArrayOfAppointment
     */
    public function getAppointments()
    {
      return $this->Appointments;
    }

    /**
     * @param ArrayOfAppointment $Appointments
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAppointmentsRequest
     */
    public function setAppointments($Appointments)
    {
      $this->Appointments = $Appointments;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIgnoreDefaultSessionLength()
    {
      return $this->IgnoreDefaultSessionLength;
    }

    /**
     * @param boolean $IgnoreDefaultSessionLength
     * @return \Famoser\MBOApiWrapper\AppointmentService\AddOrUpdateAppointmentsRequest
     */
    public function setIgnoreDefaultSessionLength($IgnoreDefaultSessionLength)
    {
      $this->IgnoreDefaultSessionLength = $IgnoreDefaultSessionLength;
      return $this;
    }

}
