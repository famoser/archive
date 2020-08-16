<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetSessionTypesWithinRadiusResult extends MBResult
{

    /**
     * @var ArrayOfFinderAppointment $FinderAppointments
     */
    protected $FinderAppointments = null;

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
     * @return ArrayOfFinderAppointment
     */
    public function getFinderAppointments()
    {
      return $this->FinderAppointments;
    }

    /**
     * @param ArrayOfFinderAppointment $FinderAppointments
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusResult
     */
    public function setFinderAppointments($FinderAppointments)
    {
      $this->FinderAppointments = $FinderAppointments;
      return $this;
    }

}
