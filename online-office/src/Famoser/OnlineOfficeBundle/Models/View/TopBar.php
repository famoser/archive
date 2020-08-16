<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 23/08/2016
 * Time: 15:59
 */

namespace Famoser\OnlineOfficeBundle\Models\View;


use Famoser\OnlineOfficeBundle\Entity\TaskEntries;

class TopBar
{
    private $notifications;
    private $openTasks;

    public function __construct($openTasks, $notifications)
    {
        foreach ($openTasks as $openTask) {
            $this->openTasks[] = new OpenTaskEntry($openTask);
        }

        foreach ($notifications as $notification) {
            $this->notifications[] = new NotificationEntry($notification);
        }
    }

    /**
     * @return NotificationEntry[]
     */
    public function getNotifications()
    {
        return $this->notifications;
    }

    /**
     * @return OpenTaskEntry[]
     */
    public function getOpenTasks()
    {
        return $this->openTasks;
    }
}