<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectDataCSVResponse
{

    /**
     * @var SelectDataCSVResult $SelectDataCSVResult
     */
    protected $SelectDataCSVResult = null;

    /**
     * @param SelectDataCSVResult $SelectDataCSVResult
     */
    public function __construct($SelectDataCSVResult)
    {
      $this->SelectDataCSVResult = $SelectDataCSVResult;
    }

    /**
     * @return SelectDataCSVResult
     */
    public function getSelectDataCSVResult()
    {
      return $this->SelectDataCSVResult;
    }

    /**
     * @param SelectDataCSVResult $SelectDataCSVResult
     * @return \Famoser\MBOApiWrapper\DataService\SelectDataCSVResponse
     */
    public function setSelectDataCSVResult($SelectDataCSVResult)
    {
      $this->SelectDataCSVResult = $SelectDataCSVResult;
      return $this;
    }

}
