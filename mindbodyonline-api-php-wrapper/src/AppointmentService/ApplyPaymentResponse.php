<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class ApplyPaymentResponse
{

    /**
     * @var AppointmentApplyPaymentResult $ApplyPaymentResult
     */
    protected $ApplyPaymentResult = null;

    /**
     * @param AppointmentApplyPaymentResult $ApplyPaymentResult
     */
    public function __construct($ApplyPaymentResult)
    {
      $this->ApplyPaymentResult = $ApplyPaymentResult;
    }

    /**
     * @return AppointmentApplyPaymentResult
     */
    public function getApplyPaymentResult()
    {
      return $this->ApplyPaymentResult;
    }

    /**
     * @param AppointmentApplyPaymentResult $ApplyPaymentResult
     * @return \Famoser\MBOApiWrapper\AppointmentService\ApplyPaymentResponse
     */
    public function setApplyPaymentResult($ApplyPaymentResult)
    {
      $this->ApplyPaymentResult = $ApplyPaymentResult;
      return $this;
    }

}
