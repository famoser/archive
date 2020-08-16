<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 25/08/2016
 * Time: 14:52
 */

namespace Famoser\OnlineOfficeBundle\Entity\Repositories\Base;


use Doctrine\ORM\EntityRepository;

class BaseRepository extends EntityRepository
{
    protected $ENTITY_NAMESPACE = "Famoser\\OnlineOfficeBundle\\Entity\\";
}