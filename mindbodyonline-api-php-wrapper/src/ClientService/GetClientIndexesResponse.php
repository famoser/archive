<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientIndexesResponse
{

    /**
     * @var GetClientIndexesResult $GetClientIndexesResult
     */
    protected $GetClientIndexesResult = null;

    /**
     * @param GetClientIndexesResult $GetClientIndexesResult
     */
    public function __construct($GetClientIndexesResult)
    {
      $this->GetClientIndexesResult = $GetClientIndexesResult;
    }

    /**
     * @return GetClientIndexesResult
     */
    public function getGetClientIndexesResult()
    {
      return $this->GetClientIndexesResult;
    }

    /**
     * @param GetClientIndexesResult $GetClientIndexesResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientIndexesResponse
     */
    public function setGetClientIndexesResult($GetClientIndexesResult)
    {
      $this->GetClientIndexesResult = $GetClientIndexesResult;
      return $this;
    }

}
