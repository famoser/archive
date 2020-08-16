<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetSessionTypesWithinRadius
{

    /**
     * @var GetSessionTypesWithinRadiusRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetSessionTypesWithinRadiusRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetSessionTypesWithinRadiusRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetSessionTypesWithinRadiusRequest $Request
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadius
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
