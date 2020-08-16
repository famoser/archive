<?php

namespace Famoser\MBOApiWrapper\StaffService;

class AddOrUpdateStaffResult extends MBResult
{

    /**
     * @var ArrayOfStaff $Staff
     */
    protected $Staff = null;

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
     * @return ArrayOfStaff
     */
    public function getStaff()
    {
      return $this->Staff;
    }

    /**
     * @param ArrayOfStaff $Staff
     * @return \Famoser\MBOApiWrapper\StaffService\AddOrUpdateStaffResult
     */
    public function setStaff($Staff)
    {
      $this->Staff = $Staff;
      return $this;
    }

}
