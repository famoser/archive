<?php

namespace Famoser\MBOApiWrapper\FinderService;

class SendFinderUserNewPassword
{

    /**
     * @var SendFinderUserNewPasswordRequest $Request
     */
    protected $Request = null;

    /**
     * @param SendFinderUserNewPasswordRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return SendFinderUserNewPasswordRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param SendFinderUserNewPasswordRequest $Request
     * @return \Famoser\MBOApiWrapper\FinderService\SendFinderUserNewPassword
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
