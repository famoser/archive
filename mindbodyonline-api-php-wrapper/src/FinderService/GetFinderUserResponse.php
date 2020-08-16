<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetFinderUserResponse
{

    /**
     * @var GetFinderUserResult $GetFinderUserResult
     */
    protected $GetFinderUserResult = null;

    /**
     * @param GetFinderUserResult $GetFinderUserResult
     */
    public function __construct($GetFinderUserResult)
    {
      $this->GetFinderUserResult = $GetFinderUserResult;
    }

    /**
     * @return GetFinderUserResult
     */
    public function getGetFinderUserResult()
    {
      return $this->GetFinderUserResult;
    }

    /**
     * @param GetFinderUserResult $GetFinderUserResult
     * @return \Famoser\MBOApiWrapper\FinderService\GetFinderUserResponse
     */
    public function setGetFinderUserResult($GetFinderUserResult)
    {
      $this->GetFinderUserResult = $GetFinderUserResult;
      return $this;
    }

}
