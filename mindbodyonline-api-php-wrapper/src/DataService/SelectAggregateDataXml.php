<?php

namespace Famoser\MBOApiWrapper\DataService;

class SelectAggregateDataXml
{

    /**
     * @var SelectAggregateDataXmlRequest $Request
     */
    protected $Request = null;

    /**
     * @param SelectAggregateDataXmlRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return SelectAggregateDataXmlRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param SelectAggregateDataXmlRequest $Request
     * @return \Famoser\MBOApiWrapper\DataService\SelectAggregateDataXml
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
