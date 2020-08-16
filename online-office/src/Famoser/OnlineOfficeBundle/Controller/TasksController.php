<?php

namespace Famoser\OnlineOfficeBundle\Controller;

use Famoser\OnlineOfficeBundle\Controller\Base\BaseController;
use Famoser\OnlineOfficeBundle\Entity\Task;
use Famoser\OnlineOfficeBundle\Enums\IconEnum;
use Famoser\OnlineOfficeBundle\Enums\MenuEntries;
use Famoser\OnlineOfficeBundle\Models\View\BreadCrumbEntry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Famoser\OnlineOfficeBundle\Entity\Tasks;

/**
 * Tasks controller.
 *
 * @Route("/tasks")
 */
class TasksController extends BaseController
{
    /**
     * Lists all Tasks entities.
     *
     * @Route("/", name="tasks_index")
     * @Method("GET")
     */
    public function indexAction()
    {
        $arr = [];

        // replace this example code with whatever you need
        return $this->render($this->getPath("index"), $arr);
    }

    /**
     * Creates a new Tasks entity.
     *
     * @Route("/new", name="tasks_new")
     * @Method({"GET", "POST"})
     */
    public function newAction(Request $request)
    {
        $task = new Task();
        $form = $this->createForm('Famoser\OnlineOfficeBundle\Form\TaskType', $task);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($task);
            $em->flush();

            return $this->redirectToRoute('tasks_show', array('id' => $task->getId()));
        }

        return $this->render('tasks/new.html.twig', array(
            'task' => $task,
            'form' => $form->createView(),
        ));
    }

    /**
     * Finds and displays a Tasks entity.
     *
     * @Route("/{id}", name="tasks_show")
     * @Method("GET")
     */
    public function showAction(Task $task)
    {
        $deleteForm = $this->createDeleteForm($task);

        return $this->render($this->getPath("show"), array(
            'task' => $task,
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Displays a form to edit an existing Tasks entity.
     *
     * @Route("/{id}/edit", name="tasks_edit")
     * @Method({"GET", "POST"})
     */
    public function editAction(Request $request, Task $task)
    {
        $deleteForm = $this->createDeleteForm($task);
        $editForm = $this->createForm('Famoser\OnlineOfficeBundle\Form\TaskType', $task);
        $editForm->handleRequest($request);

        if ($editForm->isSubmitted() && $editForm->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($task);
            $em->flush();

            return $this->redirectToRoute('tasks_edit', array('id' => $task->getId()));
        }

        return $this->render($this->getPath("edit"), array(
            'task' => $task,
            'edit_form' => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        ));
    }

    /**
     * Deletes a Tasks entity.
     *
     * @Route("/{id}", name="tasks_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, Task $task)
    {
        $form = $this->createDeleteForm($task);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->remove($task);
            $em->flush();
        }

        return $this->redirectToRoute('tasks_index');
    }

    /**
     * Creates a form to delete a Tasks entity.
     *
     * @param Task $task The Tasks entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm(Task $task)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('task_delete', array('id' => $task->getId())))
            ->setMethod('DELETE')
            ->getForm()
        ;
    }

    protected function getBaseFolder()
    {
        return "tasks";
    }

    protected function getActiveMainMenuEntry()
    {
        return MenuEntries::$TASKS;
    }

    protected function getEntityIcon()
    {
        return IconEnum::$TASKS;
    }
}
