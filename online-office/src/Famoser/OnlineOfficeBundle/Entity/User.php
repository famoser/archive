<?php

namespace Famoser\OnlineOfficeBundle\Entity;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ORM\Mapping as ORM;
use FOS\UserBundle\Model\User as BaseUser;

/**
 *
 * @ORM\Table(name="fos_user")
 * @ORM\Entity(repositoryClass="Famoser\OnlineOfficeBundle\Entity\Repositories\UsersRepository")
 */
class User extends BaseUser
{
    /**
     * @var integer
     *
     * @ORM\Column(type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    protected $id;

    /**
     * @ORM\OneToOne(targetEntity="Person", mappedBy="user")
     */
    private $person;

    public function __construct() {
        parent::__construct();
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
