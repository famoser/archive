<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetActivationCodeResponse
{

    /**
     * @var GetActivationCodeResult $GetActivationCodeResult
     */
    protected $GetActivationCodeResult = null;

    /**
     * @param GetActivationCodeResult $GetActivationCodeResult
     */
    public function __construct($GetActivationCodeResult)
    {
      $this->GetActivationCodeResult = $GetActivationCodeResult;
    }

    /**
     * @return GetActivationCodeResult
     */
    public function getGetActivationCodeResult()
    {
      return $this->GetActivationCodeResult;
    }

    /**
     * @param GetActivationCodeResult $GetActivationCodeResult
     * @return \Famoser\MBOApiWrapper\SiteService\GetActivationCodeResponse
     */
    public function setGetActivationCodeResult($GetActivationCodeResult)
    {
      $this->GetActivationCodeResult = $GetActivationCodeResult;
      return $this;
    }

}
