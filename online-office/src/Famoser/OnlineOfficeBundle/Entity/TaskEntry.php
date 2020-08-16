<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * TaskEntry
 *
 * @ORM\Entity
 */
class TaskEntry
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
    private $start;

    /**
     * @var \DateTime
     *
     * @ORM\Column(type="datetime")
     */
    private $end;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $isBillable = '1';

    /**
     * @var PriceSpecifications
     *
     * @ORM\ManyToOne(targetEntity="PriceSpecifications")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $priceSpecification;

    /**
     * @var Tasks
     *
     * @ORM\ManyToOne(targetEntity="Tasks")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $task;

    /**
     * @var Persons
     *
     * @ORM\ManyToOne(targetEntity="Persons")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $person;

    /**
     * @var TaskEntryTypes
     *
     * @ORM\ManyToOne(targetEntity="TaskEntryTypes")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $taskEntryType;



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
     * @return TaskEntries
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
     * @return TaskEntries
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
     * Set start
     *
     * @param \DateTime $start
     *
     * @return TaskEntries
     */
    public function setStart($start)
    {
        $this->start = $start;

        return $this;
    }

    /**
     * Get start
     *
     * @return \DateTime
     */
    public function getStart()
    {
        return $this->start;
    }

    /**
     * Set end
     *
     * @param \DateTime $end
     *
     * @return TaskEntries
     */
    public function setEnd($end)
    {
        $this->end = $end;

        return $this;
    }

    /**
     * Get end
     *
     * @return \DateTime
     */
    public function getEnd()
    {
        return $this->end;
    }

    /**
     * Set isBillable
     *
     * @param boolean $isBillable
     *
     * @return TaskEntries
     */
    public function setIsBillable($isBillable)
    {
        $this->isBillable = $isBillable;

        return $this;
    }

    /**
     * Get isBillable
     *
     * @return boolean
     */
    public function getIsBillable()
    {
        return $this->isBillable;
    }

    /**
     * Set priceSpecification
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\PriceSpecifications $priceSpecification
     *
     * @return TaskEntries
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

    /**
     * Set task
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Tasks $task
     *
     * @return TaskEntries
     */
    public function setTask(\Famoser\OnlineOfficeBundle\Entity\Tasks $task = null)
    {
        $this->task = $task;

        return $this;
    }

    /**
     * Get task
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Tasks
     */
    public function getTask()
    {
        return $this->task;
    }

    /**
     * Set person
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Persons $person
     *
     * @return TaskEntries
     */
    public function setPerson(\Famoser\OnlineOfficeBundle\Entity\Persons $person = null)
    {
        $this->person = $person;

        return $this;
    }

    /**
     * Get person
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\Persons
     */
    public function getPerson()
    {
        return $this->person;
    }

    /**
     * Set taskEntryType
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\TaskEntryTypes $taskEntryType
     *
     * @return TaskEntries
     */
    public function setTaskEntryType(\Famoser\OnlineOfficeBundle\Entity\TaskEntryTypes $taskEntryType = null)
    {
        $this->taskEntryType = $taskEntryType;

        return $this;
    }

    /**
     * Get taskEntryType
     *
     * @return \Famoser\OnlineOfficeBundle\Entity\TaskEntryTypes
     */
    public function getTaskEntryType()
    {
        return $this->taskEntryType;
    }
}
