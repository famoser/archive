<?php

namespace Famoser\MBOApiWrapper\FinderService;

class SendFinderUserNewPasswordResponse
{

    /**
     * @var SendFinderUserNewPasswordResult $SendFinderUserNewPasswordResult
     */
    protected $SendFinderUserNewPasswordResult = null;

    /**
     * @param SendFinderUserNewPasswordResult $SendFinderUserNewPasswordResult
     */
    public function __construct($SendFinderUserNewPasswordResult)
    {
      $this->SendFinderUserNewPasswordResult = $SendFinderUserNewPasswordResult;
    }

    /**
     * @return SendFinderUserNewPasswordResult
     */
    public function getSendFinderUserNewPasswordResult()
    {
      return $this->SendFinderUserNewPasswordResult;
    }

    /**
     * @param SendFinderUserNewPasswordResult $SendFinderUserNewPasswordResult
     * @return \Famoser\MBOApiWrapper\FinderService\SendFinderUserNewPasswordResponse
     */
    public function setSendFinderUserNewPasswordResult($SendFinderUserNewPasswordResult)
    {
      $this->SendFinderUserNewPasswordResult = $SendFinderUserNewPasswordResult;
      return $this;
    }

}
