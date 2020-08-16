<?php

namespace Famoser\MBOApiWrapper\SaleService;

class Site
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
     * @var string $Description
     */
    protected $Description = null;

    /**
     * @var string $LogoURL
     */
    protected $LogoURL = null;

    /**
     * @var string $PageColor1
     */
    protected $PageColor1 = null;

    /**
     * @var string $PageColor2
     */
    protected $PageColor2 = null;

    /**
     * @var string $PageColor3
     */
    protected $PageColor3 = null;

    /**
     * @var string $PageColor4
     */
    protected $PageColor4 = null;

    /**
     * @var boolean $AcceptsVisa
     */
    protected $AcceptsVisa = null;

    /**
     * @var boolean $AcceptsDiscover
     */
    protected $AcceptsDiscover = null;

    /**
     * @var boolean $AcceptsMasterCard
     */
    protected $AcceptsMasterCard = null;

    /**
     * @var boolean $AcceptsAmericanExpress
     */
    protected $AcceptsAmericanExpress = null;

    /**
     * @var string $ContactEmail
     */
    protected $ContactEmail = null;

    /**
     * @var boolean $ESA
     */
    protected $ESA = null;

    /**
     * @var boolean $TotalWOD
     */
    protected $TotalWOD = null;

    /**
     * @var boolean $TaxInclusivePrices
     */
    protected $TaxInclusivePrices = null;

    /**
     * @var boolean $SMSPackageEnabled
     */
    protected $SMSPackageEnabled = null;

    /**
     * @var boolean $AllowsDashboardAccess
     */
    protected $AllowsDashboardAccess = null;

    /**
     * @var string $PricingLevel
     */
    protected $PricingLevel = null;

    /**
     * @param int $ID
     */
    public function __construct($ID)
    {
      $this->ID = $ID;
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
     * @return \Famoser\MBOApiWrapper\SaleService\Site
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
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setName($Name)
    {
      $this->Name = $Name;
      return $this;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
      return $this->Description;
    }

    /**
     * @param string $Description
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setDescription($Description)
    {
      $this->Description = $Description;
      return $this;
    }

    /**
     * @return string
     */
    public function getLogoURL()
    {
      return $this->LogoURL;
    }

    /**
     * @param string $LogoURL
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setLogoURL($LogoURL)
    {
      $this->LogoURL = $LogoURL;
      return $this;
    }

    /**
     * @return string
     */
    public function getPageColor1()
    {
      return $this->PageColor1;
    }

    /**
     * @param string $PageColor1
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setPageColor1($PageColor1)
    {
      $this->PageColor1 = $PageColor1;
      return $this;
    }

    /**
     * @return string
     */
    public function getPageColor2()
    {
      return $this->PageColor2;
    }

    /**
     * @param string $PageColor2
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setPageColor2($PageColor2)
    {
      $this->PageColor2 = $PageColor2;
      return $this;
    }

    /**
     * @return string
     */
    public function getPageColor3()
    {
      return $this->PageColor3;
    }

    /**
     * @param string $PageColor3
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setPageColor3($PageColor3)
    {
      $this->PageColor3 = $PageColor3;
      return $this;
    }

    /**
     * @return string
     */
    public function getPageColor4()
    {
      return $this->PageColor4;
    }

    /**
     * @param string $PageColor4
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setPageColor4($PageColor4)
    {
      $this->PageColor4 = $PageColor4;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getAcceptsVisa()
    {
      return $this->AcceptsVisa;
    }

    /**
     * @param boolean $AcceptsVisa
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setAcceptsVisa($AcceptsVisa)
    {
      $this->AcceptsVisa = $AcceptsVisa;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getAcceptsDiscover()
    {
      return $this->AcceptsDiscover;
    }

    /**
     * @param boolean $AcceptsDiscover
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setAcceptsDiscover($AcceptsDiscover)
    {
      $this->AcceptsDiscover = $AcceptsDiscover;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getAcceptsMasterCard()
    {
      return $this->AcceptsMasterCard;
    }

    /**
     * @param boolean $AcceptsMasterCard
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setAcceptsMasterCard($AcceptsMasterCard)
    {
      $this->AcceptsMasterCard = $AcceptsMasterCard;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getAcceptsAmericanExpress()
    {
      return $this->AcceptsAmericanExpress;
    }

    /**
     * @param boolean $AcceptsAmericanExpress
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setAcceptsAmericanExpress($AcceptsAmericanExpress)
    {
      $this->AcceptsAmericanExpress = $AcceptsAmericanExpress;
      return $this;
    }

    /**
     * @return string
     */
    public function getContactEmail()
    {
      return $this->ContactEmail;
    }

    /**
     * @param string $ContactEmail
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setContactEmail($ContactEmail)
    {
      $this->ContactEmail = $ContactEmail;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getESA()
    {
      return $this->ESA;
    }

    /**
     * @param boolean $ESA
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setESA($ESA)
    {
      $this->ESA = $ESA;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getTotalWOD()
    {
      return $this->TotalWOD;
    }

    /**
     * @param boolean $TotalWOD
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setTotalWOD($TotalWOD)
    {
      $this->TotalWOD = $TotalWOD;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getTaxInclusivePrices()
    {
      return $this->TaxInclusivePrices;
    }

    /**
     * @param boolean $TaxInclusivePrices
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setTaxInclusivePrices($TaxInclusivePrices)
    {
      $this->TaxInclusivePrices = $TaxInclusivePrices;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getSMSPackageEnabled()
    {
      return $this->SMSPackageEnabled;
    }

    /**
     * @param boolean $SMSPackageEnabled
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setSMSPackageEnabled($SMSPackageEnabled)
    {
      $this->SMSPackageEnabled = $SMSPackageEnabled;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getAllowsDashboardAccess()
    {
      return $this->AllowsDashboardAccess;
    }

    /**
     * @param boolean $AllowsDashboardAccess
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setAllowsDashboardAccess($AllowsDashboardAccess)
    {
      $this->AllowsDashboardAccess = $AllowsDashboardAccess;
      return $this;
    }

    /**
     * @return string
     */
    public function getPricingLevel()
    {
      return $this->PricingLevel;
    }

    /**
     * @param string $PricingLevel
     * @return \Famoser\MBOApiWrapper\SaleService\Site
     */
    public function setPricingLevel($PricingLevel)
    {
      $this->PricingLevel = $PricingLevel;
      return $this;
    }

}
