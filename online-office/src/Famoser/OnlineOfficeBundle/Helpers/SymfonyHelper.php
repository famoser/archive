<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 23/08/2016
 * Time: 14:00
 */

namespace Famoser\OnlineOfficeBundle\Helpers;


use Famoser\OnlineOfficeBundle\Entity\User;
use Symfony\Component\DependencyInjection\Container;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;

class SymfonyHelper
{
    public static function relogUser(Container $cont, User $user)
    {
        $token = new UsernamePasswordToken(
            $user,
            null,
            'main',
            $user->getRoles()
        );
        $cont->get('security.context')->setToken($token);
    }
}