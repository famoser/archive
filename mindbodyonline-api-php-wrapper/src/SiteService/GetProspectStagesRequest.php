<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetProspectStagesRequest extends MBRequest
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
     * @return \Famoser\MBOApiWrapper\SiteService\GetProspectStagesRequest
     */
    public function setIncludeInactive($IncludeInactive)
    {
      $this->IncludeInactive = $IncludeInactive;
      return $this;
    }

}
