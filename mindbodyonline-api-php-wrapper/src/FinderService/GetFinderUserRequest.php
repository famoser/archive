<?php

namespace Famoser\MBOApiWrapper\FinderService;

class GetFinderUserRequest extends MBRequest
{

    /**
     * @var string $Email
     */
    protected $Email = null;

    /**
     * @var string $Password
     */
    protected $Password = null;

    /**
     * @var int $PartnerID
     */
    protected $PartnerID = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return string
     */
    public function getEmail()
    {
      return $this->Email;
    }

    /**
     * @param string $Email
     * @return \Famoser\MBOApiWrapper\FinderService\GetFinderUserRequest
     */
    public function setEmail($Email)
    {
      $this->Email = $Email;
      return $this;
    }

    /**
     * @return string
     */
    public function getPassword()
    {
      return $this->Password;
    }

    /**
     * @param string $Password
     * @return \Famoser\MBOApiWrapper\FinderService\GetFinderUserRequest
     */
    public function setPassword($Password)
    {
      $this->Password = $Password;
      return $this;
    }

    /**
     * @return int
     */
    public function getPartnerID()
    {
      return $this->PartnerID;
    }

    /**
     * @param int $PartnerID
     * @return \Famoser\MBOApiWrapper\FinderService\GetFinderUserRequest
     */
    public function setPartnerID($PartnerID)
    {
      $this->PartnerID = $PartnerID;
      return $this;
    }

}
