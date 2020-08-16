<?php
/**
 * Created by PhpStorm.
 * User: famoser
 * Date: 22/05/2016
 * Time: 22:40
 */

use Famoser\Link\Middleware\LoggingMiddleware;
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use Slim\App;
use Slim\Container;

require '../../vendor/autoload.php';

$configuration = [
    'settings' => [
        'displayErrorDetails' => false,
        'debug_mode' => true,
        'db' => [
            'path' => "sqlite.db",
            'test_path' => "sqlite_tests.db"
        ],
        'data_path' => realpath("../../app"),
        'asset_path' => realpath("../Assets"),
        'log_path' => realpath("../../app/logs"),
        'file_path' => realpath("../../app/files"),
        'template_path' => realpath("../../app/templates"),
        'cache_path' => realpath("../../app/cache"),
        'public_path' => realpath("../public")
    ],
    'api_settings' => [
        'api_version' => 1,
        'test_mode' => false
    ]
];

$c = new Container($configuration);
/*
$c['notFoundHandler'] = function (Container $c) {
    return function (Request $req, Response $resp) use ($c) {
        $res = new ApiResponse(false, ApiErrorTypes::RequestUriInvalid);
        if ($c->get("settings")["debug_mode"])
            $res->DebugMessage = "requested: " . $req->getRequestTarget();

        return $resp->withStatus(302, "endpoint not found")->withJson($res);
    };
};
$c['notAllowedHandler'] = function (Container $c) {
    return function (Request $req, Response $resp) use ($c) {
        $res = new ApiResponse(false, ApiErrorTypes::RequestUriInvalid);
        if ($c->get("settings")["debug_mode"])
            $res->DebugMessage = "requested: " . $req->getRequestTarget();

        return $resp->withStatus(405, "wrong method")->withJson($res);
    };
}; */
$c['errorHandler'] = function (Container $c) {
    return function (Request $request, Response $response, Exception $exception) use ($c) {
        $response->getBody()->write($exception->getMessage());
        return $response->withStatus(500);
    };
};

// Register component on container
$c['view'] = function (Container $c) {
    $view = new \Slim\Views\Twig($c->get("settings")["template_path"], [
        'cache' => $c->get("settings")["cache_path"],
        'debug' => $c->get("settings")["debug_mode"]
    ]);
    $view->addExtension(new \Slim\Views\TwigExtension(
        $c['router'],
        $c['request']->getUri()
    ));

    return $view;
};

$controllerNamespace = 'Famoser\Link\Controllers\\';

$app = new App($c);
$app->add(new LoggingMiddleware($app->getContainer()));

$app->get('/create', $controllerNamespace . 'PublicController:create')->setName("create");
$app->post('/create', $controllerNamespace . 'PublicController:create')->setName("createPost");
$app->get('/view', $controllerNamespace . 'PublicController:view')->setName("view");
$app->get('/edit/{id}', $controllerNamespace . 'PublicController:edit')->setName("edit");
$app->post('/edit/{id}', $controllerNamespace . 'PublicController:edit')->setName("editPost");
$app->get('/{id}', $controllerNamespace . 'LinkController:relink')->setName("current");
$app->get('/', $controllerNamespace . 'LinkController:index')->setName("index");

$app->run();