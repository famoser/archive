<?php

namespace Famoser\MBOApiWrapper\DataService;

class RunFunctionForJob
{

    /**
     * @var RunFunctionForJobRequest $Request
     */
    protected $Request = null;

    /**
     * @param RunFunctionForJobRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return RunFunctionForJobRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param RunFunctionForJobRequest $Request
     * @return \Famoser\MBOApiWrapper\DataService\RunFunctionForJob
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
