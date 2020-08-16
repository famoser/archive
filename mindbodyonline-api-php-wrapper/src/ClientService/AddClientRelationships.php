<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddClientRelationships
{

    /**
     * @var AddClientRelationshipsRequest $Request
     */
    protected $Request = null;

    /**
     * @param AddClientRelationshipsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return AddClientRelationshipsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param AddClientRelationshipsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\AddClientRelationships
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
