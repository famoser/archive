<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 23/08/2016
 * Time: 19:39
 */

namespace Famoser\OnlineOfficeBundle\Models\View;


use Famoser\OnlineOfficeBundle\Entity\Notifications;
use Famoser\OnlineOfficeBundle\Helpers\DateTimeHelper;

class NotificationEntry
{
    private $id;
    private $name;
    private $description;
    private $isRead;
    private $hoursAgo;

    public function __construct(Notifications $entry)
    {
        $this->id = $entry->getId();
        $this->name = $entry->getName();
        $this->description = $entry->getDescription();
        $this->isRead = $entry->getIsRead();
        $this->hoursAgo = DateTimeHelper::getHoursFromNow($entry->getNotificationDate());
    }

    /**
     * @return mixed
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * @return mixed
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * @return mixed
     */
    public function getIsRead()
    {
        return $this->isRead;
    }

    /**
     * @return mixed
     */
    public function getHoursAgo()
    {
        return $this->hoursAgo;
    }

    /**
     * @return mixed
     */
    public function getDescription()
    {
        return $this->description;
    }
}