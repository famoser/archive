<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetWaitlistEntriesResult extends MBResult
{

    /**
     * @var ArrayOfWaitlistEntry $WaitlistEntries
     */
    protected $WaitlistEntries = null;

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
     * @return ArrayOfWaitlistEntry
     */
    public function getWaitlistEntries()
    {
      return $this->WaitlistEntries;
    }

    /**
     * @param ArrayOfWaitlistEntry $WaitlistEntries
     * @return \Famoser\MBOApiWrapper\ClassService\GetWaitlistEntriesResult
     */
    public function setWaitlistEntries($WaitlistEntries)
    {
      $this->WaitlistEntries = $WaitlistEntries;
      return $this;
    }

}
