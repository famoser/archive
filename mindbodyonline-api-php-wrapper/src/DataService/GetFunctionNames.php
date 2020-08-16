<?php

namespace Famoser\MBOApiWrapper\DataService;

class GetFunctionNames
{

    /**
     * @var GetFunctionNamesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetFunctionNamesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetFunctionNamesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetFunctionNamesRequest $Request
     * @return \Famoser\MBOApiWrapper\DataService\GetFunctionNames
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
