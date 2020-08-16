<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassSchedulesResult extends MBResult
{

    /**
     * @var ArrayOfClassSchedule $ClassSchedules
     */
    protected $ClassSchedules = null;

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
     * @return ArrayOfClassSchedule
     */
    public function getClassSchedules()
    {
      return $this->ClassSchedules;
    }

    /**
     * @param ArrayOfClassSchedule $ClassSchedules
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassSchedulesResult
     */
    public function setClassSchedules($ClassSchedules)
    {
      $this->ClassSchedules = $ClassSchedules;
      return $this;
    }

}
