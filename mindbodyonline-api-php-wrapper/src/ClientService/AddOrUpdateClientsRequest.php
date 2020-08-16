<?php

namespace Famoser\MBOApiWrapper\ClientService;

class AddOrUpdateClientsRequest extends MBRequest
{

    /**
     * @var string $UpdateAction
     */
    protected $UpdateAction = null;

    /**
     * @var boolean $Test
     */
    protected $Test = null;

    /**
     * @var ArrayOfClient $Clients
     */
    protected $Clients = null;

    /**
     * @var boolean $SendEmail
     */
    protected $SendEmail = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getUpdateAction()
    {
      return $this->UpdateAction;
    }

    /**
     * @param string $UpdateAction
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateClientsRequest
     */
    public function setUpdateAction($UpdateAction)
    {
      $this->UpdateAction = $UpdateAction;
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
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateClientsRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
      return $this;
    }

    /**
     * @return ArrayOfClient
     */
    public function getClients()
    {
      return $this->Clients;
    }

    /**
     * @param ArrayOfClient $Clients
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateClientsRequest
     */
    public function setClients($Clients)
    {
      $this->Clients = $Clients;
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
     * @return \Famoser\MBOApiWrapper\ClientService\AddOrUpdateClientsRequest
     */
    public function setSendEmail($SendEmail)
    {
      $this->SendEmail = $SendEmail;
      return $this;
    }

}
