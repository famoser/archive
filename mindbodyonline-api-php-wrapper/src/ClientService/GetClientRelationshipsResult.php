<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientRelationshipsResult extends MBResult
{

    /**
     * @var ArrayOfConsumerRelationship $ClientRelationships
     */
    protected $ClientRelationships = null;

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
     * @return ArrayOfConsumerRelationship
     */
    public function getClientRelationships()
    {
      return $this->ClientRelationships;
    }

    /**
     * @param ArrayOfConsumerRelationship $ClientRelationships
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientRelationshipsResult
     */
    public function setClientRelationships($ClientRelationships)
    {
      $this->ClientRelationships = $ClientRelationships;
      return $this;
    }

}
