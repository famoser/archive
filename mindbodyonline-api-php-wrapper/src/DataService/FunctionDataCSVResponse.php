<?php

namespace Famoser\MBOApiWrapper\DataService;

class FunctionDataCSVResponse
{

    /**
     * @var SelectDataCSVResult $FunctionDataCSVResult
     */
    protected $FunctionDataCSVResult = null;

    /**
     * @param SelectDataCSVResult $FunctionDataCSVResult
     */
    public function __construct($FunctionDataCSVResult)
    {
      $this->FunctionDataCSVResult = $FunctionDataCSVResult;
    }

    /**
     * @return SelectDataCSVResult
     */
    public function getFunctionDataCSVResult()
    {
      return $this->FunctionDataCSVResult;
    }

    /**
     * @param SelectDataCSVResult $FunctionDataCSVResult
     * @return \Famoser\MBOApiWrapper\DataService\FunctionDataCSVResponse
     */
    public function setFunctionDataCSVResult($FunctionDataCSVResult)
    {
      $this->FunctionDataCSVResult = $FunctionDataCSVResult;
      return $this;
    }

}
