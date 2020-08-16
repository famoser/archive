<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientIndexesResult extends MBResult
{

    /**
     * @var ArrayOfClientIndex $ClientIndexes
     */
    protected $ClientIndexes = null;

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
     * @return ArrayOfClientIndex
     */
    public function getClientIndexes()
    {
      return $this->ClientIndexes;
    }

    /**
     * @param ArrayOfClientIndex $ClientIndexes
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientIndexesResult
     */
    public function setClientIndexes($ClientIndexes)
    {
      $this->ClientIndexes = $ClientIndexes;
      return $this;
    }

}
