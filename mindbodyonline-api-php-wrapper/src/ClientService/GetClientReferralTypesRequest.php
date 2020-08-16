<?php

namespace Famoser\MBOApiWrapper\ClientService;

class GetClientReferralTypesRequest extends MBRequest
{

    /**
     * @var boolean $IncludeInactive
     */
    protected $IncludeInactive = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return boolean
     */
    public function getIncludeInactive()
    {
      return $this->IncludeInactive;
    }

    /**
     * @param boolean $IncludeInactive
     * @return \Famoser\MBOApiWrapper\ClientService\GetClientReferralTypesRequest
     */
    public function setIncludeInactive($IncludeInactive)
    {
      $this->IncludeInactive = $IncludeInactive;
      return $this;
    }

}
