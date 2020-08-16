<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientServicesResponse
{

    /**
     * @var GetClientServicesResult $GetClientServicesResult
     */
    protected $GetClientServicesResult = null;

    /**
     * @param GetClientServicesResult $GetClientServicesResult
     */
    public function __construct($GetClientServicesResult)
    {
      $this->GetClientServicesResult = $GetClientServicesResult;
    }

    /**
     * @return GetClientServicesResult
     */
    public function getGetClientServicesResult()
    {
      return $this->GetClientServicesResult;
    }

    /**
     * @param GetClientServicesResult $GetClientServicesResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientServicesResponse
     */
    public function setGetClientServicesResult($GetClientServicesResult)
    {
      $this->GetClientServicesResult = $GetClientServicesResult;
      return $this;
    }

}
