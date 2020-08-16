<?php

namespace Famoser\MBOApiWrapper\SaleService;

class UpdateProductsResult extends MBResult
{

    /**
     * @var ArrayOfProduct $Products
     */
    protected $Products = null;

    /**
     * @param StatusCode $Status
     * @param int $ErrorCode
     * @param XMLDetailLevel $XMLDetail
     * @param int $ResultCount
     * @param int $CurrentPageIndex
     * @param int $TotalPageCount
     */
    public function __construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount)
    {
      parent::__construct($Status, $ErrorCode, $XMLDetail, $ResultCount, $CurrentPageIndex, $TotalPageCount);
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
     * @return \Famoser\MBOApiWrapper\SaleService\UpdateProductsResult
     */
    public function setProducts($Products)
    {
      $this->Products = $Products;
      return $this;
    }

}
