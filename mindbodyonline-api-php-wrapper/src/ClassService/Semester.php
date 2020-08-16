<?php

namespace Famoser\MBOApiWrapper\ClassService;

class Semester
{

    /**
     * @var int $ID
     */
    protected $ID = null;

    /**
     * @var string $Name
     */
    protected $Name = null;

    /**
     * @var string $Description
     */
    protected $Description = null;

    /**
     * @var \DateTime $StartDate
     */
    protected $StartDate = null;

    /**
     * @var \DateTime $EndDate
     */
    protected $EndDate = null;

    /**
     * @var float $MultiRegistrationDiscount
     */
    protected $MultiRegistrationDiscount = null;

    /**
     * @var \DateTime $MultiRegistrationDeadline
     */
    protected $MultiRegistrationDeadline = null;

    /**
     * @param int $ID
     * @param \DateTime $StartDate
     * @param \DateTime $EndDate
     * @param float $MultiRegistrationDiscount
     * @param \DateTime $MultiRegistrationDeadline
     */
    public function __construct($ID, \DateTime $StartDate, \DateTime $EndDate, $MultiRegistrationDiscount, \DateTime $MultiRegistrationDeadline)
    {
      $this->ID = $ID;
      $this->StartDate = $StartDate->format(\DateTime::ATOM);
      $this->EndDate = $EndDate->format(\DateTime::ATOM);
      $this->MultiRegistrationDiscount = $MultiRegistrationDiscount;
      $this->MultiRegistrationDeadline = $MultiRegistrationDeadline->format(\DateTime::ATOM);
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
     * @return \Famoser\MBOApiWrapper\ClassService\Semester
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return string
     */
    public function getName()
    {
      return $this->Name;
    }

    /**
     * @param string $Name
     * @return \Famoser\MBOApiWrapper\ClassService\Semester
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
      return $this->Description;
    }

    /**
     * @param string $Description
     * @return \Famoser\MBOApiWrapper\ClassService\Semester
     */
    public function setDescription($Description)
    {
      $this->Description = $Description;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getStartDate()
    {
      if ($this->StartDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->StartDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $StartDate
     * @return \Famoser\MBOApiWrapper\ClassService\Semester
     */
    public function setStartDate(\DateTime $StartDate)
    {
      $this->StartDate = $StartDate->format(\DateTime::ATOM);
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEndDate()
    {
      if ($this->EndDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EndDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EndDate
     * @return \Famoser\MBOApiWrapper\ClassService\Semester
     */
    public function setEndDate(\DateTime $EndDate)
    {
      $this->EndDate = $EndDate->format(\DateTime::ATOM);
      return $this;
    }

    /**
     * @return float
     */
    public function getMultiRegistrationDiscount()
    {
      return $this->MultiRegistrationDiscount;
    }

    /**
     * @param float $MultiRegistrationDiscount
     * @return \Famoser\MBOApiWrapper\ClassService\Semester
     */
    public function setMultiRegistrationDiscount($MultiRegistrationDiscount)
    {
      $this->MultiRegistrationDiscount = $MultiRegistrationDiscount;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getMultiRegistrationDeadline()
    {
      if ($this->MultiRegistrationDeadline == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->MultiRegistrationDeadline);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $MultiRegistrationDeadline
     * @return \Famoser\MBOApiWrapper\ClassService\Semester
     */
    public function setMultiRegistrationDeadline(\DateTime $MultiRegistrationDeadline)
    {
      $this->MultiRegistrationDeadline = $MultiRegistrationDeadline->format(\DateTime::ATOM);
      return $this;
    }

}
