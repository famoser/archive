<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetProgramsRequest extends MBRequest
{

    /**
     * @var ScheduleType $ScheduleType
     */
    protected $ScheduleType = null;

    /**
     * @var boolean $OnlineOnly
     */
    protected $OnlineOnly = null;

    /**
     * @param ScheduleType $ScheduleType
     * @param boolean $OnlineOnly
     */
    public function __construct($ScheduleType, $OnlineOnly)
    {
      parent::__construct();
      $this->ScheduleType = $ScheduleType;
      $this->OnlineOnly = $OnlineOnly;
    }

    /**
     * @return ScheduleType
     */
    public function getScheduleType()
    {
      return $this->ScheduleType;
    }

    /**
     * @param ScheduleType $ScheduleType
     * @return \Famoser\MBOApiWrapper\SiteService\GetProgramsRequest
     */
    public function setScheduleType($ScheduleType)
    {
      $this->ScheduleType = $ScheduleType;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getOnlineOnly()
    {
      return $this->OnlineOnly;
    }

    /**
     * @param boolean $OnlineOnly
     * @return \Famoser\MBOApiWrapper\SiteService\GetProgramsRequest
     */
    public function setOnlineOnly($OnlineOnly)
    {
      $this->OnlineOnly = $OnlineOnly;
      return $this;
    }

}
