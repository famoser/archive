<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientVisits
{

    /**
     * @var GetClientVisitsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClientVisitsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClientVisitsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClientVisitsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientVisits
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
