<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Invoice
 *
 * @ORM\Entity
 */
class Invoice
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
    private $paymentDueDate;

    /**
     * @var PaymentStatus //todo: remove status'?
     *
     * @ORM\ManyToOne(targetEntity="PaymentStatus")
     */
    private $paymentStatus;

    /**
     * @var Person
     *
     * @ORM\ManyToOne(targetEntity="Person")
     */
    private $customer;

    /**
     * @var PriceSpecification
     *
     * @ORM\ManyToOne(targetEntity="PriceSpecification")
     */
    private $totalPaymentDue;



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
     * Set paymentDueDate
     *
     * @param \DateTime $paymentDueDate
     *
     * @return Invoices
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
     * Set paymentStatus
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\PaymentStati $paymentStatus
     *
     * @return Invoices
     */
    public function setPaymentStatus(\Famoser\OnlineOfficeBundle\Entity\PaymentStati $paymentStatus = null)
    {
        $this->paymentStatus = $paymentStatus;

        return $this;
    }

    /**
     * Get paymentStatus
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\PaymentStati
     */
    public function getPaymentStatus()
    {
        return $this->paymentStatus;
    }

    /**
     * Set customer
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Persons $customer
     *
     * @return Invoices
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
     * Set totalPaymentDue
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\PriceSpecifications $totalPaymentDue
     *
     * @return Invoices
     */
    public function setTotalPaymentDue(\Famoser\OnlineOfficeBundle\Entity\PriceSpecifications $totalPaymentDue = null)
    {
        $this->totalPaymentDue = $totalPaymentDue;

        return $this;
    }

    /**
     * Get totalPaymentDue
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\PriceSpecifications
     */
    public function getTotalPaymentDue()
    {
        return $this->totalPaymentDue;
    }
}
