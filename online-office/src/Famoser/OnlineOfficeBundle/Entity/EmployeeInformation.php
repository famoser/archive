<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Famoser\OnlineOfficeBundle\Entity\Base\RoleEntity;

/**
 * EmployeeInformation
 *
 * @ORM\Entity
 */
class EmployeeInformation extends RoleEntity
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
     * @var boolean
     *
     * @ORM\Column(type="boolean")
     */
    private $canSetSalary;

    /**
     * @var string
     *
     * @ORM\Column(type="text")
     */
    private $roles;

    /**
     * @var Person
     *
     * @ORM\ManyToOne(targetEntity="Person")
     */
    private $person;

    /**
     * @var Organization
     *
     * @ORM\ManyToOne(targetEntity="Organization")
     */
    private $organization;

    /**
     * @var EmployeePosition
     *
     * @ORM\ManyToOne(targetEntity="EmployeePosition")
     */
    private $employeePosition;

    /**
     * @var PriceSpecification
     *
     * @ORM\ManyToOne(targetEntity="PriceSpecification")
     */
    private $baseSalary;

    /**
     * @var PriceSpecification
     *
     * @ORM\ManyToOne(targetEntity="PriceSpecification")
     */
    private $hourSalary;



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
     * @return boolean
     */
    public function isCanSetSalary()
    {
        return $this->canSetSalary;
    }

    /**
     * @param boolean $canSetSalary
     */
    public function setCanSetSalary($canSetSalary)
    {
        $this->canSetSalary = $canSetSalary;
    }

    /**
     * @return string
     */
    public function getRoles()
    {
        return $this->roles;
    }

    /**
     * @param string $roles
     */
    public function setRoles($roles)
    {
        $this->roles = $roles;
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
     * @return EmployeePosition
     */
    public function getEmployeePosition()
    {
        return $this->employeePosition;
    }

    /**
     * @param EmployeePosition $employeePosition
     */
    public function setEmployeePosition($employeePosition)
    {
        $this->employeePosition = $employeePosition;
    }

    /**
     * @return PriceSpecification
     */
    public function getBaseSalary()
    {
        return $this->baseSalary;
    }

    /**
     * @param PriceSpecification $baseSalary
     */
    public function setBaseSalary($baseSalary)
    {
        $this->baseSalary = $baseSalary;
    }

    /**
     * @return PriceSpecification
     */
    public function getHourSalary()
    {
        return $this->hourSalary;
    }

    /**
     * @param PriceSpecification $hourSalary
     */
    public function setHourSalary($hourSalary)
    {
        $this->hourSalary = $hourSalary;
    }

}
