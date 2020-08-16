<?php

namespace Famoser\MBOApiWrapper\FinderService;

class Package extends Item
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
     * @var float $DiscountPercentage
     */
    protected $DiscountPercentage = null;

    /**
     * @var boolean $SellOnline
     */
    protected $SellOnline = null;

    /**
     * @var ArrayOfService $Services
     */
    protected $Services = null;

    /**
     * @var ArrayOfProduct $Products
     */
    protected $Products = null;

    /**
     * @param int $ID
     * @param float $DiscountPercentage
     * @param boolean $SellOnline
     */
    public function __construct($ID, $DiscountPercentage, $SellOnline)
    {
      parent::__construct();
      $this->ID = $ID;
      $this->DiscountPercentage = $DiscountPercentage;
      $this->SellOnline = $SellOnline;
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
     * @return \Famoser\MBOApiWrapper\FinderService\Package
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
     * @return \Famoser\MBOApiWrapper\FinderService\Package
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

    /**
     * @return float
     */
    public function getDiscountPercentage()
    {
      return $this->DiscountPercentage;
    }

    /**
     * @param float $DiscountPercentage
     * @return \Famoser\MBOApiWrapper\FinderService\Package
     */
    public function setDiscountPercentage($DiscountPercentage)
    {
      $this->DiscountPercentage = $DiscountPercentage;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSellOnline()
    {
      return $this->SellOnline;
    }

    /**
     * @param boolean $SellOnline
     * @return \Famoser\MBOApiWrapper\FinderService\Package
     */
    public function setSellOnline($SellOnline)
    {
      $this->SellOnline = $SellOnline;
      return $this;
    }

    /**
     * @return ArrayOfService
     */
    public function getServices()
    {
      return $this->Services;
    }

    /**
     * @param ArrayOfService $Services
     * @return \Famoser\MBOApiWrapper\FinderService\Package
     */
    public function setServices($Services)
    {
      $this->Services = $Services;
      return $this;
    }

    /**
     * @return ArrayOfProduct
     */
    public function getProducts()
    {
      return $this->Products;
    }

    /**
     * @param ArrayOfProduct $Products
     * @return \Famoser\MBOApiWrapper\FinderService\Package
     */
    public function setProducts($Products)
    {
      $this->Products = $Products;
      return $this;
    }

}
