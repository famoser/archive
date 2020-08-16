<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetCustomClientFieldsResponse
{

    /**
     * @var GetCustomClientFieldsResult $GetCustomClientFieldsResult
     */
    protected $GetCustomClientFieldsResult = null;

    /**
     * @param GetCustomClientFieldsResult $GetCustomClientFieldsResult
     */
    public function __construct($GetCustomClientFieldsResult)
    {
      $this->GetCustomClientFieldsResult = $GetCustomClientFieldsResult;
    }

    /**
     * @return GetCustomClientFieldsResult
     */
    public function getGetCustomClientFieldsResult()
    {
      return $this->GetCustomClientFieldsResult;
    }

    /**
     * @param GetCustomClientFieldsResult $GetCustomClientFieldsResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetCustomClientFieldsResponse
     */
    public function setGetCustomClientFieldsResult($GetCustomClientFieldsResult)
    {
      $this->GetCustomClientFieldsResult = $GetCustomClientFieldsResult;
      return $this;
    }

}
