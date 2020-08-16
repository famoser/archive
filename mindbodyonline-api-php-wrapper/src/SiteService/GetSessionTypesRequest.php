<?php

namespace Famoser\MBOApiWrapper\SiteService;

class GetSessionTypesRequest extends MBRequest
{

    /**
     * @var ArrayOfInt $ProgramIDs
     */
    protected $ProgramIDs = null;

    /**
     * @var boolean $OnlineOnly
     */
    protected $OnlineOnly = null;

    /**
     * @param boolean $OnlineOnly
     */
    public function __construct($OnlineOnly)
    {
      parent::__construct();
      $this->OnlineOnly = $OnlineOnly;
    }

    /**
     * @return ArrayOfInt
     */
    public function getProgramIDs()
    {
      return $this->ProgramIDs;
    }

    /**
     * @param ArrayOfInt $ProgramIDs
     * @return \Famoser\MBOApiWrapper\SiteService\GetSessionTypesRequest
     */
    public function setProgramIDs($ProgramIDs)
    {
      $this->ProgramIDs = $ProgramIDs;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getOnlineOnly()
    {
      return $this->OnlineOnly;
    }

    /**
     * @param boolean $OnlineOnly
     * @return \Famoser\MBOApiWrapper\SiteService\GetSessionTypesRequest
     */
    public function setOnlineOnly($OnlineOnly)
    {
      $this->OnlineOnly = $OnlineOnly;
      return $this;
    }

}
