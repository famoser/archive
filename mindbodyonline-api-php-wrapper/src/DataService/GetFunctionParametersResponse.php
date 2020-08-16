<?php

namespace Famoser\MBOApiWrapper\DataService;

class GetFunctionParametersResponse
{

    /**
     * @var GetFunctionParametersResult $GetFunctionParametersResult
     */
    protected $GetFunctionParametersResult = null;

    /**
     * @param GetFunctionParametersResult $GetFunctionParametersResult
     */
    public function __construct($GetFunctionParametersResult)
    {
      $this->GetFunctionParametersResult = $GetFunctionParametersResult;
    }

    /**
     * @return GetFunctionParametersResult
     */
    public function getGetFunctionParametersResult()
    {
      return $this->GetFunctionParametersResult;
    }

    /**
     * @param GetFunctionParametersResult $GetFunctionParametersResult
     * @return \Famoser\MBOApiWrapper\DataService\GetFunctionParametersResponse
     */
    public function setGetFunctionParametersResult($GetFunctionParametersResult)
    {
      $this->GetFunctionParametersResult = $GetFunctionParametersResult;
      return $this;
    }

}
