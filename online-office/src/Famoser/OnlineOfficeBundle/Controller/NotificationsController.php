<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 23/08/2016
 * Time: 15:11
 */

namespace Famoser\OnlineOfficeBundle\Controller;


use Famoser\OnlineOfficeBundle\Controller\Base\BaseController;
use Famoser\OnlineOfficeBundle\Enums\IconEnum;
use Famoser\OnlineOfficeBundle\Enums\MenuEntries;
use Famoser\OnlineOfficeBundle\Factories\RepositoryFactory;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/notifications")
 */
class NotificationsController extends BaseController
{
    /**
     * @Route("/clear", name="notifications_clear")
     */
    function clearAllAction()
    {
        RepositoryFactory::getNotificationsRepository($this->getDoctrine())->clearAll($this->getUser());

        return "notifications";
    }

    protected function getBaseFolder()
    {
        return "notifications";
    }

    protected function getBaseBreadCrumbs()
    {
        $arr = [];
        return $arr;
    }

    protected function getActiveMainMenuEntry()
    {
        return MenuEntries::$NOTIFICATIONS;
    }

    protected function getEntityIcon()
    {
        return IconEnum::$NOTIFICATIONS;
    }
}