<?php

namespace Famoser\MBOApiWrapper\FinderService;

class SendFinderUserNewPasswordRequest extends MBRequest
{

    /**
     * @var string $Email
     */
    protected $Email = null;

    
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
     * @return \Famoser\MBOApiWrapper\FinderService\SendFinderUserNewPasswordRequest
     */
    public function setEmail($Email)
    {
      $this->Email = $Email;
      return $this;
    }

}
