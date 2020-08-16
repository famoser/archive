<?php

namespace Famoser\MBOApiWrapper\ClientService;

class ContactLogSubtype extends MBObject
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $Name
     */
    protected $Name = null;

    
    public function __construct()
    {
      parent::__construct();
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
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLogSubtype
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\ClientService\ContactLogSubtype
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

}
