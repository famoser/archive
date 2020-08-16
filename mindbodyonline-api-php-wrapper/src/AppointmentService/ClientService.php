<?php

namespace Famoser\MBOApiWrapper\AppointmentService;

class ClientService extends MBObject
{

    /**
     * @var boolean $Current
     */
    protected $Current = null;

    /**
     * @var int $Count
     */
    protected $Count = null;

    /**
     * @var int $Remaining
     */
    protected $Remaining = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $Name
     */
    protected $Name = null;

    /**
     * @var \DateTime $PaymentDate
     */
    protected $PaymentDate = null;

    /**
     * @var \DateTime $ActiveDate
     */
    protected $ActiveDate = null;

    /**
     * @var \DateTime $ExpirationDate
     */
    protected $ExpirationDate = null;

    /**
     * @var Program $Program
     */
    protected $Program = null;

    /**
     * @param boolean $Current
     * @param int $Count
     * @param int $Remaining
     */
    public function __construct($Current, $Count, $Remaining)
    {
      parent::__construct();
      $this->Current = $Current;
      $this->Count = $Count;
      $this->Remaining = $Remaining;
    }

    /**
     * @return boolean
     */
    public function getCurrent()
    {
      return $this->Current;
    }

    /**
     * @param boolean $Current
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientService
     */
    public function setCurrent($Current)
    {
      $this->Current = $Current;
      return $this;
    }

    /**
     * @return int
     */
    public function getCount()
    {
      return $this->Count;
    }

    /**
     * @param int $Count
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientService
     */
    public function setCount($Count)
    {
      $this->Count = $Count;
      return $this;
    }

    /**
     * @return int
     */
    public function getRemaining()
    {
      return $this->Remaining;
    }

    /**
     * @param int $Remaining
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientService
     */
    public function setRemaining($Remaining)
    {
      $this->Remaining = $Remaining;
      return $this;
    }

    /**
     * @return ActionCode
     */
    public function getAction()
    {
      return $this->Action;
    }

    /**
     * @param ActionCode $Action
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientService
     */
    public function setAction($Action)
    {
      $this->Action = $Action;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientService
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
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientService
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getPaymentDate()
    {
      if ($this->PaymentDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->PaymentDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $PaymentDate
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientService
     */
    public function setPaymentDate(\DateTime $PaymentDate = null)
    {
      if ($PaymentDate == null) {
       $this->PaymentDate = null;
      } else {
        $this->PaymentDate = $PaymentDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getActiveDate()
    {
      if ($this->ActiveDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->ActiveDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $ActiveDate
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientService
     */
    public function setActiveDate(\DateTime $ActiveDate = null)
    {
      if ($ActiveDate == null) {
       $this->ActiveDate = null;
      } else {
        $this->ActiveDate = $ActiveDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getExpirationDate()
    {
      if ($this->ExpirationDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->ExpirationDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $ExpirationDate
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientService
     */
    public function setExpirationDate(\DateTime $ExpirationDate = null)
    {
      if ($ExpirationDate == null) {
       $this->ExpirationDate = null;
      } else {
        $this->ExpirationDate = $ExpirationDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return Program
     */
    public function getProgram()
    {
      return $this->Program;
    }

    /**
     * @param Program $Program
     * @return \Famoser\MBOApiWrapper\AppointmentService\ClientService
     */
    public function setProgram($Program)
    {
      $this->Program = $Program;
      return $this;
    }

}
