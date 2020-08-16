<?php

namespace Famoser\MBOApiWrapper\FinderService;

class AddOrUpdateFinderUsersRequest extends MBRequest
{

    /**
     * @var string $UpdateAction
     */
    protected $UpdateAction = null;

    /**
     * @var boolean $Test
     */
    protected $Test = null;

    /**
     * @var boolean $NoClientEmail
     */
    protected $NoClientEmail = null;

    /**
     * @var int $PartnerID
     */
    protected $PartnerID = null;

    /**
     * @var ArrayOfFinderUser $FinderUsers
     */
    protected $FinderUsers = null;

    /**
     * @param int $PartnerID
     */
    public function __construct($PartnerID)
    {
      parent::__construct();
      $this->PartnerID = $PartnerID;
    }

    /**
     * @return string
     */
    public function getUpdateAction()
    {
      return $this->UpdateAction;
    }

    /**
     * @param string $UpdateAction
     * @return \Famoser\MBOApiWrapper\FinderService\AddOrUpdateFinderUsersRequest
     */
    public function setUpdateAction($UpdateAction)
    {
      $this->UpdateAction = $UpdateAction;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getTest()
    {
      return $this->Test;
    }

    /**
     * @param boolean $Test
     * @return \Famoser\MBOApiWrapper\FinderService\AddOrUpdateFinderUsersRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getNoClientEmail()
    {
      return $this->NoClientEmail;
    }

    /**
     * @param boolean $NoClientEmail
     * @return \Famoser\MBOApiWrapper\FinderService\AddOrUpdateFinderUsersRequest
     */
    public function setNoClientEmail($NoClientEmail)
    {
      $this->NoClientEmail = $NoClientEmail;
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
     * @return \Famoser\MBOApiWrapper\FinderService\AddOrUpdateFinderUsersRequest
     */
    public function setPartnerID($PartnerID)
    {
      $this->PartnerID = $PartnerID;
      return $this;
    }

    /**
     * @return ArrayOfFinderUser
     */
    public function getFinderUsers()
    {
      return $this->FinderUsers;
    }

    /**
     * @param ArrayOfFinderUser $FinderUsers
     * @return \Famoser\MBOApiWrapper\FinderService\AddOrUpdateFinderUsersRequest
     */
    public function setFinderUsers($FinderUsers)
    {
      $this->FinderUsers = $FinderUsers;
      return $this;
    }

}
