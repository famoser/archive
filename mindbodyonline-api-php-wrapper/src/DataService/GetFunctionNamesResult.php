<?php

namespace Famoser\MBOApiWrapper\DataService;

class GetFunctionNamesResult extends MBResult
{

    /**
     * @var ArrayOfApiFunction $Functions
     */
    protected $Functions = null;

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
     * @return ArrayOfApiFunction
     */
    public function getFunctions()
    {
      return $this->Functions;
    }

    /**
     * @param ArrayOfApiFunction $Functions
     * @return \Famoser\MBOApiWrapper\DataService\GetFunctionNamesResult
     */
    public function setFunctions($Functions)
    {
      $this->Functions = $Functions;
      return $this;
    }

}
