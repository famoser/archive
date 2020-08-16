<?php

namespace Famoser\MBOApiWrapper\ClientService;

class ValidateLoginResponse
{

    /**
     * @var ValidateLoginResult $ValidateLoginResult
     */
    protected $ValidateLoginResult = null;

    /**
     * @param ValidateLoginResult $ValidateLoginResult
     */
    public function __construct($ValidateLoginResult)
    {
      $this->ValidateLoginResult = $ValidateLoginResult;
    }

    /**
     * @return ValidateLoginResult
     */
    public function getValidateLoginResult()
    {
      return $this->ValidateLoginResult;
    }

    /**
     * @param ValidateLoginResult $ValidateLoginResult
     * @return \Famoser\MBOApiWrapper\ClientService\ValidateLoginResponse
     */
    public function setValidateLoginResult($ValidateLoginResult)
    {
      $this->ValidateLoginResult = $ValidateLoginResult;
      return $this;
    }

}
