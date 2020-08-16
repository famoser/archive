<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 25/08/2016
 * Time: 14:34
 */

namespace Famoser\OnlineOfficeBundle\Repository;


use Doctrine\ORM\EntityRepository;
use Famoser\OnlineOfficeBundle\Entity\Person;
use Famoser\OnlineOfficeBundle\Entity\Repositories\Base\BaseRepository;
use Famoser\OnlineOfficeBundle\Entity\Users;

class OrganizationRepository extends BaseRepository
{
    public function getOrganisations(Person $person)
    {

    }
}