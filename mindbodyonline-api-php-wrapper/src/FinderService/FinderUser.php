<?php

namespace Famoser\MBOApiWrapper\FinderService;

class FinderUser extends MBObject
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
     * @var boolean $ChangePasswordNeeded
     */
    protected $ChangePasswordNeeded = null;

    /**
     * @var string $NewPassword
     */
    protected $NewPassword = null;

    /**
     * @var string $FirstName
     */
    protected $FirstName = null;

    /**
     * @var string $LastName
     */
    protected $LastName = null;

    /**
     * @var string $Phone
     */
    protected $Phone = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var ArrayOfClientCreditCard $CreditCards
     */
    protected $CreditCards = null;

    
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderUser
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
     * @return \Famoser\MBOApiWrapper\FinderService\FinderUser
     */
    public function setPassword($Password)
    {
      $this->Password = $Password;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getChangePasswordNeeded()
    {
      return $this->ChangePasswordNeeded;
    }

    /**
     * @param boolean $ChangePasswordNeeded
     * @return \Famoser\MBOApiWrapper\FinderService\FinderUser
     */
    public function setChangePasswordNeeded($ChangePasswordNeeded)
    {
      $this->ChangePasswordNeeded = $ChangePasswordNeeded;
      return $this;
    }

    /**
     * @return string
     */
    public function getNewPassword()
    {
      return $this->NewPassword;
    }

    /**
     * @param string $NewPassword
     * @return \Famoser\MBOApiWrapper\FinderService\FinderUser
     */
    public function setNewPassword($NewPassword)
    {
      $this->NewPassword = $NewPassword;
      return $this;
    }

    /**
     * @return string
     */
    public function getFirstName()
    {
      return $this->FirstName;
    }

    /**
     * @param string $FirstName
     * @return \Famoser\MBOApiWrapper\FinderService\FinderUser
     */
    public function setFirstName($FirstName)
    {
      $this->FirstName = $FirstName;
      return $this;
    }

    /**
     * @return string
     */
    public function getLastName()
    {
      return $this->LastName;
    }

    /**
     * @param string $LastName
     * @return \Famoser\MBOApiWrapper\FinderService\FinderUser
     */
    public function setLastName($LastName)
    {
      $this->LastName = $LastName;
      return $this;
    }

    /**
     * @return string
     */
    public function getPhone()
    {
      return $this->Phone;
    }

    /**
     * @param string $Phone
     * @return \Famoser\MBOApiWrapper\FinderService\FinderUser
     */
    public function setPhone($Phone)
    {
      $this->Phone = $Phone;
      return $this;
    }

    /**
     * @return ActionCode
     */
    public function getAction()
    {
      return $this->Action;
    }

    /**
     * @param ActionCode $Action
     * @return \Famoser\MBOApiWrapper\FinderService\FinderUser
     */
    public function setAction($Action)
    {
      $this->Action = $Action;
      return $this;
    }

    /**
     * @return ArrayOfClientCreditCard
     */
    public function getCreditCards()
    {
      return $this->CreditCards;
    }

    /**
     * @param ArrayOfClientCreditCard $CreditCards
     * @return \Famoser\MBOApiWrapper\FinderService\FinderUser
     */
    public function setCreditCards($CreditCards)
    {
      $this->CreditCards = $CreditCards;
      return $this;
    }

}
