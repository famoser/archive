<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetAcceptedCardType
{

    /**
     * @var GetAcceptedCardTypeRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetAcceptedCardTypeRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetAcceptedCardTypeRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetAcceptedCardTypeRequest $Request
     * @return \Famoser\MBOApiWrapper\SaleService\GetAcceptedCardType
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
