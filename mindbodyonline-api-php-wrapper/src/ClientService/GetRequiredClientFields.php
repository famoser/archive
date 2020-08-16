<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetRequiredClientFields
{

    /**
     * @var GetRequiredClientFieldsRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetRequiredClientFieldsRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetRequiredClientFieldsRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetRequiredClientFieldsRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\GetRequiredClientFields
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
