<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientsResponse
{

    /**
     * @var GetClientsResult $GetClientsResult
     */
    protected $GetClientsResult = null;

    /**
     * @param GetClientsResult $GetClientsResult
     */
    public function __construct($GetClientsResult)
    {
      $this->GetClientsResult = $GetClientsResult;
    }

    /**
     * @return GetClientsResult
     */
    public function getGetClientsResult()
    {
      return $this->GetClientsResult;
    }

    /**
     * @param GetClientsResult $GetClientsResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientsResponse
     */
    public function setGetClientsResult($GetClientsResult)
    {
      $this->GetClientsResult = $GetClientsResult;
      return $this;
    }

}
