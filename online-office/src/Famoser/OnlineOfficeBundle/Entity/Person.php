<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Person
 *
 * @ORM\Entity(repositoryClass="Famoser\OnlineOfficeBundle\Entity\Repositories\PersonsRepository")
 */
class Person
{
    public function __construct()
    {
        $this->tasks = new ArrayCollection();
        $this->addresses = new ArrayCollection();
        $this->orders = new ArrayCollection();
        $this->invoices = new ArrayCollection();
    }

    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $email;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $honorificPrefix;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $givenName;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $familyName;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="date")
     */
    private $birthDate;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $telephone;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $description;

    /**
     * @var User
     *
     * @ORM\OneToOne(targetEntity="User", inversedBy="person")
     */
    private $user;

    /**
     * @var Order[]|ArrayCollection
     *
     * @ORM\ManyToOne(targetEntity="Order", inversedBy="person")
     */
    private $orders;

    /**
     * @var Invoice[]|ArrayCollection
     *
     * @ORM\ManyToOne(targetEntity="Invoice", inversedBy="person")
     */
    private $invoices;

    /**
     * @var Task[]|ArrayCollection
     *
     * @ORM\ManyToOne(targetEntity="Task", inversedBy="person")
     */
    private $tasks;

    /**
     * @var Address[]|ArrayCollection
     *
     * @ORM\ManyToOne(targetEntity="Address", inversedBy="person")
     */
    private $addresses;

    /**
     * @var Address
     *
     * @ORM\OneToMany(targetEntity="Address", mappedBy="person")
     */
    private $address;


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
     * Set email
     *
     * @param string $email
     *
     * @return Person
     */
    public function setEmail($email)
    {
        $this->email = $email;

        return $this;
    }

    /**
     * Get email
     *
     * @return string
     */
    public function getEmail()
    {
        return $this->email;
    }

    /**
     * Set honorificPrefix
     *
     * @param string $honorificPrefix
     *
     * @return Person
     */
    public function setHonorificPrefix($honorificPrefix)
    {
        $this->honorificPrefix = $honorificPrefix;

        return $this;
    }

    /**
     * Get honorificPrefix
     *
     * @return string
     */
    public function getHonorificPrefix()
    {
        return $this->honorificPrefix;
    }

    /**
     * Set givenName
     *
     * @param string $givenName
     *
     * @return Person
     */
    public function setGivenName($givenName)
    {
        $this->givenName = $givenName;

        return $this;
    }

    /**
     * Get givenName
     *
     * @return string
     */
    public function getGivenName()
    {
        return $this->givenName;
    }

    /**
     * Set familyName
     *
     * @param string $familyName
     *
     * @return Person
     */
    public function setFamilyName($familyName)
    {
        $this->familyName = $familyName;

        return $this;
    }

    /**
     * Get familyName
     *
     * @return string
     */
    public function getFamilyName()
    {
        return $this->familyName;
    }

    /**
     * Set birthDate
     *
     * @param \DateTime $birthDate
     *
     * @return Person
     */
    public function setBirthDate($birthDate)
    {
        $this->birthDate = $birthDate;

        return $this;
    }

    /**
     * Get birthDate
     *
     * @return \DateTime
     */
    public function getBirthDate()
    {
        return $this->birthDate;
    }

    /**
     * Set telephone
     *
     * @param string $telephone
     *
     * @return Person
     */
    public function setTelephone($telephone)
    {
        $this->telephone = $telephone;

        return $this;
    }

    /**
     * Get telephone
     *
     * @return string
     */
    public function getTelephone()
    {
        return $this->telephone;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Person
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
     * Set user
     *
     * @param User $user
     *
     * @return Person
     */
    public function setUser(User $user = null)
    {
        $this->user = $user;

        return $this;
    }

    /**
     * Get user
     *
     * @return User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * gets the full name
     * @return string
     */
    public function getFullName()
    {
        return $this->givenName . " " . $this->familyName;
    }

    /**
     * @return Address
     */
    public function getAddress()
    {
        return $this->address;
    }

    /**
     * @param Address $address
     */
    public function setAddress($address)
    {
        $this->address = $address;
    }

    /**
     * @return Address[]|ArrayCollection
     */
    public function getAddresses()
    {
        return $this->addresses;
    }

    /**
     * @return Order[]|ArrayCollection
     */
    public function getOrders()
    {
        return $this->orders;
    }

    /**
     * @return Task[]|ArrayCollection
     */
    public function getTasks()
    {
        return $this->tasks;
    }

    /**
     * @return ArrayCollection|Invoice[]
     */
    public function getInvoices()
    {
        return $this->invoices;
    }
}
