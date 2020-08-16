<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetClassesWithinRadiusResult extends MBResult
{

    /**
     * @var ArrayOfFinderClass $FinderClasses
     */
    protected $FinderClasses = null;

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
     * @return ArrayOfFinderClass
     */
    public function getFinderClasses()
    {
      return $this->FinderClasses;
    }

    /**
     * @param ArrayOfFinderClass $FinderClasses
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusResult
     */
    public function setFinderClasses($FinderClasses)
    {
      $this->FinderClasses = $FinderClasses;
      return $this;
    }

}
