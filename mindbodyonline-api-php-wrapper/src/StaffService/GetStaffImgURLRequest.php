<?php

namespace Famoser\MBOApiWrapper\StaffService;

class GetStaffImgURLRequest extends MBRequest
{

    /**
     * @var int $StaffID
     */
    protected $StaffID = null;

    /**
     * @param int $StaffID
     */
    public function __construct($StaffID)
    {
      parent::__construct();
      $this->StaffID = $StaffID;
    }

    /**
     * @return int
     */
    public function getStaffID()
    {
      return $this->StaffID;
    }

    /**
     * @param int $StaffID
     * @return \Famoser\MBOApiWrapper\StaffService\GetStaffImgURLRequest
     */
    public function setStaffID($StaffID)
    {
      $this->StaffID = $StaffID;
      return $this;
    }

}
