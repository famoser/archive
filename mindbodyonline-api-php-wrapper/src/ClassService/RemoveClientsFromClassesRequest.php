<?php

namespace Famoser\MBOApiWrapper\ClassService;

class RemoveClientsFromClassesRequest extends MBRequest
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
     * @var boolean $SendEmail
     */
    protected $SendEmail = null;

    /**
     * @var boolean $LateCancel
     */
    protected $LateCancel = null;

    
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
     * @return \Famoser\MBOApiWrapper\ClassService\RemoveClientsFromClassesRequest
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
     * @return \Famoser\MBOApiWrapper\ClassService\RemoveClientsFromClassesRequest
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
     * @return \Famoser\MBOApiWrapper\ClassService\RemoveClientsFromClassesRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
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
     * @return \Famoser\MBOApiWrapper\ClassService\RemoveClientsFromClassesRequest
     */
    public function setSendEmail($SendEmail)
    {
      $this->SendEmail = $SendEmail;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getLateCancel()
    {
      return $this->LateCancel;
    }

    /**
     * @param boolean $LateCancel
     * @return \Famoser\MBOApiWrapper\ClassService\RemoveClientsFromClassesRequest
     */
    public function setLateCancel($LateCancel)
    {
      $this->LateCancel = $LateCancel;
      return $this;
    }

}
