<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetClassesWithinRadius
{

    /**
     * @var GetClassesWithinRadiusRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClassesWithinRadiusRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClassesWithinRadiusRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClassesWithinRadiusRequest $Request
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadius
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
