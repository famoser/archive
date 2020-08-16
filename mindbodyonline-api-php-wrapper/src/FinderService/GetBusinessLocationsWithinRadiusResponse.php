<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetBusinessLocationsWithinRadiusResponse
{

    /**
     * @var GetBusinessLocationsWithinRadiusResult $GetBusinessLocationsWithinRadiusResult
     */
    protected $GetBusinessLocationsWithinRadiusResult = null;

    /**
     * @param GetBusinessLocationsWithinRadiusResult $GetBusinessLocationsWithinRadiusResult
     */
    public function __construct($GetBusinessLocationsWithinRadiusResult)
    {
      $this->GetBusinessLocationsWithinRadiusResult = $GetBusinessLocationsWithinRadiusResult;
    }

    /**
     * @return GetBusinessLocationsWithinRadiusResult
     */
    public function getGetBusinessLocationsWithinRadiusResult()
    {
      return $this->GetBusinessLocationsWithinRadiusResult;
    }

    /**
     * @param GetBusinessLocationsWithinRadiusResult $GetBusinessLocationsWithinRadiusResult
     * @return \Famoser\MBOApiWrapper\FinderService\GetBusinessLocationsWithinRadiusResponse
     */
    public function setGetBusinessLocationsWithinRadiusResult($GetBusinessLocationsWithinRadiusResult)
    {
      $this->GetBusinessLocationsWithinRadiusResult = $GetBusinessLocationsWithinRadiusResult;
      return $this;
    }

}
