<?php

namespace Famoser\MBOApiWrapper\DataService;

class FunctionAggregateDataXmlResponse
{

    /**
     * @var SelectDataXmlResult $FunctionAggregateDataXmlResult
     */
    protected $FunctionAggregateDataXmlResult = null;

    /**
     * @param SelectDataXmlResult $FunctionAggregateDataXmlResult
     */
    public function __construct($FunctionAggregateDataXmlResult)
    {
      $this->FunctionAggregateDataXmlResult = $FunctionAggregateDataXmlResult;
    }

    /**
     * @return SelectDataXmlResult
     */
    public function getFunctionAggregateDataXmlResult()
    {
      return $this->FunctionAggregateDataXmlResult;
    }

    /**
     * @param SelectDataXmlResult $FunctionAggregateDataXmlResult
     * @return \Famoser\MBOApiWrapper\DataService\FunctionAggregateDataXmlResponse
     */
    public function setFunctionAggregateDataXmlResult($FunctionAggregateDataXmlResult)
    {
      $this->FunctionAggregateDataXmlResult = $FunctionAggregateDataXmlResult;
      return $this;
    }

}
