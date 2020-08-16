<?php

namespace Famoser\MBOApiWrapper\ClientService;

class DeleteClientRelationshipsRequest extends MBRequest
{

    /**
     * @var string $ClientID
     */
    protected $ClientID = null;

    /**
     * @var ArrayOfInt $ClientRelationshipIDs
     */
    protected $ClientRelationshipIDs = null;

    
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
     * @return \Famoser\MBOApiWrapper\ClientService\DeleteClientRelationshipsRequest
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getClientRelationshipIDs()
    {
      return $this->ClientRelationshipIDs;
    }

    /**
     * @param ArrayOfInt $ClientRelationshipIDs
     * @return \Famoser\MBOApiWrapper\ClientService\DeleteClientRelationshipsRequest
     */
    public function setClientRelationshipIDs($ClientRelationshipIDs)
    {
      $this->ClientRelationshipIDs = $ClientRelationshipIDs;
      return $this;
    }

}
