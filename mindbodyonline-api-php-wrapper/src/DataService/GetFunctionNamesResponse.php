<?php

namespace Famoser\MBOApiWrapper\DataService;

class GetFunctionNamesResponse
{

    /**
     * @var GetFunctionNamesResult $GetFunctionNamesResult
     */
    protected $GetFunctionNamesResult = null;

    /**
     * @param GetFunctionNamesResult $GetFunctionNamesResult
     */
    public function __construct($GetFunctionNamesResult)
    {
      $this->GetFunctionNamesResult = $GetFunctionNamesResult;
    }

    /**
     * @return GetFunctionNamesResult
     */
    public function getGetFunctionNamesResult()
    {
      return $this->GetFunctionNamesResult;
    }

    /**
     * @param GetFunctionNamesResult $GetFunctionNamesResult
     * @return \Famoser\MBOApiWrapper\DataService\GetFunctionNamesResponse
     */
    public function setGetFunctionNamesResult($GetFunctionNamesResult)
    {
      $this->GetFunctionNamesResult = $GetFunctionNamesResult;
      return $this;
    }

}
