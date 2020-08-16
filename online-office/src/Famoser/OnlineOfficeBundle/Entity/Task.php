<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;

/**
 * Task
 *
 * @ORM\Entity(repositoryClass="Famoser\OnlineOfficeBundle\Entity\Repositories\TasksRepository")
 */
class Task
{
    public function __construct()
    {
        $this->taskPersons = new ArrayCollection();
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
    private $name;

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
    private $estimatedStart;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     */
    private $estimatedEnd;

    /**
     * @var TaskStati
     *
     * @ORM\ManyToOne(targetEntity="TaskStati")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $taskStatus;

    /**
     * @var Persons
     *
     * @ORM\ManyToOne(targetEntity="Persons")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $customer;

    /**
     * @var Persons
     *
     * @ORM\ManyToOne(targetEntity="Persons")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $leader;

    /**
     * @var Tasks
     *
     * @ORM\ManyToOne(targetEntity="Tasks")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $parent;

    /**
     * @var Offers
     *
     * @ORM\ManyToOne(targetEntity="Offers")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $offer;

    /**
     * @ORM\OneToMany(targetEntity="TaskPerson", mappedBy="task")
     */
    private $taskPersons;



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
     * Set name
     *
     * @param string $name
     *
     * @return Tasks
     */
    public function setName($name)
    {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Tasks
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
     * Set estimatedStart
     *
     * @param \DateTime $estimatedStart
     *
     * @return Tasks
     */
    public function setEstimatedStart($estimatedStart)
    {
        $this->estimatedStart = $estimatedStart;

        return $this;
    }

    /**
     * Get estimatedStart
     *
     * @return \DateTime
     */
    public function getEstimatedStart()
    {
        return $this->estimatedStart;
    }

    /**
     * Set estimatedEnd
     *
     * @param \DateTime $estimatedEnd
     *
     * @return Tasks
     */
    public function setEstimatedEnd($estimatedEnd)
    {
        $this->estimatedEnd = $estimatedEnd;

        return $this;
    }

    /**
     * Get estimatedEnd
     *
     * @return \DateTime
     */
    public function getEstimatedEnd()
    {
        return $this->estimatedEnd;
    }

    /**
     * Set taskStatus
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\TaskStati $taskStatus
     *
     * @return Tasks
     */
    public function setTaskStatus(\Famoser\OnlineOfficeBundle\Entity\TaskStati $taskStatus = null)
    {
        $this->taskStatus = $taskStatus;

        return $this;
    }

    /**
     * Get taskStatus
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\TaskStati
     */
    public function getTaskStatus()
    {
        return $this->taskStatus;
    }

    /**
     * Set customer
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Persons $customer
     *
     * @return Tasks
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
     * Set leader
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Persons $leader
     *
     * @return Tasks
     */
    public function setLeader(\Famoser\OnlineOfficeBundle\Entity\Persons $leader = null)
    {
        $this->leader = $leader;

        return $this;
    }

    /**
     * Get leader
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Persons
     */
    public function getLeader()
    {
        return $this->leader;
    }

    /**
     * Set parent
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Tasks $parent
     *
     * @return Tasks
     */
    public function setParent(\Famoser\OnlineOfficeBundle\Entity\Tasks $parent = null)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * Get parent
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Tasks
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Set offer
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Offers $offer
     *
     * @return Tasks
     */
    public function setOffer(\Famoser\OnlineOfficeBundle\Entity\Offers $offer = null)
    {
        $this->offer = $offer;

        return $this;
    }

    /**
     * Get offer
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Offers
     */
    public function getOffer()
    {
        return $this->offer;
    }

    /**
     * @return mixed
     */
    public function getTaskPersons()
    {
        return $this->taskPersons;
    }
}
