<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetFinderUserResult extends MBResult
{

    /**
     * @var FinderUser $FinderUser
     */
    protected $FinderUser = null;

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
     * @return FinderUser
     */
    public function getFinderUser()
    {
      return $this->FinderUser;
    }

    /**
     * @param FinderUser $FinderUser
     * @return \Famoser\MBOApiWrapper\FinderService\GetFinderUserResult
     */
    public function setFinderUser($FinderUser)
    {
      $this->FinderUser = $FinderUser;
      return $this;
    }

}
