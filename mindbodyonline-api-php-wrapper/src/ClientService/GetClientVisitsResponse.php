<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientVisitsResponse
{

    /**
     * @var GetClientVisitsResult $GetClientVisitsResult
     */
    protected $GetClientVisitsResult = null;

    /**
     * @param GetClientVisitsResult $GetClientVisitsResult
     */
    public function __construct($GetClientVisitsResult)
    {
      $this->GetClientVisitsResult = $GetClientVisitsResult;
    }

    /**
     * @return GetClientVisitsResult
     */
    public function getGetClientVisitsResult()
    {
      return $this->GetClientVisitsResult;
    }

    /**
     * @param GetClientVisitsResult $GetClientVisitsResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientVisitsResponse
     */
    public function setGetClientVisitsResult($GetClientVisitsResult)
    {
      $this->GetClientVisitsResult = $GetClientVisitsResult;
      return $this;
    }

}
