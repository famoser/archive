<?php

namespace Famoser\MBOApiWrapper\ClassService;

class SubstituteClassTeacherRequest extends MBRequest
{

    /**
     * @var int $ClassID
     */
    protected $ClassID = null;

    /**
     * @var int $StaffID
     */
    protected $StaffID = null;

    /**
     * @var boolean $OverrideConflicts
     */
    protected $OverrideConflicts = null;

    /**
     * @var boolean $SendClientEmail
     */
    protected $SendClientEmail = null;

    /**
     * @var boolean $SendOldStaffEmail
     */
    protected $SendOldStaffEmail = null;

    /**
     * @var boolean $SendNewStaffEmail
     */
    protected $SendNewStaffEmail = null;

    /**
     * @param int $ClassID
     * @param int $StaffID
     * @param boolean $OverrideConflicts
     * @param boolean $SendClientEmail
     * @param boolean $SendOldStaffEmail
     * @param boolean $SendNewStaffEmail
     */
    public function __construct($ClassID, $StaffID, $OverrideConflicts, $SendClientEmail, $SendOldStaffEmail, $SendNewStaffEmail)
    {
      parent::__construct();
      $this->ClassID = $ClassID;
      $this->StaffID = $StaffID;
      $this->OverrideConflicts = $OverrideConflicts;
      $this->SendClientEmail = $SendClientEmail;
      $this->SendOldStaffEmail = $SendOldStaffEmail;
      $this->SendNewStaffEmail = $SendNewStaffEmail;
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
     * @return \Famoser\MBOApiWrapper\ClassService\SubstituteClassTeacherRequest
     */
    public function setClassID($ClassID)
    {
      $this->ClassID = $ClassID;
      return $this;
    }

    /**
     * @return int
     */
    public function getStaffID()
    {
      return $this->StaffID;
    }

    /**
     * @param int $StaffID
     * @return \Famoser\MBOApiWrapper\ClassService\SubstituteClassTeacherRequest
     */
    public function setStaffID($StaffID)
    {
      $this->StaffID = $StaffID;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getOverrideConflicts()
    {
      return $this->OverrideConflicts;
    }

    /**
     * @param boolean $OverrideConflicts
     * @return \Famoser\MBOApiWrapper\ClassService\SubstituteClassTeacherRequest
     */
    public function setOverrideConflicts($OverrideConflicts)
    {
      $this->OverrideConflicts = $OverrideConflicts;
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
     * @return \Famoser\MBOApiWrapper\ClassService\SubstituteClassTeacherRequest
     */
    public function setSendClientEmail($SendClientEmail)
    {
      $this->SendClientEmail = $SendClientEmail;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSendOldStaffEmail()
    {
      return $this->SendOldStaffEmail;
    }

    /**
     * @param boolean $SendOldStaffEmail
     * @return \Famoser\MBOApiWrapper\ClassService\SubstituteClassTeacherRequest
     */
    public function setSendOldStaffEmail($SendOldStaffEmail)
    {
      $this->SendOldStaffEmail = $SendOldStaffEmail;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSendNewStaffEmail()
    {
      return $this->SendNewStaffEmail;
    }

    /**
     * @param boolean $SendNewStaffEmail
     * @return \Famoser\MBOApiWrapper\ClassService\SubstituteClassTeacherRequest
     */
    public function setSendNewStaffEmail($SendNewStaffEmail)
    {
      $this->SendNewStaffEmail = $SendNewStaffEmail;
      return $this;
    }

}
