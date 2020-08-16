<?php

namespace Famoser\MBOApiWrapper\DataService;

class GetFunctionParameters
{

    /**
     * @var GetFunctionParametersRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetFunctionParametersRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetFunctionParametersRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetFunctionParametersRequest $Request
     * @return \Famoser\MBOApiWrapper\DataService\GetFunctionParameters
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
