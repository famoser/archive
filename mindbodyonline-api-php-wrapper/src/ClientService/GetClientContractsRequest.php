<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientContractsRequest extends MBRequest
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
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientContractsRequest
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
      return $this;
    }

}
