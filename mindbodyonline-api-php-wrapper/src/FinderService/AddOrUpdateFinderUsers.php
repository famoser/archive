<?php

namespace Famoser\MBOApiWrapper\FinderService;

class AddOrUpdateFinderUsers
{

    /**
     * @var AddOrUpdateFinderUsersRequest $Request
     */
    protected $Request = null;

    /**
     * @param AddOrUpdateFinderUsersRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return AddOrUpdateFinderUsersRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param AddOrUpdateFinderUsersRequest $Request
     * @return \Famoser\MBOApiWrapper\FinderService\AddOrUpdateFinderUsers
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
