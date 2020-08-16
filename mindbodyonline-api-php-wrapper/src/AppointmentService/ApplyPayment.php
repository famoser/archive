<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class ApplyPayment
{

    /**
     * @var AppointmentApplyPaymentRequest $Request
     */
    protected $Request = null;

    /**
     * @param AppointmentApplyPaymentRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return AppointmentApplyPaymentRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param AppointmentApplyPaymentRequest $Request
     * @return \Famoser\MBOApiWrapper\AppointmentService\ApplyPayment
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
