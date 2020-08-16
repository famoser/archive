<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetProspectStages
{

    /**
     * @var GetProspectStagesRequest $Request
     */
    protected $Request = null;

    /**
     * @param GetProspectStagesRequest $Request
     */
    public function __construct($Request)
    {
      $this->Request = $Request;
    }

    /**
     * @return GetProspectStagesRequest
     */
    public function getRequest()
    {
      return $this->Request;
    }

    /**
     * @param GetProspectStagesRequest $Request
     * @return \Famoser\MBOApiWrapper\SiteService\GetProspectStages
     */
    public function setRequest($Request)
    {
      $this->Request = $Request;
      return $this;
    }

}
