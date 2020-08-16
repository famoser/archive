<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectAggregateDataXmlResponse
{

    /**
     * @var SelectAggregateDataXmlResult $SelectAggregateDataXmlResult
     */
    protected $SelectAggregateDataXmlResult = null;

    /**
     * @param SelectAggregateDataXmlResult $SelectAggregateDataXmlResult
     */
    public function __construct($SelectAggregateDataXmlResult)
    {
      $this->SelectAggregateDataXmlResult = $SelectAggregateDataXmlResult;
    }

    /**
     * @return SelectAggregateDataXmlResult
     */
    public function getSelectAggregateDataXmlResult()
    {
      return $this->SelectAggregateDataXmlResult;
    }

    /**
     * @param SelectAggregateDataXmlResult $SelectAggregateDataXmlResult
     * @return \Famoser\MBOApiWrapper\DataService\SelectAggregateDataXmlResponse
     */
    public function setSelectAggregateDataXmlResult($SelectAggregateDataXmlResult)
    {
      $this->SelectAggregateDataXmlResult = $SelectAggregateDataXmlResult;
      return $this;
    }

}
