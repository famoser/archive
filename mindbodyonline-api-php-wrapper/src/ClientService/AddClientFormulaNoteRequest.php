<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddClientFormulaNoteRequest extends MBRequest
{

    /**
     * @var string $ClientID
     */
    protected $ClientID = null;

    /**
     * @var int $AppointmentID
     */
    protected $AppointmentID = null;

    /**
     * @var string $Note
     */
    protected $Note = null;

    
    public function __construct()
    {
      parent::__construct();
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
     * @return \Famoser\MBOApiWrapper\ClientService\AddClientFormulaNoteRequest
     */
    public function setClientID($ClientID)
    {
      $this->ClientID = $ClientID;
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
     * @return \Famoser\MBOApiWrapper\ClientService\AddClientFormulaNoteRequest
     */
    public function setAppointmentID($AppointmentID)
    {
      $this->AppointmentID = $AppointmentID;
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
     * @return \Famoser\MBOApiWrapper\ClientService\AddClientFormulaNoteRequest
     */
    public function setNote($Note)
    {
      $this->Note = $Note;
      return $this;
    }

}
