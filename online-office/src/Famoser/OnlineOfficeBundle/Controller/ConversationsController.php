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
use Famoser\OnlineOfficeBundle\Models\View\BreadCrumbEntry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/conversations")
 */
class ConversationsController extends BaseController
{
    /**
     * @Route("/", name="conversations_index")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render($this->getPath("index"));
    }

    protected function getBaseFolder()
    {
        return "conversations";
    }

    protected function getActiveMainMenuEntry()
    {
        return MenuEntries::$CONVERSATIONS;
    }

    protected function getEntityIcon()
    {
        return IconEnum::$CONVERSATIONS;
    }
}