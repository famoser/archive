<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 23/08/2016
 * Time: 16:00
 */

namespace Famoser\OnlineOfficeBundle\Models\View;


use Famoser\OnlineOfficeBundle\Entity\Tasks;
use Famoser\OnlineOfficeBundle\Helpers\DateTimeHelper;
use Symfony\Component\Validator\Constraints\DateTime;

class OpenTaskEntry
{
    private $id;
    private $name;
    private $daysLeft;

    public function __construct(Tasks $task)
    {
        $this->id = $task->getId();
        $this->daysLeft = DateTimeHelper::getDaysFromNow($task->getEstimatedEnd());
        $this->name = $task->getName();
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
    public function getDaysLeft()
    {
        return $this->daysLeft;
    }
}