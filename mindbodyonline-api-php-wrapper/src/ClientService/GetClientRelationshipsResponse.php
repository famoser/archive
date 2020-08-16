<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientRelationshipsResponse
{

    /**
     * @var GetClientRelationshipsResult $GetClientRelationshipsResult
     */
    protected $GetClientRelationshipsResult = null;

    /**
     * @param GetClientRelationshipsResult $GetClientRelationshipsResult
     */
    public function __construct($GetClientRelationshipsResult)
    {
      $this->GetClientRelationshipsResult = $GetClientRelationshipsResult;
    }

    /**
     * @return GetClientRelationshipsResult
     */
    public function getGetClientRelationshipsResult()
    {
      return $this->GetClientRelationshipsResult;
    }

    /**
     * @param GetClientRelationshipsResult $GetClientRelationshipsResult
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientRelationshipsResponse
     */
    public function setGetClientRelationshipsResult($GetClientRelationshipsResult)
    {
      $this->GetClientRelationshipsResult = $GetClientRelationshipsResult;
      return $this;
    }

}
