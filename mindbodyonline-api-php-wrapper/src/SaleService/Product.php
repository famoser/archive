<?php

namespace Famoser\MBOApiWrapper\SaleService;

class Product extends Item
{

    /**
     * @var float $Price
     */
    protected $Price = null;

    /**
     * @var float $TaxIncluded
     */
    protected $TaxIncluded = null;

    /**
     * @var float $TaxRate
     */
    protected $TaxRate = null;

    /**
     * @var ActionCode $Action
     */
    protected $Action = null;

    /**
     * @var string $ID
     */
    protected $ID = null;

    /**
     * @var int $GroupID
     */
    protected $GroupID = null;

    /**
     * @var string $Name
     */
    protected $Name = null;

    /**
     * @var float $OnlinePrice
     */
    protected $OnlinePrice = null;

    /**
     * @var string $ShortDesc
     */
    protected $ShortDesc = null;

    /**
     * @var string $LongDesc
     */
    protected $LongDesc = null;

    /**
     * @var Color $Color
     */
    protected $Color = null;

    /**
     * @var Size $Size
     */
    protected $Size = null;

    
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
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setPrice($Price)
    {
      $this->Price = $Price;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setTaxIncluded($TaxIncluded)
    {
      $this->TaxIncluded = $TaxIncluded;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setTaxRate($TaxRate)
    {
      $this->TaxRate = $TaxRate;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Product
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
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setID($ID)
    {
      $this->ID = $ID;
      return $this;
    }

    /**
     * @return int
     */
    public function getGroupID()
    {
      return $this->GroupID;
    }

    /**
     * @param int $GroupID
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setGroupID($GroupID)
    {
      $this->GroupID = $GroupID;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setName($Name)
    {
      $this->Name = $Name;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setOnlinePrice($OnlinePrice)
    {
      $this->OnlinePrice = $OnlinePrice;
      return $this;
    }

    /**
     * @return string
     */
    public function getShortDesc()
    {
      return $this->ShortDesc;
    }

    /**
     * @param string $ShortDesc
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setShortDesc($ShortDesc)
    {
      $this->ShortDesc = $ShortDesc;
      return $this;
    }

    /**
     * @return string
     */
    public function getLongDesc()
    {
      return $this->LongDesc;
    }

    /**
     * @param string $LongDesc
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setLongDesc($LongDesc)
    {
      $this->LongDesc = $LongDesc;
      return $this;
    }

    /**
     * @return Color
     */
    public function getColor()
    {
      return $this->Color;
    }

    /**
     * @param Color $Color
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setColor($Color)
    {
      $this->Color = $Color;
      return $this;
    }

    /**
     * @return Size
     */
    public function getSize()
    {
      return $this->Size;
    }

    /**
     * @param Size $Size
     * @return \Famoser\MBOApiWrapper\SaleService\Product
     */
    public function setSize($Size)
    {
      $this->Size = $Size;
      return $this;
    }

}
