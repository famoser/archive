<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetSessionTypesWithinRadiusResponse
{

    /**
     * @var GetSessionTypesWithinRadiusResult $GetSessionTypesWithinRadiusResult
     */
    protected $GetSessionTypesWithinRadiusResult = null;

    /**
     * @param GetSessionTypesWithinRadiusResult $GetSessionTypesWithinRadiusResult
     */
    public function __construct($GetSessionTypesWithinRadiusResult)
    {
      $this->GetSessionTypesWithinRadiusResult = $GetSessionTypesWithinRadiusResult;
    }

    /**
     * @return GetSessionTypesWithinRadiusResult
     */
    public function getGetSessionTypesWithinRadiusResult()
    {
      return $this->GetSessionTypesWithinRadiusResult;
    }

    /**
     * @param GetSessionTypesWithinRadiusResult $GetSessionTypesWithinRadiusResult
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusResponse
     */
    public function setGetSessionTypesWithinRadiusResult($GetSessionTypesWithinRadiusResult)
    {
      $this->GetSessionTypesWithinRadiusResult = $GetSessionTypesWithinRadiusResult;
      return $this;
    }

}
