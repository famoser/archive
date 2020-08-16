<?php

namespace Famoser\MBOApiWrapper\StaffService;

class AddOrUpdateStaffRequest extends MBRequest
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
     * @var ArrayOfStaff $Staff
     */
    protected $Staff = null;

    
    public function __construct()
    {
      parent::__construct();
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
     * @return \Famoser\MBOApiWrapper\StaffService\AddOrUpdateStaffRequest
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
     * @return \Famoser\MBOApiWrapper\StaffService\AddOrUpdateStaffRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
      return $this;
    }

    /**
     * @return ArrayOfStaff
     */
    public function getStaff()
    {
      return $this->Staff;
    }

    /**
     * @param ArrayOfStaff $Staff
     * @return \Famoser\MBOApiWrapper\StaffService\AddOrUpdateStaffRequest
     */
    public function setStaff($Staff)
    {
      $this->Staff = $Staff;
      return $this;
    }

}
