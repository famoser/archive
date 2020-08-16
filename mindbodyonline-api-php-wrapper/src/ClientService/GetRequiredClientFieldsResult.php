<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetRequiredClientFieldsResult extends MBResult
{

    /**
     * @var ArrayOfString $RequiredClientFields
     */
    protected $RequiredClientFields = null;

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
     * @return ArrayOfString
     */
    public function getRequiredClientFields()
    {
      return $this->RequiredClientFields;
    }

    /**
     * @param ArrayOfString $RequiredClientFields
     * @return \Famoser\MBOApiWrapper\ClientService\GetRequiredClientFieldsResult
     */
    public function setRequiredClientFields($RequiredClientFields)
    {
      $this->RequiredClientFields = $RequiredClientFields;
      return $this;
    }

}
