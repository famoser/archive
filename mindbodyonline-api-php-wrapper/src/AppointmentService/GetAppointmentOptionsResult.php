<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class GetAppointmentOptionsResult extends MBResult
{

    /**
     * @var ArrayOfOption $Options
     */
    protected $Options = null;

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
     * @return ArrayOfOption
     */
    public function getOptions()
    {
      return $this->Options;
    }

    /**
     * @param ArrayOfOption $Options
     * @return \Famoser\MBOApiWrapper\AppointmentService\GetAppointmentOptionsResult
     */
    public function setOptions($Options)
    {
      $this->Options = $Options;
      return $this;
    }

}
