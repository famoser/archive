<?php

namespace Famoser\MBOApiWrapper\DataService;

class GetSitesWithFunctionDataAccessResponse
{

    /**
     * @var GetSitesWithFunctionDataAccessResult $GetSitesWithFunctionDataAccessResult
     */
    protected $GetSitesWithFunctionDataAccessResult = null;

    /**
     * @param GetSitesWithFunctionDataAccessResult $GetSitesWithFunctionDataAccessResult
     */
    public function __construct($GetSitesWithFunctionDataAccessResult)
    {
      $this->GetSitesWithFunctionDataAccessResult = $GetSitesWithFunctionDataAccessResult;
    }

    /**
     * @return GetSitesWithFunctionDataAccessResult
     */
    public function getGetSitesWithFunctionDataAccessResult()
    {
      return $this->GetSitesWithFunctionDataAccessResult;
    }

    /**
     * @param GetSitesWithFunctionDataAccessResult $GetSitesWithFunctionDataAccessResult
     * @return \Famoser\MBOApiWrapper\DataService\GetSitesWithFunctionDataAccessResponse
     */
    public function setGetSitesWithFunctionDataAccessResult($GetSitesWithFunctionDataAccessResult)
    {
      $this->GetSitesWithFunctionDataAccessResult = $GetSitesWithFunctionDataAccessResult;
      return $this;
    }

}
