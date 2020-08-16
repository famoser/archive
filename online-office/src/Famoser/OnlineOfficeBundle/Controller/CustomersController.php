<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 23/08/2016
 * Time: 15:03
 */

namespace Famoser\OnlineOfficeBundle\Controller;


use Famoser\OnlineOfficeBundle\Controller\Base\BaseController;
use Famoser\OnlineOfficeBundle\Enums\IconEnum;
use Famoser\OnlineOfficeBundle\Enums\MenuEntries;
use Famoser\OnlineOfficeBundle\Models\View\BreadCrumbEntry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/customers")
 */
class CustomersController extends BaseController
{
    /**
     * @Route("/", name="customers_index")
     */
    public function indexAction(Request $request)
    {
        // replace this example code with whatever you need
        return $this->render($this->getPath("index"));
    }

    protected function getBaseFolder()
    {
        return "customers";
    }

    protected function getActiveMainMenuEntry()
    {
        return MenuEntries::$CUSTOMERS;
    }

    protected function getEntityIcon()
    {
        return IconEnum::$CUSTOMERS;
    }
}