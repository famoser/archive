<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetSemestersResponse
{

    /**
     * @var GetSemestersResult $GetSemestersResult
     */
    protected $GetSemestersResult = null;

    /**
     * @param GetSemestersResult $GetSemestersResult
     */
    public function __construct($GetSemestersResult)
    {
      $this->GetSemestersResult = $GetSemestersResult;
    }

    /**
     * @return GetSemestersResult
     */
    public function getGetSemestersResult()
    {
      return $this->GetSemestersResult;
    }

    /**
     * @param GetSemestersResult $GetSemestersResult
     * @return \Famoser\MBOApiWrapper\ClassService\GetSemestersResponse
     */
    public function setGetSemestersResult($GetSemestersResult)
    {
      $this->GetSemestersResult = $GetSemestersResult;
      return $this;
    }

}
