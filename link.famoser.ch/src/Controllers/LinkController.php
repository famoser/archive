<?php
/**
 * Created by PhpStorm.
 * User: Florian Moser
 * Date: 09.07.2016
 * Time: 12:23
 */

namespace Famoser\Link\Controllers;


use Famoser\Link\Entities\Hit;
use Famoser\Link\Entities\Relink;
use Slim\Http\Request;
use Slim\Http\Response;

class LinkController extends BaseController
{
    public function relink(Request $request, Response $response, $args)
    {
        $helper = $this->getDatabaseHelper();
        $res = $helper->getSingleFromDatabase(new Relink(), "url = :url", array("url" => $args["id"]));
        if ($res == null) {
            return $response->withRedirect('http://famoser.ch', 302);
        } else {
            $hit = new Hit();
            $hit->create_date = time();
            $hit->ip = $_SERVER['HTTP_CLIENT_IP'] ?: ($_SERVER['HTTP_X_FORWARDE‌​D_FOR'] ?: $_SERVER['REMOTE_ADDR']);
            $hit->relink_id = $res->id;
            $helper->saveToDatabase($hit);
            return $response->withRedirect($res->target, 302);
        }
    }

    public function index(Request $request, Response $response, $args)
    {
        return $response->withRedirect('http://famoser.ch', 302);
    }
}