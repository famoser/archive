<?php

namespace Famoser\MBOApiWrapper\ClassService;

class GetClassDescriptionsRequest extends MBRequest
{

    /**
     * @var ArrayOfInt $ClassDescriptionIDs
     */
    protected $ClassDescriptionIDs = null;

    /**
     * @var ArrayOfInt $ProgramIDs
     */
    protected $ProgramIDs = null;

    /**
     * @var ArrayOfLong $StaffIDs
     */
    protected $StaffIDs = null;

    /**
     * @var ArrayOfInt $LocationIDs
     */
    protected $LocationIDs = null;

    /**
     * @var \DateTime $StartClassDateTime
     */
    protected $StartClassDateTime = null;

    /**
     * @var \DateTime $EndClassDateTime
     */
    protected $EndClassDateTime = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return ArrayOfInt
     */
    public function getClassDescriptionIDs()
    {
      return $this->ClassDescriptionIDs;
    }

    /**
     * @param ArrayOfInt $ClassDescriptionIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassDescriptionsRequest
     */
    public function setClassDescriptionIDs($ClassDescriptionIDs)
    {
      $this->ClassDescriptionIDs = $ClassDescriptionIDs;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassDescriptionsRequest
     */
    public function setProgramIDs($ProgramIDs)
    {
      $this->ProgramIDs = $ProgramIDs;
      return $this;
    }

    /**
     * @return ArrayOfLong
     */
    public function getStaffIDs()
    {
      return $this->StaffIDs;
    }

    /**
     * @param ArrayOfLong $StaffIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassDescriptionsRequest
     */
    public function setStaffIDs($StaffIDs)
    {
      $this->StaffIDs = $StaffIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getLocationIDs()
    {
      return $this->LocationIDs;
    }

    /**
     * @param ArrayOfInt $LocationIDs
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassDescriptionsRequest
     */
    public function setLocationIDs($LocationIDs)
    {
      $this->LocationIDs = $LocationIDs;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getStartClassDateTime()
    {
      if ($this->StartClassDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->StartClassDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $StartClassDateTime
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassDescriptionsRequest
     */
    public function setStartClassDateTime(\DateTime $StartClassDateTime = null)
    {
      if ($StartClassDateTime == null) {
       $this->StartClassDateTime = null;
      } else {
        $this->StartClassDateTime = $StartClassDateTime->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEndClassDateTime()
    {
      if ($this->EndClassDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EndClassDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EndClassDateTime
     * @return \Famoser\MBOApiWrapper\ClassService\GetClassDescriptionsRequest
     */
    public function setEndClassDateTime(\DateTime $EndClassDateTime = null)
    {
      if ($EndClassDateTime == null) {
       $this->EndClassDateTime = null;
      } else {
        $this->EndClassDateTime = $EndClassDateTime->format(\DateTime::ATOM);
      }
      return $this;
    }

}
