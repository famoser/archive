<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 23/08/2016
 * Time: 15:04
 */

namespace Famoser\OnlineOfficeBundle\Controller;


use Famoser\OnlineOfficeBundle\Controller\Base\BaseController;
use Famoser\OnlineOfficeBundle\Enums\IconEnum;
use Famoser\OnlineOfficeBundle\Enums\MenuEntries;
use Famoser\OnlineOfficeBundle\Models\View\BreadCrumbEntry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;

/**
 * @Route("/offers")
 */
class OffersController extends BaseController
{
    /**
     * @Route("/", name="offers_index")
     */
    public function indexAction(Request $request)
    {
        $arr = [];

        // replace this example code with whatever you need
        return $this->render($this->getPath("index"), $arr);
    }

    protected function getBaseFolder()
    {
        return "offers";
    }

    protected function getActiveMainMenuEntry()
    {
        return MenuEntries::$OFFERS;
    }

    protected function getEntityIcon()
    {
        return IconEnum::$OFFERS;
    }
}