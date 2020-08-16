<?php

namespace Famoser\MBOApiWrapper\ClientService;

class ValidateLogin
{

    /**
     * @var ValidateLoginRequest $Request
     */
    protected $Request = null;

    /**
     * @param ValidateLoginRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return ValidateLoginRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param ValidateLoginRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\ValidateLogin
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
