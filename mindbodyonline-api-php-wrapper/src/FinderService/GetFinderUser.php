<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetFinderUser
{

    /**
     * @var GetFinderUserRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetFinderUserRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetFinderUserRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetFinderUserRequest $Request
     * @return \Famoser\MBOApiWrapper\FinderService\GetFinderUser
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
