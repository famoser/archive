<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GenderOption
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $Name
     */
    protected $Name = null;

    /**
     * @var boolean $IsActive
     */
    protected $IsActive = null;

    /**
     * @var boolean $IsSystem
     */
    protected $IsSystem = null;

    /**
     * @param int $ID
     * @param boolean $IsActive
     * @param boolean $IsSystem
     */
    public function __construct($ID, $IsActive, $IsSystem)
    {
      $this->ID = $ID;
      $this->IsActive = $IsActive;
      $this->IsSystem = $IsSystem;
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
     * @return \Famoser\MBOApiWrapper\SiteService\GenderOption
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
     * @return \Famoser\MBOApiWrapper\SiteService\GenderOption
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsActive()
    {
      return $this->IsActive;
    }

    /**
     * @param boolean $IsActive
     * @return \Famoser\MBOApiWrapper\SiteService\GenderOption
     */
    public function setIsActive($IsActive)
    {
      $this->IsActive = $IsActive;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getIsSystem()
    {
      return $this->IsSystem;
    }

    /**
     * @param boolean $IsSystem
     * @return \Famoser\MBOApiWrapper\SiteService\GenderOption
     */
    public function setIsSystem($IsSystem)
    {
      $this->IsSystem = $IsSystem;
      return $this;
    }

}
