<?php

namespace Famoser\MBOApiWrapper\SaleService;

class Service extends Item
{

    /**
     * @var float $Price
     */
    protected $Price = null;

    /**
     * @var float $OnlinePrice
     */
    protected $OnlinePrice = null;

    /**
     * @var float $TaxIncluded
     */
    protected $TaxIncluded = null;

    /**
     * @var int $ProgramID
     */
    protected $ProgramID = null;

    /**
     * @var float $TaxRate
     */
    protected $TaxRate = null;

    /**
     * @var float $ProductID
     */
    protected $ProductID = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var string $ID
     */
    protected $ID = null;

    /**
     * @var string $Name
     */
    protected $Name = null;

    /**
     * @var int $Count
     */
    protected $Count = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return float
     */
    public function getPrice()
    {
      return $this->Price;
    }

    /**
     * @param float $Price
     * @return \Famoser\MBOApiWrapper\SaleService\Service
     */
    public function setPrice($Price)
    {
      $this->Price = $Price;
      return $this;
    }

    /**
     * @return float
     */
    public function getOnlinePrice()
    {
      return $this->OnlinePrice;
    }

    /**
     * @param float $OnlinePrice
     * @return \Famoser\MBOApiWrapper\SaleService\Service
     */
    public function setOnlinePrice($OnlinePrice)
    {
      $this->OnlinePrice = $OnlinePrice;
      return $this;
    }

    /**
     * @return float
     */
    public function getTaxIncluded()
    {
      return $this->TaxIncluded;
    }

    /**
     * @param float $TaxIncluded
     * @return \Famoser\MBOApiWrapper\SaleService\Service
     */
    public function setTaxIncluded($TaxIncluded)
    {
      $this->TaxIncluded = $TaxIncluded;
      return $this;
    }

    /**
     * @return int
     */
    public function getProgramID()
    {
      return $this->ProgramID;
    }

    /**
     * @param int $ProgramID
     * @return \Famoser\MBOApiWrapper\SaleService\Service
     */
    public function setProgramID($ProgramID)
    {
      $this->ProgramID = $ProgramID;
      return $this;
    }

    /**
     * @return float
     */
    public function getTaxRate()
    {
      return $this->TaxRate;
    }

    /**
     * @param float $TaxRate
     * @return \Famoser\MBOApiWrapper\SaleService\Service
     */
    public function setTaxRate($TaxRate)
    {
      $this->TaxRate = $TaxRate;
      return $this;
    }

    /**
     * @return float
     */
    public function getProductID()
    {
      return $this->ProductID;
    }

    /**
     * @param float $ProductID
     * @return \Famoser\MBOApiWrapper\SaleService\Service
     */
    public function setProductID($ProductID)
    {
      $this->ProductID = $ProductID;
      return $this;
    }

    /**
     * @return ActionCode
     */
    public function getAction()
    {
      return $this->Action;
    }

    /**
     * @param ActionCode $Action
     * @return \Famoser\MBOApiWrapper\SaleService\Service
     */
    public function setAction($Action)
    {
      $this->Action = $Action;
      return $this;
    }

    /**
     * @return string
     */
    public function getID()
    {
      return $this->ID;
    }

    /**
     * @param string $ID
     * @return \Famoser\MBOApiWrapper\SaleService\Service
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
     * @return \Famoser\MBOApiWrapper\SaleService\Service
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

    /**
     * @return int
     */
    public function getCount()
    {
      return $this->Count;
    }

    /**
     * @param int $Count
     * @return \Famoser\MBOApiWrapper\SaleService\Service
     */
    public function setCount($Count)
    {
      $this->Count = $Count;
      return $this;
    }

}
