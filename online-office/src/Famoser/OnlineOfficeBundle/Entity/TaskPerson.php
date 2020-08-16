<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Famoser\OnlineOfficeBundle\Entity\Base\RoleEntity;

/**
 * TaskPerson
 *
 * @ORM\Entity
 */
class TaskPerson extends RoleEntity
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
    private $roles;

    /**
     * @var Persons
     *
     * @ORM\ManyToOne(targetEntity="Persons",inversedBy="taskPersons")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $person;

    /**
     * @var Tasks
     *
     * @ORM\ManyToOne(targetEntity="Tasks",inversedBy="taskPersons")
     * @ORM\JoinColumns({
     *   @ORM\JoinColumn(referencedColumnName="id")
     * })
     */
    private $task;


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
     * Set person
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Persons $person
     *
     * @return TaskPerson
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
     * Set task
     *
     * @param \Famoser\OnlineOfficeBundle\Entity\Tasks $task
     *
     * @return TaskPerson
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

    protected function getRoles()
    {
        return $this->roles;
    }

    protected function setRoles($roles)
    {
        $this->roles = $roles;

        return $this;
    }
}
