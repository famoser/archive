<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 22/08/2016
 * Time: 20:14
 */

namespace Famoser\OnlineOfficeBundle\Factories;


use Doctrine\Bundle\DoctrineBundle\Registry;
use Doctrine\ORM\EntityManager;
use Famoser\OnlineOfficeBundle\Entity\Repositories\NotificationsRepository;
use Famoser\OnlineOfficeBundle\Entity\Repositories\OrganizationsRepository;
use Famoser\OnlineOfficeBundle\Entity\Repositories\PersonsRepository;
use Famoser\OnlineOfficeBundle\Entity\Repositories\TasksRepository;
use Famoser\OnlineOfficeBundle\Entity\Repositories\UsersRepository;

class RepositoryFactory
{
    private static $namespace = "Famoser\OnlineOfficeBundle:";

    /**
     * @param Registry $em
     * @return UsersRepository
     */
    public static function getUsersRepository(Registry $em)
    {
        return $em->getRepository(self::$namespace . 'Users');
    }

    /**
     * @param Registry $em
     * @return PersonsRepository
     */
    public static function getPersonsRepository(Registry $em)
    {
        return $em->getRepository(self::$namespace . 'Persons');
    }

    /**
     * @param Registry $em
     * @return OrganizationsRepository
     */
    public static function getOrganizationsRepository(Registry $em)
    {
        return $em->getRepository(self::$namespace . 'Organizations');
    }

    /**
     * @param Registry $em
     * @return NotificationsRepository
     */
    public static function getNotificationsRepository(Registry $em)
    {
        return $em->getRepository(self::$namespace . 'Notifications');
    }

    /**
     * @param Registry $em
     * @return TasksRepository
     */
    public static function getTasksRepository(Registry $em)
    {
        return $em->getRepository(self::$namespace . 'Tasks');
    }
}