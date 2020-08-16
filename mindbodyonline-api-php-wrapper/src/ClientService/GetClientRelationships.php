<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientRelationships
{

    /**
     * @var GetClientRelationshipsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetClientRelationshipsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetClientRelationshipsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetClientRelationshipsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientRelationships
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
