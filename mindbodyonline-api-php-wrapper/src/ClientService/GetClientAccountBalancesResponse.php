<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientAccountBalancesResponse
{

    /**
     * @var GetClientAccountBalancesResult $GetClientAccountBalancesResult
     */
    protected $GetClientAccountBalancesResult = null;

    /**
     * @param GetClientAccountBalancesResult $GetClientAccountBalancesResult
     */
    public function __construct($GetClientAccountBalancesResult)
    {
      $this->GetClientAccountBalancesResult = $GetClientAccountBalancesResult;
    }

    /**
     * @return GetClientAccountBalancesResult
     */
    public function getGetClientAccountBalancesResult()
    {
      return $this->GetClientAccountBalancesResult;
    }

    /**
     * @param GetClientAccountBalancesResult $GetClientAccountBalancesResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientAccountBalancesResponse
     */
    public function setGetClientAccountBalancesResult($GetClientAccountBalancesResult)
    {
      $this->GetClientAccountBalancesResult = $GetClientAccountBalancesResult;
      return $this;
    }

}
