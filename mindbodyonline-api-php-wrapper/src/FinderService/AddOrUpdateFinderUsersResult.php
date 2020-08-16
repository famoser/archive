<?php

namespace Famoser\MBOApiWrapper\FinderService;

class AddOrUpdateFinderUsersResult extends MBResult
{

    /**
     * @var ArrayOfFinderUser $FinderUsers
     */
    protected $FinderUsers = null;

    /**
     * @param StatusCode $Status
     * @param int $ErrorCode
     * @param XMLDetailLevel $XMLDetail
     * @param int $ResultCount
     * @param int $CurrentPageIndex
     * @param int $TotalPageCount
     */
    public function __construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount)
    {
      parent::__construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount);
    }

    /**
     * @return ArrayOfFinderUser
     */
    public function getFinderUsers()
    {
      return $this->FinderUsers;
    }

    /**
     * @param ArrayOfFinderUser $FinderUsers
     * @return \Famoser\MBOApiWrapper\FinderService\AddOrUpdateFinderUsersResult
     */
    public function setFinderUsers($FinderUsers)
    {
      $this->FinderUsers = $FinderUsers;
      return $this;
    }

}
