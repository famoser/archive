<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 22/08/2016
 * Time: 15:15
 */

namespace Famoser\OnlineOfficeBundle\Controller;

use Famoser\OnlineOfficeBundle\Controller\Base\BaseController;
use Famoser\OnlineOfficeBundle\Entity\Person;
use Famoser\OnlineOfficeBundle\Entity\Persons;
use Famoser\OnlineOfficeBundle\Enums\IconEnum;
use Famoser\OnlineOfficeBundle\Enums\MenuEntries;
use Famoser\OnlineOfficeBundle\Factories\FormFactory;
use Famoser\OnlineOfficeBundle\Factories\RepositoryFactory;
use Famoser\OnlineOfficeBundle\Helpers\SymfonyHelper;
use Famoser\OnlineOfficeBundle\Models\View\BreadCrumbEntry;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;


/**
 * @Route("/welcome")
 */
class WelcomeController extends BaseController
{
    /**
     * @Route("/", name="welcome_index")
     */
    public function indexAction(Request $request)
    {
        $user = $this->getUser();
        if ($user->hasRole("ROLE_PERSON"))
            return $this->redirectToRoute('index');

        $view = [];

        $person = new Person();
        $person->setEmail($user->getEmail());

        $form = $this->createForm('Famoser\OnlineOfficeBundle\Form\PersonsType', $person);;

        $form->handleRequest($request);
        if ($form->isSubmitted() && $form->isValid()) {
            $person->setUser($user);

            $em = $this->getEntityManager();
            $em->persist($person);

            $user->addRole("ROLE_PERSON");

            $em->persist($user);
            $em->flush();
            SymfonyHelper::relogUser($this->container, $user);

            return $this->redirectToRoute('index');
        }

        $view["form"] = $form->createView();

        return $this->render($this->getPath("index"), $view);
    }

    protected function getBaseFolder()
    {
        return "welcome";
    }

    protected function getBaseBreadCrumbs()
    {
        $arr = [];
        return $arr;
    }

    protected function getActiveMainMenuEntry()
    {
        return MenuEntries::$WELCOME;
    }

    protected function getEntityIcon()
    {
        return IconEnum::$WELCOME;
    }
}