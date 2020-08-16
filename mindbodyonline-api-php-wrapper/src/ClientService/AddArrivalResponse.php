<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddArrivalResponse
{

    /**
     * @var AddArrivalResult $AddArrivalResult
     */
    protected $AddArrivalResult = null;

    /**
     * @param AddArrivalResult $AddArrivalResult
     */
    public function __construct($AddArrivalResult)
    {
      $this->AddArrivalResult = $AddArrivalResult;
    }

    /**
     * @return AddArrivalResult
     */
    public function getAddArrivalResult()
    {
      return $this->AddArrivalResult;
    }

    /**
     * @param AddArrivalResult $AddArrivalResult
     * @return \Famoser\MBOApiWrapper\ClientService\AddArrivalResponse
     */
    public function setAddArrivalResult($AddArrivalResult)
    {
      $this->AddArrivalResult = $AddArrivalResult;
      return $this;
    }

}
