<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddClientRelationshipsResponse
{

    /**
     * @var AddClientRelationshipsResult $AddClientRelationshipsResult
     */
    protected $AddClientRelationshipsResult = null;

    /**
     * @param AddClientRelationshipsResult $AddClientRelationshipsResult
     */
    public function __construct($AddClientRelationshipsResult)
    {
      $this->AddClientRelationshipsResult = $AddClientRelationshipsResult;
    }

    /**
     * @return AddClientRelationshipsResult
     */
    public function getAddClientRelationshipsResult()
    {
      return $this->AddClientRelationshipsResult;
    }

    /**
     * @param AddClientRelationshipsResult $AddClientRelationshipsResult
     * @return \Famoser\MBOApiWrapper\ClientService\AddClientRelationshipsResponse
     */
    public function setAddClientRelationshipsResult($AddClientRelationshipsResult)
    {
      $this->AddClientRelationshipsResult = $AddClientRelationshipsResult;
      return $this;
    }

}
