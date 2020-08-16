<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddOrUpdateContactLogsResponse
{

    /**
     * @var AddOrUpdateContactLogsResult $AddOrUpdateContactLogsResult
     */
    protected $AddOrUpdateContactLogsResult = null;

    /**
     * @param AddOrUpdateContactLogsResult $AddOrUpdateContactLogsResult
     */
    public function __construct($AddOrUpdateContactLogsResult)
    {
      $this->AddOrUpdateContactLogsResult = $AddOrUpdateContactLogsResult;
    }

    /**
     * @return AddOrUpdateContactLogsResult
     */
    public function getAddOrUpdateContactLogsResult()
    {
      return $this->AddOrUpdateContactLogsResult;
    }

    /**
     * @param AddOrUpdateContactLogsResult $AddOrUpdateContactLogsResult
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateContactLogsResponse
     */
    public function setAddOrUpdateContactLogsResult($AddOrUpdateContactLogsResult)
    {
      $this->AddOrUpdateContactLogsResult = $AddOrUpdateContactLogsResult;
      return $this;
    }

}
