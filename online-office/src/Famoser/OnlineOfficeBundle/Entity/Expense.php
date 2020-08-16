<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Expense
 *
 * @ORM\Entity
 */
class Expense
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
    private $expenseDate;

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $isBillable = '1';

    /**
     * @var boolean
     *
     * @ORM\Column(type="boolean", nullable=false)
     */
    private $isAccepted = '1';

    /**
     * @var PriceSpecification
     *
     * @ORM\ManyToOne(targetEntity="PriceSpecification")
     */
    private $priceSpecification;

    /**
     * @var Task
     *
     * @ORM\ManyToOne(targetEntity="Tasks")
     */
    private $task;

    /**
     * @var Person
     *
     * @ORM\ManyToOne(targetEntity="Persons")
     */
    private $person;


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
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @param string $name
     */
    public function setName($name)
    {
        $this->name = $name;
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
    public function getExpenseDate()
    {
        return $this->expenseDate;
    }

    /**
     * @param \DateTime $expenseDate
     */
    public function setExpenseDate($expenseDate)
    {
        $this->expenseDate = $expenseDate;
    }

    /**
     * @return boolean
     */
    public function isIsBillable()
    {
        return $this->isBillable;
    }

    /**
     * @param boolean $isBillable
     */
    public function setIsBillable($isBillable)
    {
        $this->isBillable = $isBillable;
    }

    /**
     * @return boolean
     */
    public function isIsAccepted()
    {
        return $this->isAccepted;
    }

    /**
     * @param boolean $isAccepted
     */
    public function setIsAccepted($isAccepted)
    {
        $this->isAccepted = $isAccepted;
    }

    /**
     * @return PriceSpecification
     */
    public function getPriceSpecification()
    {
        return $this->priceSpecification;
    }

    /**
     * @param PriceSpecification $priceSpecification
     */
    public function setPriceSpecification($priceSpecification)
    {
        $this->priceSpecification = $priceSpecification;
    }

    /**
     * @return Task
     */
    public function getTask()
    {
        return $this->task;
    }

    /**
     * @param Task $task
     */
    public function setTask($task)
    {
        $this->task = $task;
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
}
