<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetClassesWithinRadiusRequest extends MBRequest
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
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var \DateTime $EndDateTime
     */
    protected $EndDateTime = null;

    /**
     * @var int $SearchLocationID
     */
    protected $SearchLocationID = null;

    /**
     * @var int $SearchClassID
     */
    protected $SearchClassID = null;

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
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
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
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
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
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
     */
    public function setSearchRadius($SearchRadius)
    {
      $this->SearchRadius = $SearchRadius;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getStartDateTime()
    {
      if ($this->StartDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->StartDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $StartDateTime
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
     */
    public function setStartDateTime(\DateTime $StartDateTime = null)
    {
      if ($StartDateTime == null) {
       $this->StartDateTime = null;
      } else {
        $this->StartDateTime = $StartDateTime->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEndDateTime()
    {
      if ($this->EndDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EndDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EndDateTime
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
     */
    public function setEndDateTime(\DateTime $EndDateTime = null)
    {
      if ($EndDateTime == null) {
       $this->EndDateTime = null;
      } else {
        $this->EndDateTime = $EndDateTime->format(\DateTime::ATOM);
      }
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
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
     */
    public function setSearchLocationID($SearchLocationID)
    {
      $this->SearchLocationID = $SearchLocationID;
      return $this;
    }

    /**
     * @return int
     */
    public function getSearchClassID()
    {
      return $this->SearchClassID;
    }

    /**
     * @param int $SearchClassID
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
     */
    public function setSearchClassID($SearchClassID)
    {
      $this->SearchClassID = $SearchClassID;
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
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
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
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
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
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
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
     * @return \Famoser\MBOApiWrapper\FinderService\GetClassesWithinRadiusRequest
     */
    public function setIPAddress($IPAddress)
    {
      $this->IPAddress = $IPAddress;
      return $this;
    }

}
