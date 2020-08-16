<?php

namespace Famoser\MBOApiWrapper\StaffService;

class AddOrUpdateStaffResponse
{

    /**
     * @var AddOrUpdateStaffResult $AddOrUpdateStaffResult
     */
    protected $AddOrUpdateStaffResult = null;

    /**
     * @param AddOrUpdateStaffResult $AddOrUpdateStaffResult
     */
    public function __construct($AddOrUpdateStaffResult)
    {
      $this->AddOrUpdateStaffResult = $AddOrUpdateStaffResult;
    }

    /**
     * @return AddOrUpdateStaffResult
     */
    public function getAddOrUpdateStaffResult()
    {
      return $this->AddOrUpdateStaffResult;
    }

    /**
     * @param AddOrUpdateStaffResult $AddOrUpdateStaffResult
     * @return \Famoser\MBOApiWrapper\StaffService\AddOrUpdateStaffResponse
     */
    public function setAddOrUpdateStaffResult($AddOrUpdateStaffResult)
    {
      $this->AddOrUpdateStaffResult = $AddOrUpdateStaffResult;
      return $this;
    }

}
