<?php

namespace Famoser\MBOApiWrapper\ClientService;

class DeleteClientRelationships
{

    /**
     * @var DeleteClientRelationshipsRequest $Request
     */
    protected $Request = null;

    /**
     * @param DeleteClientRelationshipsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return DeleteClientRelationshipsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param DeleteClientRelationshipsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\DeleteClientRelationships
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
