<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectAggregateDataCSV
{

    /**
     * @var SelectAggregateDataCSVRequest $Request
     */
    protected $Request = null;

    /**
     * @param SelectAggregateDataCSVRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return SelectAggregateDataCSVRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param SelectAggregateDataCSVRequest $Request
     * @return \Famoser\MBOApiWrapper\DataService\SelectAggregateDataCSV
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
