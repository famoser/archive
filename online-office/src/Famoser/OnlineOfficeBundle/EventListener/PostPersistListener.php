<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 20.08.2016
 * Time: 13:50
 */

namespace Famoser\OnlineOfficeBundle\EventListener;


use Doctrine\ORM\Event\LifecycleEventArgs;
use Famoser\OnlineOfficeBundle\Entity\ChangeLog;
use Famoser\OnlineOfficeBundle\Entity\Users;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorage;

class PostPersistListener
{
    /**
     * @var TokenStorage
     */
    protected $ts;

    /**
     * @param TokenStorage $ts
     */
    public function __construct(TokenStorage $ts)
    {
        $this->ts = $ts;
    }

    public function postPersist(LifecycleEventArgs $args)
    {
        $entity = $args->getEntity();
        if ($entity instanceof ChangeLog)
            return;

        $token = $this->ts->getToken();
        if ($token == null)
            return;

        $user = $token->getUser();
        if (!$user instanceof Users)
            return;

        $entityManager = $args->getEntityManager();

        $changeLog = new ChangeLog();
        $changeLog->setChangeDate(new \DateTime());
        $changeLog->setChangedEntryId($entity->getId());
        $changeLog->setChangedTable($entityManager->getClassMetadata(get_class($entity))->getTableName());
        $changeLog->setChanger($user);
        $changeLog->setContent(json_encode($entity));

        $entityManager->persist($entity);
        $entityManager->flush();
    }

}