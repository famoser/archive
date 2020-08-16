<?php

namespace Famoser\MBOApiWrapper\DataService;

class ApiFunction
{

    /**
     * @var string $Name
     */
    protected $Name = null;

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @param int $ID
     */
    public function __construct($ID)
    {
      $this->ID = $ID;
    }

    /**
     * @return string
     */
    public function getName()
    {
      return $this->Name;
    }

    /**
     * @param string $Name
     * @return \Famoser\MBOApiWrapper\DataService\ApiFunction
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\DataService\ApiFunction
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

}
