<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetResourcesResponse
{

    /**
     * @var GetResourcesResult $GetResourcesResult
     */
    protected $GetResourcesResult = null;

    /**
     * @param GetResourcesResult $GetResourcesResult
     */
    public function __construct($GetResourcesResult)
    {
      $this->GetResourcesResult = $GetResourcesResult;
    }

    /**
     * @return GetResourcesResult
     */
    public function getGetResourcesResult()
    {
      return $this->GetResourcesResult;
    }

    /**
     * @param GetResourcesResult $GetResourcesResult
     * @return \Famoser\MBOApiWrapper\SiteService\GetResourcesResponse
     */
    public function setGetResourcesResult($GetResourcesResult)
    {
      $this->GetResourcesResult = $GetResourcesResult;
      return $this;
    }

}
