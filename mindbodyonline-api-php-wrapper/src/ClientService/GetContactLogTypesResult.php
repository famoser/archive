<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetContactLogTypesResult extends MBResult
{

    /**
     * @var ArrayOfContactLogType $ContatctLogTypes
     */
    protected $ContatctLogTypes = null;

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
     * @return ArrayOfContactLogType
     */
    public function getContatctLogTypes()
    {
      return $this->ContatctLogTypes;
    }

    /**
     * @param ArrayOfContactLogType $ContatctLogTypes
     * @return \Famoser\MBOApiWrapper\ClientService\GetContactLogTypesResult
     */
    public function setContatctLogTypes($ContatctLogTypes)
    {
      $this->ContatctLogTypes = $ContatctLogTypes;
      return $this;
    }

}
