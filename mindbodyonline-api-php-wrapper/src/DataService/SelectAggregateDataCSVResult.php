<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectAggregateDataCSVResult extends MBResult
{

    /**
     * @var string $CSV
     */
    protected $CSV = null;

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
     * @return string
     */
    public function getCSV()
    {
      return $this->CSV;
    }

    /**
     * @param string $CSV
     * @return \Famoser\MBOApiWrapper\DataService\SelectAggregateDataCSVResult
     */
    public function setCSV($CSV)
    {
      $this->CSV = $CSV;
      return $this;
    }

}
