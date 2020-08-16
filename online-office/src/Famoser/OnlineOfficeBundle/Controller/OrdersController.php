<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 23/08/2016
 * Time: 15:05
 */

namespace Famoser\OnlineOfficeBundle\Controller;


use Famoser\OnlineOfficeBundle\Controller\Base\BaseController;
use Famoser\OnlineOfficeBundle\Enums\IconEnum;
use Famoser\OnlineOfficeBundle\Enums\MenuEntries;
use Famoser\OnlineOfficeBundle\Models\View\BreadCrumbEntry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/orders")
 */
class OrdersController extends BaseController
{
    /**
     * @Route("/", name="orders_index")
     */
    public function indexAction(Request $request)
    {
        $arr = [];

        // replace this example code with whatever you need
        return $this->render($this->getPath("index"), $arr);
    }

    protected function getBaseFolder()
    {
        return "orders";
    }
    protected function getActiveMainMenuEntry()
    {
        return MenuEntries::$ORDERS;
    }

    protected function getEntityIcon()
    {
        return IconEnum::$ORDERS;
    }
}