<?php

namespace Famoser\MBOApiWrapper\ClientService;

class DeleteClientRelationshipsResponse
{

    /**
     * @var DeleteClientRelationshipsResult $DeleteClientRelationshipsResult
     */
    protected $DeleteClientRelationshipsResult = null;

    /**
     * @param DeleteClientRelationshipsResult $DeleteClientRelationshipsResult
     */
    public function __construct($DeleteClientRelationshipsResult)
    {
      $this->DeleteClientRelationshipsResult = $DeleteClientRelationshipsResult;
    }

    /**
     * @return DeleteClientRelationshipsResult
     */
    public function getDeleteClientRelationshipsResult()
    {
      return $this->DeleteClientRelationshipsResult;
    }

    /**
     * @param DeleteClientRelationshipsResult $DeleteClientRelationshipsResult
     * @return \Famoser\MBOApiWrapper\ClientService\DeleteClientRelationshipsResponse
     */
    public function setDeleteClientRelationshipsResult($DeleteClientRelationshipsResult)
    {
      $this->DeleteClientRelationshipsResult = $DeleteClientRelationshipsResult;
      return $this;
    }

}
