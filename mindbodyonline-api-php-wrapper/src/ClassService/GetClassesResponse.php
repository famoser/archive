<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassesResponse
{

    /**
     * @var GetClassesResult $GetClassesResult
     */
    protected $GetClassesResult = null;

    /**
     * @param GetClassesResult $GetClassesResult
     */
    public function __construct($GetClassesResult)
    {
      $this->GetClassesResult = $GetClassesResult;
    }

    /**
     * @return GetClassesResult
     */
    public function getGetClassesResult()
    {
      return $this->GetClassesResult;
    }

    /**
     * @param GetClassesResult $GetClassesResult
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassesResponse
     */
    public function setGetClassesResult($GetClassesResult)
    {
      $this->GetClassesResult = $GetClassesResult;
      return $this;
    }

}
