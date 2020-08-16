<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetProductsRequest extends MBRequest
{

    /**
     * @var ArrayOfString $ProductIDs
     */
    protected $ProductIDs = null;

    /**
     * @var string $SearchText
     */
    protected $SearchText = null;

    /**
     * @var string $SearchDomain
     */
    protected $SearchDomain = null;

    /**
     * @var ArrayOfInt $CategoryIDs
     */
    protected $CategoryIDs = null;

    /**
     * @var ArrayOfInt $SubCategoryIDs
     */
    protected $SubCategoryIDs = null;

    /**
     * @var boolean $SellOnline
     */
    protected $SellOnline = null;

    /**
     * @var int $LocationID
     */
    protected $LocationID = null;

    /**
     * @param boolean $SellOnline
     */
    public function __construct($SellOnline)
    {
      parent::__construct();
      $this->SellOnline = $SellOnline;
    }

    /**
     * @return ArrayOfString
     */
    public function getProductIDs()
    {
      return $this->ProductIDs;
    }

    /**
     * @param ArrayOfString $ProductIDs
     * @return \Famoser\MBOApiWrapper\SaleService\GetProductsRequest
     */
    public function setProductIDs($ProductIDs)
    {
      $this->ProductIDs = $ProductIDs;
      return $this;
    }

    /**
     * @return string
     */
    public function getSearchText()
    {
      return $this->SearchText;
    }

    /**
     * @param string $SearchText
     * @return \Famoser\MBOApiWrapper\SaleService\GetProductsRequest
     */
    public function setSearchText($SearchText)
    {
      $this->SearchText = $SearchText;
      return $this;
    }

    /**
     * @return string
     */
    public function getSearchDomain()
    {
      return $this->SearchDomain;
    }

    /**
     * @param string $SearchDomain
     * @return \Famoser\MBOApiWrapper\SaleService\GetProductsRequest
     */
    public function setSearchDomain($SearchDomain)
    {
      $this->SearchDomain = $SearchDomain;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getCategoryIDs()
    {
      return $this->CategoryIDs;
    }

    /**
     * @param ArrayOfInt $CategoryIDs
     * @return \Famoser\MBOApiWrapper\SaleService\GetProductsRequest
     */
    public function setCategoryIDs($CategoryIDs)
    {
      $this->CategoryIDs = $CategoryIDs;
      return $this;
    }

    /**
     * @return ArrayOfInt
     */
    public function getSubCategoryIDs()
    {
      return $this->SubCategoryIDs;
    }

    /**
     * @param ArrayOfInt $SubCategoryIDs
     * @return \Famoser\MBOApiWrapper\SaleService\GetProductsRequest
     */
    public function setSubCategoryIDs($SubCategoryIDs)
    {
      $this->SubCategoryIDs = $SubCategoryIDs;
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
     * @return \Famoser\MBOApiWrapper\SaleService\GetProductsRequest
     */
    public function setSellOnline($SellOnline)
    {
      $this->SellOnline = $SellOnline;
      return $this;
    }

    /**
     * @return int
     */
    public function getLocationID()
    {
      return $this->LocationID;
    }

    /**
     * @param int $LocationID
     * @return \Famoser\MBOApiWrapper\SaleService\GetProductsRequest
     */
    public function setLocationID($LocationID)
    {
      $this->LocationID = $LocationID;
      return $this;
    }

}
