<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectDataXmlResult extends MBResult
{

    /**
     * @var RecordSet $Results
     */
    protected $Results = null;

    /**
     * @param StatusCode $Status
     * @param int $ErrorCode
     * @param XMLDetailLevel $XMLDetail
     * @param int $ResultCount
     * @param int $CurrentPageIndex
     * @param int $TotalPageCount
     */
    public function __construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount)
    {
      parent::__construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount);
    }

    /**
     * @return RecordSet
     */
    public function getResults()
    {
      return $this->Results;
    }

    /**
     * @param RecordSet $Results
     * @return \Famoser\MBOApiWrapper\DataService\SelectDataXmlResult
     */
    public function setResults($Results)
    {
      $this->Results = $Results;
      return $this;
    }

}
