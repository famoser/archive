<?php

namespace Famoser\MBOApiWrapper\DataService;

class FunctionDataXml
{

    /**
     * @var FunctionDataXmlRequest $Request
     */
    protected $Request = null;

    /**
     * @param FunctionDataXmlRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return FunctionDataXmlRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param FunctionDataXmlRequest $Request
     * @return \Famoser\MBOApiWrapper\DataService\FunctionDataXml
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
