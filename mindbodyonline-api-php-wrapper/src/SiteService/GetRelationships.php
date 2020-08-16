<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetRelationships
{

    /**
     * @var GetRelationshipsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetRelationshipsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetRelationshipsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetRelationshipsRequest $Request
     * @return \Famoser\MBOApiWrapper\SiteService\GetRelationships
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
