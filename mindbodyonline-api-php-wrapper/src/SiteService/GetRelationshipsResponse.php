<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetRelationshipsResponse
{

    /**
     * @var GetRelationshipsResult $GetRelationshipsResult
     */
    protected $GetRelationshipsResult = null;

    /**
     * @param GetRelationshipsResult $GetRelationshipsResult
     */
    public function __construct($GetRelationshipsResult)
    {
      $this->GetRelationshipsResult = $GetRelationshipsResult;
    }

    /**
     * @return GetRelationshipsResult
     */
    public function getGetRelationshipsResult()
    {
      return $this->GetRelationshipsResult;
    }

    /**
     * @param GetRelationshipsResult $GetRelationshipsResult
     * @return \Famoser\MBOApiWrapper\SiteService\GetRelationshipsResponse
     */
    public function setGetRelationshipsResult($GetRelationshipsResult)
    {
      $this->GetRelationshipsResult = $GetRelationshipsResult;
      return $this;
    }

}
