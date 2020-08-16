<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetAcceptedCardTypeResponse
{

    /**
     * @var GetAcceptedCardTypeResult $GetAcceptedCardTypeResult
     */
    protected $GetAcceptedCardTypeResult = null;

    /**
     * @param GetAcceptedCardTypeResult $GetAcceptedCardTypeResult
     */
    public function __construct($GetAcceptedCardTypeResult)
    {
      $this->GetAcceptedCardTypeResult = $GetAcceptedCardTypeResult;
    }

    /**
     * @return GetAcceptedCardTypeResult
     */
    public function getGetAcceptedCardTypeResult()
    {
      return $this->GetAcceptedCardTypeResult;
    }

    /**
     * @param GetAcceptedCardTypeResult $GetAcceptedCardTypeResult
     * @return \Famoser\MBOApiWrapper\SaleService\GetAcceptedCardTypeResponse
     */
    public function setGetAcceptedCardTypeResult($GetAcceptedCardTypeResult)
    {
      $this->GetAcceptedCardTypeResult = $GetAcceptedCardTypeResult;
      return $this;
    }

}
