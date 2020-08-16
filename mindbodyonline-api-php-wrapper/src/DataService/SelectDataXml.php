<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectDataXml
{

    /**
     * @var SelectDataXmlRequest $Request
     */
    protected $Request = null;

    /**
     * @param SelectDataXmlRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return SelectDataXmlRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param SelectDataXmlRequest $Request
     * @return \Famoser\MBOApiWrapper\DataService\SelectDataXml
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
