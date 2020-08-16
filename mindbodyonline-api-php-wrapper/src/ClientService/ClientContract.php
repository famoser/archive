<?php

namespace Famoser\MBOApiWrapper\ClientService;

class ClientContract extends MBObject
{

    /**
     * @var \DateTime $AgreementDate
     */
    protected $AgreementDate = null;

    /**
     * @var \DateTime $StartDate
     */
    protected $StartDate = null;

    /**
     * @var \DateTime $EndDate
     */
    protected $EndDate = null;

    /**
     * @var string $ContractName
     */
    protected $ContractName = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @param \DateTime $AgreementDate
     * @param \DateTime $StartDate
     * @param \DateTime $EndDate
     */
    public function __construct(\DateTime $AgreementDate, \DateTime $StartDate, \DateTime $EndDate)
    {
      parent::__construct();
      $this->AgreementDate = $AgreementDate->format(\DateTime::ATOM);
      $this->StartDate = $StartDate->format(\DateTime::ATOM);
      $this->EndDate = $EndDate->format(\DateTime::ATOM);
    }

    /**
     * @return \DateTime
     */
    public function getAgreementDate()
    {
      if ($this->AgreementDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->AgreementDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $AgreementDate
     * @return \Famoser\MBOApiWrapper\ClientService\ClientContract
     */
    public function setAgreementDate(\DateTime $AgreementDate)
    {
      $this->AgreementDate = $AgreementDate->format(\DateTime::ATOM);
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getStartDate()
    {
      if ($this->StartDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->StartDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $StartDate
     * @return \Famoser\MBOApiWrapper\ClientService\ClientContract
     */
    public function setStartDate(\DateTime $StartDate)
    {
      $this->StartDate = $StartDate->format(\DateTime::ATOM);
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEndDate()
    {
      if ($this->EndDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EndDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EndDate
     * @return \Famoser\MBOApiWrapper\ClientService\ClientContract
     */
    public function setEndDate(\DateTime $EndDate)
    {
      $this->EndDate = $EndDate->format(\DateTime::ATOM);
      return $this;
    }

    /**
     * @return string
     */
    public function getContractName()
    {
      return $this->ContractName;
    }

    /**
     * @param string $ContractName
     * @return \Famoser\MBOApiWrapper\ClientService\ClientContract
     */
    public function setContractName($ContractName)
    {
      $this->ContractName = $ContractName;
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
     * @return \Famoser\MBOApiWrapper\ClientService\ClientContract
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
     * @return \Famoser\MBOApiWrapper\ClientService\ClientContract
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

}
