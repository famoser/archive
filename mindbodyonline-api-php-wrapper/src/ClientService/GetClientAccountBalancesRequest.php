<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientAccountBalancesRequest extends MBRequest
{

    /**
     * @var ArrayOfString $ClientIDs
     */
    protected $ClientIDs = null;

    /**
     * @var \DateTime $BalanceDate
     */
    protected $BalanceDate = null;

    /**
     * @var int $ClassID
     */
    protected $ClassID = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return ArrayOfString
     */
    public function getClientIDs()
    {
      return $this->ClientIDs;
    }

    /**
     * @param ArrayOfString $ClientIDs
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientAccountBalancesRequest
     */
    public function setClientIDs($ClientIDs)
    {
      $this->ClientIDs = $ClientIDs;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getBalanceDate()
    {
      if ($this->BalanceDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->BalanceDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $BalanceDate
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientAccountBalancesRequest
     */
    public function setBalanceDate(\DateTime $BalanceDate = null)
    {
      if ($BalanceDate == null) {
       $this->BalanceDate = null;
      } else {
        $this->BalanceDate = $BalanceDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return int
     */
    public function getClassID()
    {
      return $this->ClassID;
    }

    /**
     * @param int $ClassID
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientAccountBalancesRequest
     */
    public function setClassID($ClassID)
    {
      $this->ClassID = $ClassID;
      return $this;
    }

}
