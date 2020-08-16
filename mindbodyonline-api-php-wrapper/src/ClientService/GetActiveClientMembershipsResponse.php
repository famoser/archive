<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetActiveClientMembershipsResponse
{

    /**
     * @var GetActiveClientMembershipsResult $GetActiveClientMembershipsResult
     */
    protected $GetActiveClientMembershipsResult = null;

    /**
     * @param GetActiveClientMembershipsResult $GetActiveClientMembershipsResult
     */
    public function __construct($GetActiveClientMembershipsResult)
    {
      $this->GetActiveClientMembershipsResult = $GetActiveClientMembershipsResult;
    }

    /**
     * @return GetActiveClientMembershipsResult
     */
    public function getGetActiveClientMembershipsResult()
    {
      return $this->GetActiveClientMembershipsResult;
    }

    /**
     * @param GetActiveClientMembershipsResult $GetActiveClientMembershipsResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetActiveClientMembershipsResponse
     */
    public function setGetActiveClientMembershipsResult($GetActiveClientMembershipsResult)
    {
      $this->GetActiveClientMembershipsResult = $GetActiveClientMembershipsResult;
      return $this;
    }

}
