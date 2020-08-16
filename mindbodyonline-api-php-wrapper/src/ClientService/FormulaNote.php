<?php

namespace Famoser\MBOApiWrapper\ClientService;

class FormulaNote extends MBObject
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $ClientID
     */
    protected $ClientID = null;

    /**
     * @var string $Note
     */
    protected $Note = null;

    /**
     * @var \DateTime $EntryDateTime
     */
    protected $EntryDateTime = null;

    /**
     * @var int $AppointmentID
     */
    protected $AppointmentID = null;

    /**
     * @param \DateTime $EntryDateTime
     */
    public function __construct(\DateTime $EntryDateTime)
    {
      parent::__construct();
      $this->EntryDateTime = $EntryDateTime->format(\DateTime::ATOM);
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
     * @return \Famoser\MBOApiWrapper\ClientService\FormulaNote
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return string
     */
    public function getClientID()
    {
      return $this->ClientID;
    }

    /**
     * @param string $ClientID
     * @return \Famoser\MBOApiWrapper\ClientService\FormulaNote
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
      return $this;
    }

    /**
     * @return string
     */
    public function getNote()
    {
      return $this->Note;
    }

    /**
     * @param string $Note
     * @return \Famoser\MBOApiWrapper\ClientService\FormulaNote
     */
    public function setNote($Note)
    {
      $this->Note = $Note;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEntryDateTime()
    {
      if ($this->EntryDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EntryDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EntryDateTime
     * @return \Famoser\MBOApiWrapper\ClientService\FormulaNote
     */
    public function setEntryDateTime(\DateTime $EntryDateTime)
    {
      $this->EntryDateTime = $EntryDateTime->format(\DateTime::ATOM);
      return $this;
    }

    /**
     * @return int
     */
    public function getAppointmentID()
    {
      return $this->AppointmentID;
    }

    /**
     * @param int $AppointmentID
     * @return \Famoser\MBOApiWrapper\ClientService\FormulaNote
     */
    public function setAppointmentID($AppointmentID)
    {
      $this->AppointmentID = $AppointmentID;
      return $this;
    }

}
