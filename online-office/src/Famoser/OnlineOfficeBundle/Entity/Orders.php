<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Order
 *
 * @ORM\Entity
 */
class Order
{
    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     */
    private $orderDate;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $orderNumber;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     */
    private $paymentDueDate;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @var float
     *
     * @ORM\Column(type="float", precision=10, scale=0)
     */
    private $discount;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    private $discountCurrency;

    /**
     * @var integer
     *
     * @ORM\Column(type="integer")
     */
    private $discountCode;

    /**
     * @var \Invoices
     *
     * @ORM\ManyToOne(targetEntity="Invoices")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $partOfInvoice;

    /**
     * @var \Addresses
     *
     * @ORM\ManyToOne(targetEntity="Addresses")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $billingAddress;

    /**
     * @var \Persons
     *
     * @ORM\ManyToOne(targetEntity="Persons")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $customer;

    /**
     * @var \OrderStati
     *
     * @ORM\ManyToOne(targetEntity="OrderStati")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $orderStatus;



    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set orderDate
     *
     * @param \DateTime $orderDate
     *
     * @return Orders
     */
    public function setOrderDate($orderDate)
    {
        $this->orderDate = $orderDate;

        return $this;
    }

    /**
     * Get orderDate
     *
     * @return \DateTime
     */
    public function getOrderDate()
    {
        return $this->orderDate;
    }

    /**
     * Set orderNumber
     *
     * @param string $orderNumber
     *
     * @return Orders
     */
    public function setOrderNumber($orderNumber)
    {
        $this->orderNumber = $orderNumber;

        return $this;
    }

    /**
     * Get orderNumber
     *
     * @return string
     */
    public function getOrderNumber()
    {
        return $this->orderNumber;
    }

    /**
     * Set paymentDueDate
     *
     * @param \DateTime $paymentDueDate
     *
     * @return Orders
     */
    public function setPaymentDueDate($paymentDueDate)
    {
        $this->paymentDueDate = $paymentDueDate;

        return $this;
    }

    /**
     * Get paymentDueDate
     *
     * @return \DateTime
     */
    public function getPaymentDueDate()
    {
        return $this->paymentDueDate;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Orders
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set discount
     *
     * @param float $discount
     *
     * @return Orders
     */
    public function setDiscount($discount)
    {
        $this->discount = $discount;

        return $this;
    }

    /**
     * Get discount
     *
     * @return float
     */
    public function getDiscount()
    {
        return $this->discount;
    }

    /**
     * Set discountCurrency
     *
     * @param integer $discountCurrency
     *
     * @return Orders
     */
    public function setDiscountCurrency($discountCurrency)
    {
        $this->discountCurrency = $discountCurrency;

        return $this;
    }

    /**
     * Get discountCurrency
     *
     * @return integer
     */
    public function getDiscountCurrency()
    {
        return $this->discountCurrency;
    }

    /**
     * Set discountCode
     *
     * @param integer $discountCode
     *
     * @return Orders
     */
    public function setDiscountCode($discountCode)
    {
        $this->discountCode = $discountCode;

        return $this;
    }

    /**
     * Get discountCode
     *
     * @return integer
     */
    public function getDiscountCode()
    {
        return $this->discountCode;
    }

    /**
     * Set partOfInvoice
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Invoices $partOfInvoice
     *
     * @return Orders
     */
    public function setPartOfInvoice(\Famoser\OnlineOfficeBundle\Entity\Invoices $partOfInvoice = null)
    {
        $this->partOfInvoice = $partOfInvoice;

        return $this;
    }

    /**
     * Get partOfInvoice
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Invoices
     */
    public function getPartOfInvoice()
    {
        return $this->partOfInvoice;
    }

    /**
     * Set billingAddress
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Address $billingAddress
     *
     * @return Orders
     */
    public function setBillingAddress(\Famoser\OnlineOfficeBundle\Entity\Address $billingAddress = null)
    {
        $this->billingAddress = $billingAddress;

        return $this;
    }

    /**
     * Get billingAddress
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Address
     */
    public function getBillingAddress()
    {
        return $this->billingAddress;
    }

    /**
     * Set customer
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Persons $customer
     *
     * @return Orders
     */
    public function setCustomer(\Famoser\OnlineOfficeBundle\Entity\Persons $customer = null)
    {
        $this->customer = $customer;

        return $this;
    }

    /**
     * Get customer
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Persons
     */
    public function getCustomer()
    {
        return $this->customer;
    }

    /**
     * Set orderStatus
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\OrderStati $orderStatus
     *
     * @return Orders
     */
    public function setOrderStatus(\Famoser\OnlineOfficeBundle\Entity\OrderStati $orderStatus = null)
    {
        $this->orderStatus = $orderStatus;

        return $this;
    }

    /**
     * Get orderStatus
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\OrderStati
     */
    public function getOrderStatus()
    {
        return $this->orderStatus;
    }
}
