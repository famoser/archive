<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetSessionTypesWithinRadiusRequest extends MBRequest
{

    /**
     * @var float $SearchLatitude
     */
    protected $SearchLatitude = null;

    /**
     * @var float $SearchLongitude
     */
    protected $SearchLongitude = null;

    /**
     * @var float $SearchRadius
     */
    protected $SearchRadius = null;

    /**
     * @var int $SearchLocationID
     */
    protected $SearchLocationID = null;

    /**
     * @var int $SearchSessionTypeID
     */
    protected $SearchSessionTypeID = null;

    /**
     * @var string $SearchText
     */
    protected $SearchText = null;

    /**
     * @var string $SortOption
     */
    protected $SortOption = null;

    /**
     * @var string $SearchDomain
     */
    protected $SearchDomain = null;

    /**
     * @var string $IPAddress
     */
    protected $IPAddress = null;

    /**
     * @var int $SessionsPerLocation
     */
    protected $SessionsPerLocation = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return float
     */
    public function getSearchLatitude()
    {
      return $this->SearchLatitude;
    }

    /**
     * @param float $SearchLatitude
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusRequest
     */
    public function setSearchLatitude($SearchLatitude)
    {
      $this->SearchLatitude = $SearchLatitude;
      return $this;
    }

    /**
     * @return float
     */
    public function getSearchLongitude()
    {
      return $this->SearchLongitude;
    }

    /**
     * @param float $SearchLongitude
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusRequest
     */
    public function setSearchLongitude($SearchLongitude)
    {
      $this->SearchLongitude = $SearchLongitude;
      return $this;
    }

    /**
     * @return float
     */
    public function getSearchRadius()
    {
      return $this->SearchRadius;
    }

    /**
     * @param float $SearchRadius
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusRequest
     */
    public function setSearchRadius($SearchRadius)
    {
      $this->SearchRadius = $SearchRadius;
      return $this;
    }

    /**
     * @return int
     */
    public function getSearchLocationID()
    {
      return $this->SearchLocationID;
    }

    /**
     * @param int $SearchLocationID
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusRequest
     */
    public function setSearchLocationID($SearchLocationID)
    {
      $this->SearchLocationID = $SearchLocationID;
      return $this;
    }

    /**
     * @return int
     */
    public function getSearchSessionTypeID()
    {
      return $this->SearchSessionTypeID;
    }

    /**
     * @param int $SearchSessionTypeID
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusRequest
     */
    public function setSearchSessionTypeID($SearchSessionTypeID)
    {
      $this->SearchSessionTypeID = $SearchSessionTypeID;
      return $this;
    }

    /**
     * @return string
     */
    public function getSearchText()
    {
      return $this->SearchText;
    }

    /**
     * @param string $SearchText
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusRequest
     */
    public function setSearchText($SearchText)
    {
      $this->SearchText = $SearchText;
      return $this;
    }

    /**
     * @return string
     */
    public function getSortOption()
    {
      return $this->SortOption;
    }

    /**
     * @param string $SortOption
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusRequest
     */
    public function setSortOption($SortOption)
    {
      $this->SortOption = $SortOption;
      return $this;
    }

    /**
     * @return string
     */
    public function getSearchDomain()
    {
      return $this->SearchDomain;
    }

    /**
     * @param string $SearchDomain
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusRequest
     */
    public function setSearchDomain($SearchDomain)
    {
      $this->SearchDomain = $SearchDomain;
      return $this;
    }

    /**
     * @return string
     */
    public function getIPAddress()
    {
      return $this->IPAddress;
    }

    /**
     * @param string $IPAddress
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusRequest
     */
    public function setIPAddress($IPAddress)
    {
      $this->IPAddress = $IPAddress;
      return $this;
    }

    /**
     * @return int
     */
    public function getSessionsPerLocation()
    {
      return $this->SessionsPerLocation;
    }

    /**
     * @param int $SessionsPerLocation
     * @return \Famoser\MBOApiWrapper\FinderService\GetSessionTypesWithinRadiusRequest
     */
    public function setSessionsPerLocation($SessionsPerLocation)
    {
      $this->SessionsPerLocation = $SessionsPerLocation;
      return $this;
    }

}
