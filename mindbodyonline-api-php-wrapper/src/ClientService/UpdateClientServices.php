<?php

namespace Famoser\MBOApiWrapper\ClientService;

class UpdateClientServices
{

    /**
     * @var UpdateClientServicesRequest $Request
     */
    protected $Request = null;

    /**
     * @param UpdateClientServicesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return UpdateClientServicesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param UpdateClientServicesRequest $Request
     * @return \Famoser\MBOApiWrapper\ClientService\UpdateClientServices
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
