<?php

namespace Famoser\MBOApiWrapper\StaffService;

class GetSalesReps
{

    /**
     * @var GetSalesRepsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetSalesRepsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetSalesRepsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetSalesRepsRequest $Request
     * @return \Famoser\MBOApiWrapper\StaffService\GetSalesReps
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
