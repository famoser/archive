<?php

namespace Famoser\MBOApiWrapper\ClientService;

class SaleItem extends MBObject
{

    /**
     * @var Sale $Sale
     */
    protected $Sale = null;

    /**
     * @var string $Description
     */
    protected $Description = null;

    /**
     * @var boolean $AccountPayment
     */
    protected $AccountPayment = null;

    /**
     * @var float $Price
     */
    protected $Price = null;

    /**
     * @var float $AmountPaid
     */
    protected $AmountPaid = null;

    /**
     * @var float $Discount
     */
    protected $Discount = null;

    /**
     * @var float $Tax
     */
    protected $Tax = null;

    /**
     * @var boolean $Returned
     */
    protected $Returned = null;

    /**
     * @var int $Quantity
     */
    protected $Quantity = null;

    
    public function __construct()
    {
      parent::__construct();
    }

    /**
     * @return Sale
     */
    public function getSale()
    {
      return $this->Sale;
    }

    /**
     * @param Sale $Sale
     * @return \Famoser\MBOApiWrapper\ClientService\SaleItem
     */
    public function setSale($Sale)
    {
      $this->Sale = $Sale;
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
     * @return \Famoser\MBOApiWrapper\ClientService\SaleItem
     */
    public function setDescription($Description)
    {
      $this->Description = $Description;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getAccountPayment()
    {
      return $this->AccountPayment;
    }

    /**
     * @param boolean $AccountPayment
     * @return \Famoser\MBOApiWrapper\ClientService\SaleItem
     */
    public function setAccountPayment($AccountPayment)
    {
      $this->AccountPayment = $AccountPayment;
      return $this;
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
     * @return \Famoser\MBOApiWrapper\ClientService\SaleItem
     */
    public function setPrice($Price)
    {
      $this->Price = $Price;
      return $this;
    }

    /**
     * @return float
     */
    public function getAmountPaid()
    {
      return $this->AmountPaid;
    }

    /**
     * @param float $AmountPaid
     * @return \Famoser\MBOApiWrapper\ClientService\SaleItem
     */
    public function setAmountPaid($AmountPaid)
    {
      $this->AmountPaid = $AmountPaid;
      return $this;
    }

    /**
     * @return float
     */
    public function getDiscount()
    {
      return $this->Discount;
    }

    /**
     * @param float $Discount
     * @return \Famoser\MBOApiWrapper\ClientService\SaleItem
     */
    public function setDiscount($Discount)
    {
      $this->Discount = $Discount;
      return $this;
    }

    /**
     * @return float
     */
    public function getTax()
    {
      return $this->Tax;
    }

    /**
     * @param float $Tax
     * @return \Famoser\MBOApiWrapper\ClientService\SaleItem
     */
    public function setTax($Tax)
    {
      $this->Tax = $Tax;
      return $this;
    }

    /**
     * @return boolean
     */
    public function getReturned()
    {
      return $this->Returned;
    }

    /**
     * @param boolean $Returned
     * @return \Famoser\MBOApiWrapper\ClientService\SaleItem
     */
    public function setReturned($Returned)
    {
      $this->Returned = $Returned;
      return $this;
    }

    /**
     * @return int
     */
    public function getQuantity()
    {
      return $this->Quantity;
    }

    /**
     * @param int $Quantity
     * @return \Famoser\MBOApiWrapper\ClientService\SaleItem
     */
    public function setQuantity($Quantity)
    {
      $this->Quantity = $Quantity;
      return $this;
    }

}
