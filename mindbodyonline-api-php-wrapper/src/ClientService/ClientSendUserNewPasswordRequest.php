<?php

namespace Famoser\MBOApiWrapper\ClientService;

class ClientSendUserNewPasswordRequest extends MBRequest
{

    /**
     * @var string $UserEmail
     */
    protected $UserEmail = null;

    /**
     * @var string $UserFirstName
     */
    protected $UserFirstName = null;

    /**
     * @var string $UserLastName
     */
    protected $UserLastName = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getUserEmail()
    {
      return $this->UserEmail;
    }

    /**
     * @param string $UserEmail
     * @return \Famoser\MBOApiWrapper\ClientService\ClientSendUserNewPasswordRequest
     */
    public function setUserEmail($UserEmail)
    {
      $this->UserEmail = $UserEmail;
      return $this;
    }

    /**
     * @return string
     */
    public function getUserFirstName()
    {
      return $this->UserFirstName;
    }

    /**
     * @param string $UserFirstName
     * @return \Famoser\MBOApiWrapper\ClientService\ClientSendUserNewPasswordRequest
     */
    public function setUserFirstName($UserFirstName)
    {
      $this->UserFirstName = $UserFirstName;
      return $this;
    }

    /**
     * @return string
     */
    public function getUserLastName()
    {
      return $this->UserLastName;
    }

    /**
     * @param string $UserLastName
     * @return \Famoser\MBOApiWrapper\ClientService\ClientSendUserNewPasswordRequest
     */
    public function setUserLastName($UserLastName)
    {
      $this->UserLastName = $UserLastName;
      return $this;
    }

}
