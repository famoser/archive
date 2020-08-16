<?php

namespace Famoser\MBOApiWrapper\ClientService;

class Unavailability extends ScheduleItem
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var \DateTime $StartDateTime
     */
    protected $StartDateTime = null;

    /**
     * @var \DateTime $EndDateTime
     */
    protected $EndDateTime = null;

    /**
     * @var string $Description
     */
    protected $Description = null;

    /**
     * @param int $ID
     * @param \DateTime $StartDateTime
     * @param \DateTime $EndDateTime
     */
    public function __construct($ID, \DateTime $StartDateTime, \DateTime $EndDateTime)
    {
      parent::__construct();
      $this->ID = $ID;
      $this->StartDateTime = $StartDateTime->format(\DateTime::ATOM);
      $this->EndDateTime = $EndDateTime->format(\DateTime::ATOM);
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
     * @return \Famoser\MBOApiWrapper\ClientService\Unavailability
     */
    public function setID($ID)
    {
      $this->ID = $ID;
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
     * @return \Famoser\MBOApiWrapper\ClientService\Unavailability
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
     * @return \Famoser\MBOApiWrapper\ClientService\Unavailability
     */
    public function setEndDateTime(\DateTime $EndDateTime)
    {
      $this->EndDateTime = $EndDateTime->format(\DateTime::ATOM);
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
     * @return \Famoser\MBOApiWrapper\ClientService\Unavailability
     */
    public function setDescription($Description)
    {
      $this->Description = $Description;
      return $this;
    }

}
