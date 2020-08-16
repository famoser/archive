<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class GetActiveSessionTimesResult extends MBResult
{

    /**
     * @var ArrayOfDateTime $Times
     */
    protected $Times = null;

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
     * @return ArrayOfDateTime
     */
    public function getTimes()
    {
      return $this->Times;
    }

    /**
     * @param ArrayOfDateTime $Times
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetActiveSessionTimesResult
     */
    public function setTimes($Times)
    {
      $this->Times = $Times;
      return $this;
    }

}
