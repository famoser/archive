<?php

namespace Famoser\MBOApiWrapper\FinderService;

class Relationship
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $RelationshipName1
     */
    protected $RelationshipName1 = null;

    /**
     * @var string $RelationshipName2
     */
    protected $RelationshipName2 = null;

    /**
     * @param int $ID
     */
    public function __construct($ID)
    {
      $this->ID = $ID;
    }

    /**
     * @return int
     */
    public function getID()
    {
      return $this->ID;
    }

    /**
     * @param int $ID
     * @return \Famoser\MBOApiWrapper\FinderService\Relationship
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return string
     */
    public function getRelationshipName1()
    {
      return $this->RelationshipName1;
    }

    /**
     * @param string $RelationshipName1
     * @return \Famoser\MBOApiWrapper\FinderService\Relationship
     */
    public function setRelationshipName1($RelationshipName1)
    {
      $this->RelationshipName1 = $RelationshipName1;
      return $this;
    }

    /**
     * @return string
     */
    public function getRelationshipName2()
    {
      return $this->RelationshipName2;
    }

    /**
     * @param string $RelationshipName2
     * @return \Famoser\MBOApiWrapper\FinderService\Relationship
     */
    public function setRelationshipName2($RelationshipName2)
    {
      $this->RelationshipName2 = $RelationshipName2;
      return $this;
    }

}
