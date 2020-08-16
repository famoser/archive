<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 22/08/2016
 * Time: 14:38
 */

namespace Famoser\OnlineOfficeBundle\Helpers;


use Famoser\OnlineOfficeBundle\Enums\EmployeeRoles;

class ReflectionHelper
{
    public static function GetAllEmployeeRoles()
    {
        return get_class_vars(new EmployeeRoles());
    }
}