<?php

namespace Famoser\MBOApiWrapper\ClientService;

class ConsumerRelationship
{

    /**
     * @var string $RelatedClientID
     */
    protected $RelatedClientID = null;

    /**
     * @var int $RelationshipID
     */
    protected $RelationshipID = null;

    /**
     * @var string $RelationshipName
     */
    protected $RelationshipName = null;

    /**
     * @var int $ClientRelationshipID
     */
    protected $ClientRelationshipID = null;

    /**
     * @var ArrayOfString $Messages
     */
    protected $Messages = null;

    
    public function __construct()
    {
    
    }

    /**
     * @return string
     */
    public function getRelatedClientID()
    {
      return $this->RelatedClientID;
    }

    /**
     * @param string $RelatedClientID
     * @return \Famoser\MBOApiWrapper\ClientService\ConsumerRelationship
     */
    public function setRelatedClientID($RelatedClientID)
    {
      $this->RelatedClientID = $RelatedClientID;
      return $this;
    }

    /**
     * @return int
     */
    public function getRelationshipID()
    {
      return $this->RelationshipID;
    }

    /**
     * @param int $RelationshipID
     * @return \Famoser\MBOApiWrapper\ClientService\ConsumerRelationship
     */
    public function setRelationshipID($RelationshipID)
    {
      $this->RelationshipID = $RelationshipID;
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
     * @return \Famoser\MBOApiWrapper\ClientService\ConsumerRelationship
     */
    public function setRelationshipName($RelationshipName)
    {
      $this->RelationshipName = $RelationshipName;
      return $this;
    }

    /**
     * @return int
     */
    public function getClientRelationshipID()
    {
      return $this->ClientRelationshipID;
    }

    /**
     * @param int $ClientRelationshipID
     * @return \Famoser\MBOApiWrapper\ClientService\ConsumerRelationship
     */
    public function setClientRelationshipID($ClientRelationshipID)
    {
      $this->ClientRelationshipID = $ClientRelationshipID;
      return $this;
    }

    /**
     * @return ArrayOfString
     */
    public function getMessages()
    {
      return $this->Messages;
    }

    /**
     * @param ArrayOfString $Messages
     * @return \Famoser\MBOApiWrapper\ClientService\ConsumerRelationship
     */
    public function setMessages($Messages)
    {
      $this->Messages = $Messages;
      return $this;
    }

}
