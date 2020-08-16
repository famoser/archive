<?php

namespace Famoser\MBOApiWrapper\ClientService;

class SendUserNewPasswordResponse
{

    /**
     * @var ClientSendUserNewPasswordResult $SendUserNewPasswordResult
     */
    protected $SendUserNewPasswordResult = null;

    /**
     * @param ClientSendUserNewPasswordResult $SendUserNewPasswordResult
     */
    public function __construct($SendUserNewPasswordResult)
    {
      $this->SendUserNewPasswordResult = $SendUserNewPasswordResult;
    }

    /**
     * @return ClientSendUserNewPasswordResult
     */
    public function getSendUserNewPasswordResult()
    {
      return $this->SendUserNewPasswordResult;
    }

    /**
     * @param ClientSendUserNewPasswordResult $SendUserNewPasswordResult
     * @return \Famoser\MBOApiWrapper\ClientService\SendUserNewPasswordResponse
     */
    public function setSendUserNewPasswordResult($SendUserNewPasswordResult)
    {
      $this->SendUserNewPasswordResult = $SendUserNewPasswordResult;
      return $this;
    }

}
