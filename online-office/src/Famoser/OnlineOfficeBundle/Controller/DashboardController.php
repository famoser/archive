<?php

namespace Famoser\OnlineOfficeBundle\Controller;

use Famoser\OnlineOfficeBundle\Controller\Base\BaseController;
use Famoser\OnlineOfficeBundle\Enums\IconEnum;
use Famoser\OnlineOfficeBundle\Enums\MenuEntries;
use Famoser\OnlineOfficeBundle\Models\View\BreadCrumbEntry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

class DashboardController extends BaseController
{
    /**
     * @Route("/", name="dashboard_index")
     */
    public function indexAction(Request $request)
    {
        $arr = [];

        return $this->render($this->getPath("index"), $arr);
    }

    protected function getBaseFolder()
    {
        return "dashboard";
    }

    protected function getActiveMainMenuEntry()
    {
        return MenuEntries::$DASHBOARD;
    }

    protected function getEntityIcon()
    {
        return IconEnum::$DASHBOARD;
    }
}
