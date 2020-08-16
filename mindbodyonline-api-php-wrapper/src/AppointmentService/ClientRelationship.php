<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class ClientRelationship extends MBObject
{

    /**
     * @var Client $RelatedClient
     */
    protected $RelatedClient = null;

    /**
     * @var Relationship $Relationship
     */
    protected $Relationship = null;

    /**
     * @var string $RelationshipName
     */
    protected $RelationshipName = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return Client
     */
    public function getRelatedClient()
    {
      return $this->RelatedClient;
    }

    /**
     * @param Client $RelatedClient
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientRelationship
     */
    public function setRelatedClient($RelatedClient)
    {
      $this->RelatedClient = $RelatedClient;
      return $this;
    }

    /**
     * @return Relationship
     */
    public function getRelationship()
    {
      return $this->Relationship;
    }

    /**
     * @param Relationship $Relationship
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientRelationship
     */
    public function setRelationship($Relationship)
    {
      $this->Relationship = $Relationship;
      return $this;
    }

    /**
     * @return string
     */
    public function getRelationshipName()
    {
      return $this->RelationshipName;
    }

    /**
     * @param string $RelationshipName
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientRelationship
     */
    public function setRelationshipName($RelationshipName)
    {
      $this->RelationshipName = $RelationshipName;
      return $this;
    }

}
