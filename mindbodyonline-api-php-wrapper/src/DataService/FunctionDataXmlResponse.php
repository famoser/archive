<?php

namespace Famoser\MBOApiWrapper\DataService;

class FunctionDataXmlResponse
{

    /**
     * @var SelectDataXmlResult $FunctionDataXmlResult
     */
    protected $FunctionDataXmlResult = null;

    /**
     * @param SelectDataXmlResult $FunctionDataXmlResult
     */
    public function __construct($FunctionDataXmlResult)
    {
      $this->FunctionDataXmlResult = $FunctionDataXmlResult;
    }

    /**
     * @return SelectDataXmlResult
     */
    public function getFunctionDataXmlResult()
    {
      return $this->FunctionDataXmlResult;
    }

    /**
     * @param SelectDataXmlResult $FunctionDataXmlResult
     * @return \Famoser\MBOApiWrapper\DataService\FunctionDataXmlResponse
     */
    public function setFunctionDataXmlResult($FunctionDataXmlResult)
    {
      $this->FunctionDataXmlResult = $FunctionDataXmlResult;
      return $this;
    }

}
