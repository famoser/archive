<?php

namespace Famoser\MBOApiWrapper\ClassService;

class AddClientsToClassesRequest extends MBRequest
{

    /**
     * @var ArrayOfString $ClientIDs
     */
    protected $ClientIDs = null;

    /**
     * @var ArrayOfInt $ClassIDs
     */
    protected $ClassIDs = null;

    /**
     * @var boolean $Test
     */
    protected $Test = null;

    /**
     * @var boolean $RequirePayment
     */
    protected $RequirePayment = null;

    /**
     * @var boolean $Waitlist
     */
    protected $Waitlist = null;

    /**
     * @var boolean $SendEmail
     */
    protected $SendEmail = null;

    /**
     * @var int $WaitlistEntryID
     */
    protected $WaitlistEntryID = null;

    /**
     * @var int $ClientServiceID
     */
    protected $ClientServiceID = null;

    
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
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToClassesRequest
     */
    public function setClientIDs($ClientIDs)
    {
      $this->ClientIDs = $ClientIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getClassIDs()
    {
      return $this->ClassIDs;
    }

    /**
     * @param ArrayOfInt $ClassIDs
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToClassesRequest
     */
    public function setClassIDs($ClassIDs)
    {
      $this->ClassIDs = $ClassIDs;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getTest()
    {
      return $this->Test;
    }

    /**
     * @param boolean $Test
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToClassesRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getRequirePayment()
    {
      return $this->RequirePayment;
    }

    /**
     * @param boolean $RequirePayment
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToClassesRequest
     */
    public function setRequirePayment($RequirePayment)
    {
      $this->RequirePayment = $RequirePayment;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getWaitlist()
    {
      return $this->Waitlist;
    }

    /**
     * @param boolean $Waitlist
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToClassesRequest
     */
    public function setWaitlist($Waitlist)
    {
      $this->Waitlist = $Waitlist;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSendEmail()
    {
      return $this->SendEmail;
    }

    /**
     * @param boolean $SendEmail
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToClassesRequest
     */
    public function setSendEmail($SendEmail)
    {
      $this->SendEmail = $SendEmail;
      return $this;
    }

    /**
     * @return int
     */
    public function getWaitlistEntryID()
    {
      return $this->WaitlistEntryID;
    }

    /**
     * @param int $WaitlistEntryID
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToClassesRequest
     */
    public function setWaitlistEntryID($WaitlistEntryID)
    {
      $this->WaitlistEntryID = $WaitlistEntryID;
      return $this;
    }

    /**
     * @return int
     */
    public function getClientServiceID()
    {
      return $this->ClientServiceID;
    }

    /**
     * @param int $ClientServiceID
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToClassesRequest
     */
    public function setClientServiceID($ClientServiceID)
    {
      $this->ClientServiceID = $ClientServiceID;
      return $this;
    }

}
