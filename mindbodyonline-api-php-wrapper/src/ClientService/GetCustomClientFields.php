<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetCustomClientFields
{

    /**
     * @var GetCustomClientFieldsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetCustomClientFieldsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetCustomClientFieldsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetCustomClientFieldsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetCustomClientFields
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
