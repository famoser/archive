<?php

namespace Famoser\MBOApiWrapper\FinderService;

class AddOrUpdateFinderUsersResponse
{

    /**
     * @var AddOrUpdateFinderUsersResult $AddOrUpdateFinderUsersResult
     */
    protected $AddOrUpdateFinderUsersResult = null;

    /**
     * @param AddOrUpdateFinderUsersResult $AddOrUpdateFinderUsersResult
     */
    public function __construct($AddOrUpdateFinderUsersResult)
    {
      $this->AddOrUpdateFinderUsersResult = $AddOrUpdateFinderUsersResult;
    }

    /**
     * @return AddOrUpdateFinderUsersResult
     */
    public function getAddOrUpdateFinderUsersResult()
    {
      return $this->AddOrUpdateFinderUsersResult;
    }

    /**
     * @param AddOrUpdateFinderUsersResult $AddOrUpdateFinderUsersResult
     * @return \Famoser\MBOApiWrapper\FinderService\AddOrUpdateFinderUsersResponse
     */
    public function setAddOrUpdateFinderUsersResult($AddOrUpdateFinderUsersResult)
    {
      $this->AddOrUpdateFinderUsersResult = $AddOrUpdateFinderUsersResult;
      return $this;
    }

}
