<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddClientRelationshipsRequest extends MBRequest
{

    /**
     * @var string $ClientID
     */
    protected $ClientID = null;

    /**
     * @var ArrayOfConsumerRelationship $ClientRelationships
     */
    protected $ClientRelationships = null;

    
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
     * @return \Famoser\MBOApiWrapper\ClientService\AddClientRelationshipsRequest
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
      return $this;
    }

    /**
     * @return ArrayOfConsumerRelationship
     */
    public function getClientRelationships()
    {
      return $this->ClientRelationships;
    }

    /**
     * @param ArrayOfConsumerRelationship $ClientRelationships
     * @return \Famoser\MBOApiWrapper\ClientService\AddClientRelationshipsRequest
     */
    public function setClientRelationships($ClientRelationships)
    {
      $this->ClientRelationships = $ClientRelationships;
      return $this;
    }

}
