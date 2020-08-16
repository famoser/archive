<?php

namespace Famoser\MBOApiWrapper\StaffService;

class GetSalesRepsResponse
{

    /**
     * @var GetSalesRepsResult $GetSalesRepsResult
     */
    protected $GetSalesRepsResult = null;

    /**
     * @param GetSalesRepsResult $GetSalesRepsResult
     */
    public function __construct($GetSalesRepsResult)
    {
      $this->GetSalesRepsResult = $GetSalesRepsResult;
    }

    /**
     * @return GetSalesRepsResult
     */
    public function getGetSalesRepsResult()
    {
      return $this->GetSalesRepsResult;
    }

    /**
     * @param GetSalesRepsResult $GetSalesRepsResult
     * @return \Famoser\MBOApiWrapper\StaffService\GetSalesRepsResponse
     */
    public function setGetSalesRepsResult($GetSalesRepsResult)
    {
      $this->GetSalesRepsResult = $GetSalesRepsResult;
      return $this;
    }

}
