<?php

namespace Famoser\MBOApiWrapper\SaleService;

class UpdateSaleDateRequest extends MBRequest
{

    /**
     * @var int $SaleID
     */
    protected $SaleID = null;

    /**
     * @var \DateTime $SaleDate
     */
    protected $SaleDate = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return int
     */
    public function getSaleID()
    {
      return $this->SaleID;
    }

    /**
     * @param int $SaleID
     * @return \Famoser\MBOApiWrapper\SaleService\UpdateSaleDateRequest
     */
    public function setSaleID($SaleID)
    {
      $this->SaleID = $SaleID;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getSaleDate()
    {
      if ($this->SaleDate == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->SaleDate);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $SaleDate
     * @return \Famoser\MBOApiWrapper\SaleService\UpdateSaleDateRequest
     */
    public function setSaleDate(\DateTime $SaleDate = null)
    {
      if ($SaleDate == null) {
       $this->SaleDate = null;
      } else {
        $this->SaleDate = $SaleDate->format(\DateTime::ATOM);
      }
      return $this;
    }

}
