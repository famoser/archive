<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientContractsResponse
{

    /**
     * @var GetClientContractsResult $GetClientContractsResult
     */
    protected $GetClientContractsResult = null;

    /**
     * @param GetClientContractsResult $GetClientContractsResult
     */
    public function __construct($GetClientContractsResult)
    {
      $this->GetClientContractsResult = $GetClientContractsResult;
    }

    /**
     * @return GetClientContractsResult
     */
    public function getGetClientContractsResult()
    {
      return $this->GetClientContractsResult;
    }

    /**
     * @param GetClientContractsResult $GetClientContractsResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientContractsResponse
     */
    public function setGetClientContractsResult($GetClientContractsResult)
    {
      $this->GetClientContractsResult = $GetClientContractsResult;
      return $this;
    }

}
