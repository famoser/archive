<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientRelationshipsRequest extends MBRequest
{

    /**
     * @var string $ClientID
     */
    protected $ClientID = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getClientID()
    {
      return $this->ClientID;
    }

    /**
     * @param string $ClientID
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientRelationshipsRequest
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
      return $this;
    }

}
