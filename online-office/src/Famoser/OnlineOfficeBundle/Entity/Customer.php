<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Customer
 *
 * @ORM\Entity
 */
class Customer
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
     * @var Person
     *
     * @ORM\ManyToOne(targetEntity="Person")
     */
    private $person;

    /**
     * @var Organization
     *
     * @ORM\ManyToOne(targetEntity="Organization", inversedBy="customers")
     */
    private $organization;


    /**
     * @var Person
     *
     * @ORM\ManyToOne(targetEntity="Person")
     */
    private $primaryConsultant;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     */
    private $customerSince;

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
     * @return Person
     */
    public function getPerson()
    {
        return $this->person;
    }

    /**
     * @param Person $person
     */
    public function setPerson($person)
    {
        $this->person = $person;
    }

    /**
     * @return Organization
     */
    public function getOrganization()
    {
        return $this->organization;
    }

    /**
     * @param Organization $organization
     */
    public function setOrganization($organization)
    {
        $this->organization = $organization;
    }

    /**
     * @return Person
     */
    public function getPrimaryConsultant()
    {
        return $this->primaryConsultant;
    }

    /**
     * @param Person $primaryConsultant
     */
    public function setPrimaryConsultant($primaryConsultant)
    {
        $this->primaryConsultant = $primaryConsultant;
    }

    /**
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * @param string $description
     */
    public function setDescription($description)
    {
        $this->description = $description;
    }

    /**
     * @return \DateTime
     */
    public function getCustomerSince()
    {
        return $this->customerSince;
    }

    /**
     * @param \DateTime $customerSince
     */
    public function setCustomerSince($customerSince)
    {
        $this->customerSince = $customerSince;
    }
}
