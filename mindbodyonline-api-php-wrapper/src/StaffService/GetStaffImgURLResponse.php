<?php

namespace Famoser\MBOApiWrapper\StaffService;

class GetStaffImgURLResponse
{

    /**
     * @var GetStaffImgURLResult $GetStaffImgURLResult
     */
    protected $GetStaffImgURLResult = null;

    /**
     * @param GetStaffImgURLResult $GetStaffImgURLResult
     */
    public function __construct($GetStaffImgURLResult)
    {
      $this->GetStaffImgURLResult = $GetStaffImgURLResult;
    }

    /**
     * @return GetStaffImgURLResult
     */
    public function getGetStaffImgURLResult()
    {
      return $this->GetStaffImgURLResult;
    }

    /**
     * @param GetStaffImgURLResult $GetStaffImgURLResult
     * @return \Famoser\MBOApiWrapper\StaffService\GetStaffImgURLResponse
     */
    public function setGetStaffImgURLResult($GetStaffImgURLResult)
    {
      $this->GetStaffImgURLResult = $GetStaffImgURLResult;
      return $this;
    }

}
