<?php

namespace Famoser\MBOApiWrapper\ClientService;

class SendUserNewPassword
{

    /**
     * @var ClientSendUserNewPasswordRequest $Request
     */
    protected $Request = null;

    /**
     * @param ClientSendUserNewPasswordRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return ClientSendUserNewPasswordRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param ClientSendUserNewPasswordRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\SendUserNewPassword
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
