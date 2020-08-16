<?php

namespace Famoser\OnlineOfficeBundle\Controller;

use Famoser\OnlineOfficeBundle\Controller\Base\BaseController;
use Famoser\OnlineOfficeBundle\Entity\EmployeeInformations;
use Famoser\OnlineOfficeBundle\Entity\EmployeePosition;
use Famoser\OnlineOfficeBundle\Enums\CacheKeys;
use Famoser\OnlineOfficeBundle\Enums\CrudType;
use Famoser\OnlineOfficeBundle\Enums\EmployeeRoles;
use Famoser\OnlineOfficeBundle\Enums\IconEnum;
use Famoser\OnlineOfficeBundle\Enums\MenuEntries;
use Famoser\OnlineOfficeBundle\Factories\RepositoryFactory;
use Famoser\OnlineOfficeBundle\Models\View\BreadCrumbEntry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Famoser\OnlineOfficeBundle\Entity\Organizations;
use Famoser\OnlineOfficeBundle\Form\OrganizationsType;

/**
 * Organizations controller.
 *
 * @Route("/organizations")
 */
class OrganizationsController extends BaseController
{
    /**
     * Lists all Organizations entities.
     *
     * @Route("/", name="organizations_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $em = $this->getDoctrine();

        $organizations = RepositoryFactory::getOrganizationsRepository($em)->getOrganizations($this->getUser());

        return $this->render($this->getPath("index"),
            array('entities' => $organizations)
        );
    }

    /**
     * Creates a new Organizations entity.
     *
     * @Route("/new", name="organizations_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $this->addBreadCrumb("create", "organizations_new", null, IconEnum::$CREATE);
        $arr = [];
        $arr["helpParagraphs"] = array();
        $arr["helpParagraphs"][] = "Your organisation is the most important entry in this application";
        $arr["helpParagraphs"][] = "It keeps everything together: Your customers, your tasks and your employees (or colleagues)";
        $arr["helpParagraphs"][] = "Specify here how you would like your company called, how customers can contact you and where your organisation is located";
        $arr["helpParagraphs"][] = "As soon as you create this organisation, you will be added as its founder, and will have the capabilities to add employees & customers";

        $organization = new Organizations();
        $form = $this->createForm('Famoser\OnlineOfficeBundle\Form\OrganizationsType', $organization, array(
            'action' => $this->generateUrl('organizations_new'),
            'method' => 'POST',
            'user' => $this->getUser(),
        ));

        $form->handleRequest($request);

        $founder = null;
        foreach ($this->getUser()->getPersons() as $person) {
            if ($person->getId() == $request->get("organizations")["founder"]) {
                $founder = $person;
            }
        }

        if ($form->isSubmitted() && $form->isValid() && $founder != null) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($organization);

            $ep = new EmployeePosition();
            $ep->setName("CEO");
            $ep->setOrganization($organization);
            $ep->setRoles(EmployeeRoles::$MANAGE_ALL);
            $ep->setDescription("A chief executive officer (CEO) describes the position of the most senior corporate officer, executive, or administrator in charge of managing an organization.");
            $em->persist($ep);

            $ei = new EmployeeInformations();
            $ei->setOrganization($organization);
            $ei->setPerson($founder);
            $ei->setEmployeePosition($ep);
            $em->persist($ei);

            $em->flush();
            //return $this->redirectToRoute('organizations_show', array('id' => $organization->getId()));
            return $this->redirectToRoute('organizations_index');
        }

        $arr['organization'] = $organization;
        $arr['form'] = $form->createView();
        return $this->render($this->getCrudPath(CrudType::$NEW), $arr);
    }

    /**
     * Finds and displays a Organizations entity.
     *
     * @Route("/{id}", name="organizations_show")
     * @Method("GET")
     */
    public function showAction(Organizations $organization)
    {
        $deleteForm = $this->createDeleteForm($organization);

        return $this->render('organizations/show.html.twig', array(
            'organization' => $organization,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing Organizations entity.
     *
     * @Route("/{id}/edit", name="organizations_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Organizations $organization)
    {
        $deleteForm = $this->createDeleteForm($organization);
        $editForm = $this->createForm('Famoser\OnlineOfficeBundle\Form\OrganizationsType', $organization);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($organization);
            $em->flush();

            return $this->redirectToRoute('organizations_edit', array('id' => $organization->getId()));
        }

        return $this->render('edit.html.twig', array(
            'organization' => $organization,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a Organizations entity.
     *
     * @Route("/{id}", name="organizations_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Organizations $organization)
    {
        $form = $this->createDeleteForm($organization);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($organization);
            $em->flush();
        }

        return $this->redirectToRoute('organizations_index');
    }

    /**
     * Lists all Organizations entities.
     *
     * @Route("/select/{id}", name="organizations_select")
     * @Method("GET")
     */
    public function selectAction(Request $request, Organizations $organization)
    {
        $this->get('session')->set(CacheKeys::$SELECTED_COMPANY_ID, $organization->getId());
        return $this->redirectToRoute("organizations_index");
    }

    /**
     * Creates a form to delete a Organizations entity.
     *
     * @param Organizations $organization The Organizations entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Organizations $organization)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('organizations_delete', array('id' => $organization->getId())))
            ->setMethod('DELETE')
            ->getForm();
    }

    protected function getBaseFolder()
    {
        return "organizations";
    }

    protected function getActiveMainMenuEntry()
    {
        return MenuEntries::$ORGANISATIONS;
    }

    protected function getEntityIcon()
    {
        return IconEnum::$ORGANISATIONS;
    }
}
