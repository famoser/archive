<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * PriceSpecification
 *
 * @ORM\Entity
 */
class PriceSpecification
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
     * @var float
     *
     * @ORM\Column(type="float", precision=10, scale=0)
     */
    private $maxPrice;

    /**
     * @var float
     *
     * @ORM\Column(type="float", precision=10, scale=0)
     */
    private $minPrice;

    /**
     * @var float
     *
     * @ORM\Column(type="float", precision=10, scale=0)
     */
    private $price;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $priceCurrency;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $valueAddedTaxIncluded = '1';



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
     * Set maxPrice
     *
     * @param float $maxPrice
     *
     * @return PriceSpecifications
     */
    public function setMaxPrice($maxPrice)
    {
        $this->maxPrice = $maxPrice;

        return $this;
    }

    /**
     * Get maxPrice
     *
     * @return float
     */
    public function getMaxPrice()
    {
        return $this->maxPrice;
    }

    /**
     * Set minPrice
     *
     * @param float $minPrice
     *
     * @return PriceSpecifications
     */
    public function setMinPrice($minPrice)
    {
        $this->minPrice = $minPrice;

        return $this;
    }

    /**
     * Get minPrice
     *
     * @return float
     */
    public function getMinPrice()
    {
        return $this->minPrice;
    }

    /**
     * Set price
     *
     * @param float $price
     *
     * @return PriceSpecifications
     */
    public function setPrice($price)
    {
        $this->price = $price;

        return $this;
    }

    /**
     * Get price
     *
     * @return float
     */
    public function getPrice()
    {
        return $this->price;
    }

    /**
     * Set priceCurrency
     *
     * @param string $priceCurrency
     *
     * @return PriceSpecifications
     */
    public function setPriceCurrency($priceCurrency)
    {
        $this->priceCurrency = $priceCurrency;

        return $this;
    }

    /**
     * Get priceCurrency
     *
     * @return string
     */
    public function getPriceCurrency()
    {
        return $this->priceCurrency;
    }

    /**
     * Set valueAddedTaxIncluded
     *
     * @param boolean $valueAddedTaxIncluded
     *
     * @return PriceSpecifications
     */
    public function setValueAddedTaxIncluded($valueAddedTaxIncluded)
    {
        $this->valueAddedTaxIncluded = $valueAddedTaxIncluded;

        return $this;
    }

    /**
     * Get valueAddedTaxIncluded
     *
     * @return boolean
     */
    public function getValueAddedTaxIncluded()
    {
        return $this->valueAddedTaxIncluded;
    }
}
