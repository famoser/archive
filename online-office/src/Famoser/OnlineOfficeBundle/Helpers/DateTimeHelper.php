<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 23/08/2016
 * Time: 21:01
 */

namespace Famoser\OnlineOfficeBundle\Helpers;


class DateTimeHelper
{
    public static function getDaysFromNow(\DateTime $time)
    {
        $diff = $time->diff(new \DateTime());
        return $diff->days;
    }

    public static function getHoursFromNow(\DateTime $time)
    {
        $diff = $time->diff(new \DateTime());
        return $diff->h;
    }
}