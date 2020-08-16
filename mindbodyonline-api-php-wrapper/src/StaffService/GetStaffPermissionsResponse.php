<?php

namespace Famoser\MBOApiWrapper\StaffService;

class GetStaffPermissionsResponse
{

    /**
     * @var GetStaffPermissionsResult $GetStaffPermissionsResult
     */
    protected $GetStaffPermissionsResult = null;

    /**
     * @param GetStaffPermissionsResult $GetStaffPermissionsResult
     */
    public function __construct($GetStaffPermissionsResult)
    {
      $this->GetStaffPermissionsResult = $GetStaffPermissionsResult;
    }

    /**
     * @return GetStaffPermissionsResult
     */
    public function getGetStaffPermissionsResult()
    {
      return $this->GetStaffPermissionsResult;
    }

    /**
     * @param GetStaffPermissionsResult $GetStaffPermissionsResult
     * @return \Famoser\MBOApiWrapper\StaffService\GetStaffPermissionsResponse
     */
    public function setGetStaffPermissionsResult($GetStaffPermissionsResult)
    {
      $this->GetStaffPermissionsResult = $GetStaffPermissionsResult;
      return $this;
    }

}
