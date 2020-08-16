<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 07/06/2016
 * Time: 17:54
 */

namespace Famoser\Link\Controllers;


use Famoser\Link\Entities\Hit;
use Famoser\Link\Entities\Relink;
use Famoser\Link\ViewModels\RelinkViewModel;
use Slim\Http\Request;
use Slim\Http\Response;

class PublicController extends BaseController
{
    public function create(Request $request, Response $response, $args)
    {
        $viewArgs = array();
        if ($request->getMethod() == "POST") {
            $relink = new Relink();

            $params = $request->getParsedBody();
            $relink->name = $params["name"];
            $relink->description = $params["description"];
            $relink->url = $params["url"];
            $relink->target = $params["target"];
            $viewArgs["relink"] = new RelinkViewModel($relink, array());

            $old = $this->getDatabaseHelper()->getSingleFromDatabase(new Relink(), "url = :url", array("url" => $relink->url));
            if ($old == null) {
                $this->getDatabaseHelper()->saveToDatabase($relink);
                return $response->withRedirect("view");
            }
        } else {
            $old = null;
            $newUrl = null;
            do {
                $newUrl = uniqid();
                $newUrl = substr($newUrl, count($newUrl) - 5);
                $old = $this->getDatabaseHelper()->getSingleFromDatabase(new Relink(), "url = :url", array("url" => $newUrl));
            } while ($old != null);

            $relink = new Relink();
            $relink->url = $newUrl;

            $viewArgs["relink"] = new  RelinkViewModel($relink, array());
        }
        return $this->renderTemplate($response, "create", $viewArgs);
    }

    public function view(Request $request, Response $response, $args)
    {
        $viewArgs = array();
        $relinks = $this->getDatabaseHelper()->getFromDatabase(new Relink(), null, null, "url");
        $viewModels = array();
        foreach ($relinks as $relink) {
            $hits = $this->getDatabaseHelper()->getFromDatabase(new Hit(), "relink_id = :id", array("id" => $relink->id), "create_date DESC");
            $viewModels[] = new RelinkViewModel($relink, $hits);
        }
        $viewArgs["relinks"] = $viewModels;
        return $this->renderTemplate($response, "view", $viewArgs);
    }

    public function edit(Request $request, Response $response, $args)
    {
        $viewArgs = array();
        $relink = $this->getDatabaseHelper()->getSingleFromDatabase(new Relink(), "id = :id", array("id" => $args["id"]));

        if ($request->getMethod() == "POST") {
            $params = $request->getParsedBody();
            $relink->name = $params["name"];
            $relink->description = $params["description"];
            $relink->target = $params["target"];
            $this->getDatabaseHelper()->saveToDatabase($relink);
        }

        $hits = $this->getDatabaseHelper()->getFromDatabase(new Hit(), "relink_id = :id", array("id" => $relink->id), "create_date DESC");
        $viewArgs["relink"] = new RelinkViewModel($relink, $hits);

        return $this->renderTemplate($response, "edit", $viewArgs);
    }
}