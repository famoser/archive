<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientIndexesRequest extends MBRequest
{

    /**
     * @var boolean $RequiredOnly
     */
    protected $RequiredOnly = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return boolean
     */
    public function getRequiredOnly()
    {
      return $this->RequiredOnly;
    }

    /**
     * @param boolean $RequiredOnly
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientIndexesRequest
     */
    public function setRequiredOnly($RequiredOnly)
    {
      $this->RequiredOnly = $RequiredOnly;
      return $this;
    }

}
