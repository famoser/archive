<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class AppointmentApplyPaymentResult extends MBResult
{

    /**
     * @var int $VisitID
     */
    protected $VisitID = null;

    /**
     * @param StatusCode $Status
     * @param int $ErrorCode
     * @param XMLDetailLevel $XMLDetail
     * @param int $ResultCount
     * @param int $CurrentPageIndex
     * @param int $TotalPageCount
     * @param int $VisitID
     */
    public function __construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount, $VisitID)
    {
      parent::__construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount);
      $this->VisitID = $VisitID;
    }

    /**
     * @return int
     */
    public function getVisitID()
    {
      return $this->VisitID;
    }

    /**
     * @param int $VisitID
     * @return \Famoser\MBOApiWrapper\AppointmentService\AppointmentApplyPaymentResult
     */
    public function setVisitID($VisitID)
    {
      $this->VisitID = $VisitID;
      return $this;
    }

}
