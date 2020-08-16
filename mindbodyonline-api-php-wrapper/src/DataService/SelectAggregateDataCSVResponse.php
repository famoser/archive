<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectAggregateDataCSVResponse
{

    /**
     * @var SelectAggregateDataCSVResult $SelectAggregateDataCSVResult
     */
    protected $SelectAggregateDataCSVResult = null;

    /**
     * @param SelectAggregateDataCSVResult $SelectAggregateDataCSVResult
     */
    public function __construct($SelectAggregateDataCSVResult)
    {
      $this->SelectAggregateDataCSVResult = $SelectAggregateDataCSVResult;
    }

    /**
     * @return SelectAggregateDataCSVResult
     */
    public function getSelectAggregateDataCSVResult()
    {
      return $this->SelectAggregateDataCSVResult;
    }

    /**
     * @param SelectAggregateDataCSVResult $SelectAggregateDataCSVResult
     * @return \Famoser\MBOApiWrapper\DataService\SelectAggregateDataCSVResponse
     */
    public function setSelectAggregateDataCSVResult($SelectAggregateDataCSVResult)
    {
      $this->SelectAggregateDataCSVResult = $SelectAggregateDataCSVResult;
      return $this;
    }

}
