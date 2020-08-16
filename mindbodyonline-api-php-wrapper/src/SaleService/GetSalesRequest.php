<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetSalesRequest extends MBRequest
{

    /**
     * @var int $SaleID
     */
    protected $SaleID = null;

    /**
     * @var \DateTime $StartSaleDateTime
     */
    protected $StartSaleDateTime = null;

    /**
     * @var \DateTime $EndSaleDateTime
     */
    protected $EndSaleDateTime = null;

    /**
     * @var int $PaymentMethodID
     */
    protected $PaymentMethodID = null;

    
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
     * @return \Famoser\MBOApiWrapper\SaleService\GetSalesRequest
     */
    public function setSaleID($SaleID)
    {
      $this->SaleID = $SaleID;
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getStartSaleDateTime()
    {
      if ($this->StartSaleDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->StartSaleDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $StartSaleDateTime
     * @return \Famoser\MBOApiWrapper\SaleService\GetSalesRequest
     */
    public function setStartSaleDateTime(\DateTime $StartSaleDateTime = null)
    {
      if ($StartSaleDateTime == null) {
       $this->StartSaleDateTime = null;
      } else {
        $this->StartSaleDateTime = $StartSaleDateTime->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return \DateTime
     */
    public function getEndSaleDateTime()
    {
      if ($this->EndSaleDateTime == null) {
        return null;
      } else {
        try {
          return new \DateTime($this->EndSaleDateTime);
        } catch (\Exception $e) {
          return false;
        }
      }
    }

    /**
     * @param \DateTime $EndSaleDateTime
     * @return \Famoser\MBOApiWrapper\SaleService\GetSalesRequest
     */
    public function setEndSaleDateTime(\DateTime $EndSaleDateTime = null)
    {
      if ($EndSaleDateTime == null) {
       $this->EndSaleDateTime = null;
      } else {
        $this->EndSaleDateTime = $EndSaleDateTime->format(\DateTime::ATOM);
      }
      return $this;
    }

    /**
     * @return int
     */
    public function getPaymentMethodID()
    {
      return $this->PaymentMethodID;
    }

    /**
     * @param int $PaymentMethodID
     * @return \Famoser\MBOApiWrapper\SaleService\GetSalesRequest
     */
    public function setPaymentMethodID($PaymentMethodID)
    {
      $this->PaymentMethodID = $PaymentMethodID;
      return $this;
    }

}
