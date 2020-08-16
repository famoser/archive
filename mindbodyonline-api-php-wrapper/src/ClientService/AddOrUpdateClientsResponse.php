<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddOrUpdateClientsResponse
{

    /**
     * @var AddOrUpdateClientsResult $AddOrUpdateClientsResult
     */
    protected $AddOrUpdateClientsResult = null;

    /**
     * @param AddOrUpdateClientsResult $AddOrUpdateClientsResult
     */
    public function __construct($AddOrUpdateClientsResult)
    {
      $this->AddOrUpdateClientsResult = $AddOrUpdateClientsResult;
    }

    /**
     * @return AddOrUpdateClientsResult
     */
    public function getAddOrUpdateClientsResult()
    {
      return $this->AddOrUpdateClientsResult;
    }

    /**
     * @param AddOrUpdateClientsResult $AddOrUpdateClientsResult
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateClientsResponse
     */
    public function setAddOrUpdateClientsResult($AddOrUpdateClientsResult)
    {
      $this->AddOrUpdateClientsResult = $AddOrUpdateClientsResult;
      return $this;
    }

}
