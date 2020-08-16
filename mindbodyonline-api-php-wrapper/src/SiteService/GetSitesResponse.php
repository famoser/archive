<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetSitesResponse
{

    /**
     * @var GetSitesResult $GetSitesResult
     */
    protected $GetSitesResult = null;

    /**
     * @param GetSitesResult $GetSitesResult
     */
    public function __construct($GetSitesResult)
    {
      $this->GetSitesResult = $GetSitesResult;
    }

    /**
     * @return GetSitesResult
     */
    public function getGetSitesResult()
    {
      return $this->GetSitesResult;
    }

    /**
     * @param GetSitesResult $GetSitesResult
     * @return \Famoser\MBOApiWrapper\SiteService\GetSitesResponse
     */
    public function setGetSitesResult($GetSitesResult)
    {
      $this->GetSitesResult = $GetSitesResult;
      return $this;
    }

}
