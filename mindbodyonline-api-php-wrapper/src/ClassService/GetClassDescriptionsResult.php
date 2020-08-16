<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassDescriptionsResult extends MBResult
{

    /**
     * @var ArrayOfClassDescription $ClassDescriptions
     */
    protected $ClassDescriptions = null;

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
     * @return ArrayOfClassDescription
     */
    public function getClassDescriptions()
    {
      return $this->ClassDescriptions;
    }

    /**
     * @param ArrayOfClassDescription $ClassDescriptions
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassDescriptionsResult
     */
    public function setClassDescriptions($ClassDescriptions)
    {
      $this->ClassDescriptions = $ClassDescriptions;
      return $this;
    }

}
