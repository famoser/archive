<?php

namespace Famoser\MBOApiWrapper\ClassService;

class AddClientsToEnrollmentsRequest extends MBRequest
{

    /**
     * @var ArrayOfString $ClientIDs
     */
    protected $ClientIDs = null;

    /**
     * @var ArrayOfInt $ClassScheduleIDs
     */
    protected $ClassScheduleIDs = null;

    /**
     * @var ArrayOfInt $CourseIDs
     */
    protected $CourseIDs = null;

    /**
     * @var \DateTime $EnrollDateForward
     */
    protected $EnrollDateForward = null;

    /**
     * @var ArrayOfDateTime $EnrollOpen
     */
    protected $EnrollOpen = null;

    /**
     * @var boolean $Test
     */
    protected $Test = null;

    /**
     * @var boolean $SendEmail
     */
    protected $SendEmail = null;

    /**
     * @var boolean $Waitlist
     */
    protected $Waitlist = null;

    /**
     * @var int $WaitlistEntryID
     */
    protected $WaitlistEntryID = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return ArrayOfString
     */
    public function getClientIDs()
    {
      return $this->ClientIDs;
    }

    /**
     * @param ArrayOfString $ClientIDs
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsRequest
     */
    public function setClientIDs($ClientIDs)
    {
      $this->ClientIDs = $ClientIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getClassScheduleIDs()
    {
      return $this->ClassScheduleIDs;
    }

    /**
     * @param ArrayOfInt $ClassScheduleIDs
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsRequest
     */
    public function setClassScheduleIDs($ClassScheduleIDs)
    {
      $this->ClassScheduleIDs = $ClassScheduleIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getCourseIDs()
    {
      return $this->CourseIDs;
    }

    /**
     * @param ArrayOfInt $CourseIDs
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsRequest
     */
    public function setCourseIDs($CourseIDs)
    {
      $this->CourseIDs = $CourseIDs;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEnrollDateForward()
    {
      if ($this->EnrollDateForward == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EnrollDateForward);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EnrollDateForward
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsRequest
     */
    public function setEnrollDateForward(\DateTime $EnrollDateForward = null)
    {
      if ($EnrollDateForward == null) {
       $this->EnrollDateForward = null;
      } else {
        $this->EnrollDateForward = $EnrollDateForward->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return ArrayOfDateTime
     */
    public function getEnrollOpen()
    {
      return $this->EnrollOpen;
    }

    /**
     * @param ArrayOfDateTime $EnrollOpen
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsRequest
     */
    public function setEnrollOpen($EnrollOpen)
    {
      $this->EnrollOpen = $EnrollOpen;
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
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSendEmail()
    {
      return $this->SendEmail;
    }

    /**
     * @param boolean $SendEmail
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsRequest
     */
    public function setSendEmail($SendEmail)
    {
      $this->SendEmail = $SendEmail;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getWaitlist()
    {
      return $this->Waitlist;
    }

    /**
     * @param boolean $Waitlist
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsRequest
     */
    public function setWaitlist($Waitlist)
    {
      $this->Waitlist = $Waitlist;
      return $this;
    }

    /**
     * @return int
     */
    public function getWaitlistEntryID()
    {
      return $this->WaitlistEntryID;
    }

    /**
     * @param int $WaitlistEntryID
     * @return \Famoser\MBOApiWrapper\ClassService\AddClientsToEnrollmentsRequest
     */
    public function setWaitlistEntryID($WaitlistEntryID)
    {
      $this->WaitlistEntryID = $WaitlistEntryID;
      return $this;
    }

}
