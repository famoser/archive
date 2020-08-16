<?php

namespace Famoser\MBOApiWrapper\SaleService;

class ReturnSaleRequest extends MBRequest
{

    /**
     * @var boolean $Test
     */
    protected $Test = null;

    /**
     * @var int $SaleID
     */
    protected $SaleID = null;

    /**
     * @var string $ReturnReason
     */
    protected $ReturnReason = null;

    /**
     * @param boolean $Test
     */
    public function __construct($Test)
    {
      parent::__construct();
      $this->Test = $Test;
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
     * @return \Famoser\MBOApiWrapper\SaleService\ReturnSaleRequest
     */
    public function setTest($Test)
    {
      $this->Test = $Test;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\SaleService\ReturnSaleRequest
     */
    public function setSaleID($SaleID)
    {
      $this->SaleID = $SaleID;
      return $this;
    }

    /**
     * @return string
     */
    public function getReturnReason()
    {
      return $this->ReturnReason;
    }

    /**
     * @param string $ReturnReason
     * @return \Famoser\MBOApiWrapper\SaleService\ReturnSaleRequest
     */
    public function setReturnReason($ReturnReason)
    {
      $this->ReturnReason = $ReturnReason;
      return $this;
    }

}
