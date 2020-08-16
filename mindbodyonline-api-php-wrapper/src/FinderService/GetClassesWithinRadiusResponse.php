<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetClassesWithinRadiusResponse
{

    /**
     * @var GetClassesWithinRadiusResult $GetClassesWithinRadiusResult
     */
    protected $GetClassesWithinRadiusResult = null;

    /**
     * @param GetClassesWithinRadiusResult $GetClassesWithinRadiusResult
     */
    public function __construct($GetClassesWithinRadiusResult)
    {
      $this->GetClassesWithinRadiusResult = $GetClassesWithinRadiusResult;
    }

    /**
     * @return GetClassesWithinRadiusResult
     */
    public function getGetClassesWithinRadiusResult()
    {
      return $this->GetClassesWithinRadiusResult;
    }

    /**
     * @param GetClassesWithinRadiusResult $GetClassesWithinRadiusResult
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusResponse
     */
    public function setGetClassesWithinRadiusResult($GetClassesWithinRadiusResult)
    {
      $this->GetClassesWithinRadiusResult = $GetClassesWithinRadiusResult;
      return $this;
    }

}
