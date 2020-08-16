<?php

namespace Famoser\MBOApiWrapper\SaleService;

class GetPackagesRequest extends MBRequest
{

    /**
     * @var ArrayOfInt $PackageIDs
     */
    protected $PackageIDs = null;

    /**
     * @var boolean $SellOnline
     */
    protected $SellOnline = null;

    /**
     * @param boolean $SellOnline
     */
    public function __construct($SellOnline)
    {
      parent::__construct();
      $this->SellOnline = $SellOnline;
    }

    /**
     * @return ArrayOfInt
     */
    public function getPackageIDs()
    {
      return $this->PackageIDs;
    }

    /**
     * @param ArrayOfInt $PackageIDs
     * @return \Famoser\MBOApiWrapper\SaleService\GetPackagesRequest
     */
    public function setPackageIDs($PackageIDs)
    {
      $this->PackageIDs = $PackageIDs;
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
     * @return \Famoser\MBOApiWrapper\SaleService\GetPackagesRequest
     */
    public function setSellOnline($SellOnline)
    {
      $this->SellOnline = $SellOnline;
      return $this;
    }

}
