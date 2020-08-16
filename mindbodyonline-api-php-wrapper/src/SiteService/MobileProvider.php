<?php

namespace Famoser\MBOApiWrapper\SiteService;

class MobileProvider
{

    /**
     * @var int $ProviderID
     */
    protected $ProviderID = null;

    /**
     * @var string $ProviderName
     */
    protected $ProviderName = null;

    /**
     * @var string $ProviderAddress
     */
    protected $ProviderAddress = null;

    /**
     * @var boolean $Active
     */
    protected $Active = null;

    /**
     * @param int $ProviderID
     * @param boolean $Active
     */
    public function __construct($ProviderID, $Active)
    {
      $this->ProviderID = $ProviderID;
      $this->Active = $Active;
    }

    /**
     * @return int
     */
    public function getProviderID()
    {
      return $this->ProviderID;
    }

    /**
     * @param int $ProviderID
     * @return \Famoser\MBOApiWrapper\SiteService\MobileProvider
     */
    public function setProviderID($ProviderID)
    {
      $this->ProviderID = $ProviderID;
      return $this;
    }

    /**
     * @return string
     */
    public function getProviderName()
    {
      return $this->ProviderName;
    }

    /**
     * @param string $ProviderName
     * @return \Famoser\MBOApiWrapper\SiteService\MobileProvider
     */
    public function setProviderName($ProviderName)
    {
      $this->ProviderName = $ProviderName;
      return $this;
    }

    /**
     * @return string
     */
    public function getProviderAddress()
    {
      return $this->ProviderAddress;
    }

    /**
     * @param string $ProviderAddress
     * @return \Famoser\MBOApiWrapper\SiteService\MobileProvider
     */
    public function setProviderAddress($ProviderAddress)
    {
      $this->ProviderAddress = $ProviderAddress;
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
     * @return \Famoser\MBOApiWrapper\SiteService\MobileProvider
     */
    public function setActive($Active)
    {
      $this->Active = $Active;
      return $this;
    }

}
