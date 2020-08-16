<?php

namespace Famoser\MBOApiWrapper\ClassService;

class CancelSingleClassRequest extends MBRequest
{

    /**
     * @var int $ClassID
     */
    protected $ClassID = null;

    /**
     * @var boolean $HideCancel
     */
    protected $HideCancel = null;

    /**
     * @var boolean $SendClientEmail
     */
    protected $SendClientEmail = null;

    /**
     * @var boolean $SendStaffEmail
     */
    protected $SendStaffEmail = null;

    /**
     * @param int $ClassID
     * @param boolean $HideCancel
     * @param boolean $SendClientEmail
     * @param boolean $SendStaffEmail
     */
    public function __construct($ClassID, $HideCancel, $SendClientEmail, $SendStaffEmail)
    {
      parent::__construct();
      $this->ClassID = $ClassID;
      $this->HideCancel = $HideCancel;
      $this->SendClientEmail = $SendClientEmail;
      $this->SendStaffEmail = $SendStaffEmail;
    }

    /**
     * @return int
     */
    public function getClassID()
    {
      return $this->ClassID;
    }

    /**
     * @param int $ClassID
     * @return \Famoser\MBOApiWrapper\ClassService\CancelSingleClassRequest
     */
    public function setClassID($ClassID)
    {
      $this->ClassID = $ClassID;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getHideCancel()
    {
      return $this->HideCancel;
    }

    /**
     * @param boolean $HideCancel
     * @return \Famoser\MBOApiWrapper\ClassService\CancelSingleClassRequest
     */
    public function setHideCancel($HideCancel)
    {
      $this->HideCancel = $HideCancel;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSendClientEmail()
    {
      return $this->SendClientEmail;
    }

    /**
     * @param boolean $SendClientEmail
     * @return \Famoser\MBOApiWrapper\ClassService\CancelSingleClassRequest
     */
    public function setSendClientEmail($SendClientEmail)
    {
      $this->SendClientEmail = $SendClientEmail;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSendStaffEmail()
    {
      return $this->SendStaffEmail;
    }

    /**
     * @param boolean $SendStaffEmail
     * @return \Famoser\MBOApiWrapper\ClassService\CancelSingleClassRequest
     */
    public function setSendStaffEmail($SendStaffEmail)
    {
      $this->SendStaffEmail = $SendStaffEmail;
      return $this;
    }

}
