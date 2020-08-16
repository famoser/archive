<?php

namespace Famoser\MBOApiWrapper\FinderService;

class Liability
{

    /**
     * @var boolean $IsReleased
     */
    protected $IsReleased = null;

    /**
     * @var \DateTime $AgreementDate
     */
    protected $AgreementDate = null;

    /**
     * @var int $ReleasedBy
     */
    protected $ReleasedBy = null;

    /**
     * @param boolean $IsReleased
     */
    public function __construct($IsReleased)
    {
      $this->IsReleased = $IsReleased;
    }

    /**
     * @return boolean
     */
    public function getIsReleased()
    {
      return $this->IsReleased;
    }

    /**
     * @param boolean $IsReleased
     * @return \Famoser\MBOApiWrapper\FinderService\Liability
     */
    public function setIsReleased($IsReleased)
    {
      $this->IsReleased = $IsReleased;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getAgreementDate()
    {
      if ($this->AgreementDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->AgreementDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $AgreementDate
     * @return \Famoser\MBOApiWrapper\FinderService\Liability
     */
    public function setAgreementDate(\DateTime $AgreementDate = null)
    {
      if ($AgreementDate == null) {
       $this->AgreementDate = null;
      } else {
        $this->AgreementDate = $AgreementDate->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return int
     */
    public function getReleasedBy()
    {
      return $this->ReleasedBy;
    }

    /**
     * @param int $ReleasedBy
     * @return \Famoser\MBOApiWrapper\FinderService\Liability
     */
    public function setReleasedBy($ReleasedBy)
    {
      $this->ReleasedBy = $ReleasedBy;
      return $this;
    }

}
