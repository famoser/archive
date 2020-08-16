<?php

namespace Famoser\MBOApiWrapper\ClassService;

class WaitlistEntry
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var int $ClassID
     */
    protected $ClassID = null;

    /**
     * @var \DateTime $ClassDate
     */
    protected $ClassDate = null;

    /**
     * @var Client $Client
     */
    protected $Client = null;

    /**
     * @var ClassSchedule $ClassSchedule
     */
    protected $ClassSchedule = null;

    /**
     * @var \DateTime $EnrollmentDateForward
     */
    protected $EnrollmentDateForward = null;

    /**
     * @var \DateTime $RequestDateTime
     */
    protected $RequestDateTime = null;

    /**
     * @var boolean $Web
     */
    protected $Web = null;

    /**
     * @var int $VisitRefNo
     */
    protected $VisitRefNo = null;

    /**
     * @param int $ID
     * @param int $ClassID
     * @param \DateTime $EnrollmentDateForward
     * @param \DateTime $RequestDateTime
     * @param boolean $Web
     * @param int $VisitRefNo
     */
    public function __construct($ID, $ClassID, \DateTime $EnrollmentDateForward, \DateTime $RequestDateTime, $Web, $VisitRefNo)
    {
      $this->ID = $ID;
      $this->ClassID = $ClassID;
      $this->EnrollmentDateForward = $EnrollmentDateForward->format(\DateTime::ATOM);
      $this->RequestDateTime = $RequestDateTime->format(\DateTime::ATOM);
      $this->Web = $Web;
      $this->VisitRefNo = $VisitRefNo;
    }

    /**
     * @return int
     */
    public function getID()
    {
      return $this->ID;
    }

    /**
     * @param int $ID
     * @return \Famoser\MBOApiWrapper\ClassService\WaitlistEntry
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\ClassService\WaitlistEntry
     */
    public function setClassID($ClassID)
    {
      $this->ClassID = $ClassID;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getClassDate()
    {
      if ($this->ClassDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->ClassDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $ClassDate
     * @return \Famoser\MBOApiWrapper\ClassService\WaitlistEntry
     */
    public function setClassDate(\DateTime $ClassDate = null)
    {
      if ($ClassDate == null) {
       $this->ClassDate = null;
      } else {
        $this->ClassDate = $ClassDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return Client
     */
    public function getClient()
    {
      return $this->Client;
    }

    /**
     * @param Client $Client
     * @return \Famoser\MBOApiWrapper\ClassService\WaitlistEntry
     */
    public function setClient($Client)
    {
      $this->Client = $Client;
      return $this;
    }

    /**
     * @return ClassSchedule
     */
    public function getClassSchedule()
    {
      return $this->ClassSchedule;
    }

    /**
     * @param ClassSchedule $ClassSchedule
     * @return \Famoser\MBOApiWrapper\ClassService\WaitlistEntry
     */
    public function setClassSchedule($ClassSchedule)
    {
      $this->ClassSchedule = $ClassSchedule;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEnrollmentDateForward()
    {
      if ($this->EnrollmentDateForward == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EnrollmentDateForward);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EnrollmentDateForward
     * @return \Famoser\MBOApiWrapper\ClassService\WaitlistEntry
     */
    public function setEnrollmentDateForward(\DateTime $EnrollmentDateForward)
    {
      $this->EnrollmentDateForward = $EnrollmentDateForward->format(\DateTime::ATOM);
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getRequestDateTime()
    {
      if ($this->RequestDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->RequestDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $RequestDateTime
     * @return \Famoser\MBOApiWrapper\ClassService\WaitlistEntry
     */
    public function setRequestDateTime(\DateTime $RequestDateTime)
    {
      $this->RequestDateTime = $RequestDateTime->format(\DateTime::ATOM);
      return $this;
    }

    /**
     * @return boolean
     */
    public function getWeb()
    {
      return $this->Web;
    }

    /**
     * @param boolean $Web
     * @return \Famoser\MBOApiWrapper\ClassService\WaitlistEntry
     */
    public function setWeb($Web)
    {
      $this->Web = $Web;
      return $this;
    }

    /**
     * @return int
     */
    public function getVisitRefNo()
    {
      return $this->VisitRefNo;
    }

    /**
     * @param int $VisitRefNo
     * @return \Famoser\MBOApiWrapper\ClassService\WaitlistEntry
     */
    public function setVisitRefNo($VisitRefNo)
    {
      $this->VisitRefNo = $VisitRefNo;
      return $this;
    }

}
