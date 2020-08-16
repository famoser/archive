<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Offer
 *
 * @ORM\Entity
 */
class Offer
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
    private $validFrom;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     */
    private $validThrough;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @var \Organizations
     *
     * @ORM\ManyToOne(targetEntity="Organizations")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $organization;

    /**
     * @var \Persons
     *
     * @ORM\ManyToOne(targetEntity="Persons")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(name="offeredBy_id", referencedColumnName="id")
     * })
     */
    private $offeredby;

    /**
     * @var \Products
     *
     * @ORM\ManyToOne(targetEntity="Products")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $product;

    /**
     * @var \PriceSpecifications
     *
     * @ORM\ManyToOne(targetEntity="PriceSpecifications")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $priceSpecification;



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
     * Set validFrom
     *
     * @param \DateTime $validFrom
     *
     * @return Offers
     */
    public function setValidFrom($validFrom)
    {
        $this->validFrom = $validFrom;

        return $this;
    }

    /**
     * Get validFrom
     *
     * @return \DateTime
     */
    public function getValidFrom()
    {
        return $this->validFrom;
    }

    /**
     * Set validThrough
     *
     * @param \DateTime $validThrough
     *
     * @return Offers
     */
    public function setValidThrough($validThrough)
    {
        $this->validThrough = $validThrough;

        return $this;
    }

    /**
     * Get validThrough
     *
     * @return \DateTime
     */
    public function getValidThrough()
    {
        return $this->validThrough;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Offers
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
     * Set organization
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Organizations $organization
     *
     * @return Offers
     */
    public function setOrganization(\Famoser\OnlineOfficeBundle\Entity\Organizations $organization = null)
    {
        $this->organization = $organization;

        return $this;
    }

    /**
     * Get organization
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Organizations
     */
    public function getOrganization()
    {
        return $this->organization;
    }

    /**
     * Set offeredby
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Persons $offeredby
     *
     * @return Offers
     */
    public function setOfferedby(\Famoser\OnlineOfficeBundle\Entity\Persons $offeredby = null)
    {
        $this->offeredby = $offeredby;

        return $this;
    }

    /**
     * Get offeredby
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Persons
     */
    public function getOfferedby()
    {
        return $this->offeredby;
    }

    /**
     * Set product
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Products $product
     *
     * @return Offers
     */
    public function setProduct(\Famoser\OnlineOfficeBundle\Entity\Products $product = null)
    {
        $this->product = $product;

        return $this;
    }

    /**
     * Get product
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Products
     */
    public function getProduct()
    {
        return $this->product;
    }

    /**
     * Set priceSpecification
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\PriceSpecifications $priceSpecification
     *
     * @return Offers
     */
    public function setPriceSpecification(\Famoser\OnlineOfficeBundle\Entity\PriceSpecifications $priceSpecification = null)
    {
        $this->priceSpecification = $priceSpecification;

        return $this;
    }

    /**
     * Get priceSpecification
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\PriceSpecifications
     */
    public function getPriceSpecification()
    {
        return $this->priceSpecification;
    }
}
