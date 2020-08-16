<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectDataCSV
{

    /**
     * @var SelectDataCSVRequest $Request
     */
    protected $Request = null;

    /**
     * @param SelectDataCSVRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return SelectDataCSVRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param SelectDataCSVRequest $Request
     * @return \Famoser\MBOApiWrapper\DataService\SelectDataCSV
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
