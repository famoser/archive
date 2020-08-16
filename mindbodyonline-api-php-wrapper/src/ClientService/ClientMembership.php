<?php

namespace Famoser\MBOApiWrapper\ClientService;

class ClientMembership extends ClientService
{

    /**
     * @var ArrayOfLocation $RestrictedLocations
     */
    protected $RestrictedLocations = null;

    /**
     * @var string $IconCode
     */
    protected $IconCode = null;

    /**
     * @param boolean $Current
     * @param int $Count
     * @param int $Remaining
     */
    public function __construct($Current, $Count, $Remaining)
    {
      parent::__construct($Current, $Count, $Remaining);
    }

    /**
     * @return ArrayOfLocation
     */
    public function getRestrictedLocations()
    {
      return $this->RestrictedLocations;
    }

    /**
     * @param ArrayOfLocation $RestrictedLocations
     * @return \Famoser\MBOApiWrapper\ClientService\ClientMembership
     */
    public function setRestrictedLocations($RestrictedLocations)
    {
      $this->RestrictedLocations = $RestrictedLocations;
      return $this;
    }

    /**
     * @return string
     */
    public function getIconCode()
    {
      return $this->IconCode;
    }

    /**
     * @param string $IconCode
     * @return \Famoser\MBOApiWrapper\ClientService\ClientMembership
     */
    public function setIconCode($IconCode)
    {
      $this->IconCode = $IconCode;
      return $this;
    }

}
