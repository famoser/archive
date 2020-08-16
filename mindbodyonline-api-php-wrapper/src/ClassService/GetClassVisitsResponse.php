<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassVisitsResponse
{

    /**
     * @var GetClassVisitsResult $GetClassVisitsResult
     */
    protected $GetClassVisitsResult = null;

    /**
     * @param GetClassVisitsResult $GetClassVisitsResult
     */
    public function __construct($GetClassVisitsResult)
    {
      $this->GetClassVisitsResult = $GetClassVisitsResult;
    }

    /**
     * @return GetClassVisitsResult
     */
    public function getGetClassVisitsResult()
    {
      return $this->GetClassVisitsResult;
    }

    /**
     * @param GetClassVisitsResult $GetClassVisitsResult
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassVisitsResponse
     */
    public function setGetClassVisitsResult($GetClassVisitsResult)
    {
      $this->GetClassVisitsResult = $GetClassVisitsResult;
      return $this;
    }

}
