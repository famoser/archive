<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientAccountBalances
{

    /**
     * @var GetClientAccountBalancesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClientAccountBalancesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClientAccountBalancesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClientAccountBalancesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientAccountBalances
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
