<?php

namespace Famoser\MBOApiWrapper\SaleService;

class ProspectStage
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $Description
     */
    protected $Description = null;

    /**
     * @var boolean $Active
     */
    protected $Active = null;

    /**
     * @param boolean $Active
     */
    public function __construct($Active)
    {
      $this->Active = $Active;
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
     * @return \Famoser\MBOApiWrapper\SaleService\ProspectStage
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
      return $this->Description;
    }

    /**
     * @param string $Description
     * @return \Famoser\MBOApiWrapper\SaleService\ProspectStage
     */
    public function setDescription($Description)
    {
      $this->Description = $Description;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getActive()
    {
      return $this->Active;
    }

    /**
     * @param boolean $Active
     * @return \Famoser\MBOApiWrapper\SaleService\ProspectStage
     */
    public function setActive($Active)
    {
      $this->Active = $Active;
      return $this;
    }

}
