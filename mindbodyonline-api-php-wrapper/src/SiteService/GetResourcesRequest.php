<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetResourcesRequest extends MBRequest
{

    /**
     * @var ArrayOfInt $SessionTypeIDs
     */
    protected $SessionTypeIDs = null;

    /**
     * @var int $LocationID
     */
    protected $LocationID = null;

    /**
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var \DateTime $EndDateTime
     */
    protected $EndDateTime = null;

    /**
     * @param int $LocationID
     * @param \DateTime $StartDateTime
     * @param \DateTime $EndDateTime
     */
    public function __construct($LocationID, \DateTime $StartDateTime, \DateTime $EndDateTime)
    {
      parent::__construct();
      $this->LocationID = $LocationID;
      $this->StartDateTime = $StartDateTime->format(\DateTime::ATOM);
      $this->EndDateTime = $EndDateTime->format(\DateTime::ATOM);
    }

    /**
     * @return ArrayOfInt
     */
    public function getSessionTypeIDs()
    {
      return $this->SessionTypeIDs;
    }

    /**
     * @param ArrayOfInt $SessionTypeIDs
     * @return \Famoser\MBOApiWrapper\SiteService\GetResourcesRequest
     */
    public function setSessionTypeIDs($SessionTypeIDs)
    {
      $this->SessionTypeIDs = $SessionTypeIDs;
      return $this;
    }

    /**
     * @return int
     */
    public function getLocationID()
    {
      return $this->LocationID;
    }

    /**
     * @param int $LocationID
     * @return \Famoser\MBOApiWrapper\SiteService\GetResourcesRequest
     */
    public function setLocationID($LocationID)
    {
      $this->LocationID = $LocationID;
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
     * @return \Famoser\MBOApiWrapper\SiteService\GetResourcesRequest
     */
    public function setStartDateTime(\DateTime $StartDateTime)
    {
      $this->StartDateTime = $StartDateTime->format(\DateTime::ATOM);
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
     * @return \Famoser\MBOApiWrapper\SiteService\GetResourcesRequest
     */
    public function setEndDateTime(\DateTime $EndDateTime)
    {
      $this->EndDateTime = $EndDateTime->format(\DateTime::ATOM);
      return $this;
    }

}
