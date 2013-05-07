<?php

$app = require_once __DIR__.'/../bootstrap.php';

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;

Request::enableHttpMethodParameterOverride();

/*
 * Routes
 */
$app->get('/', function (Request $request) use($app) {
    return $app['twig']->render('game.html.twig');
});

/*
 * Debug Routes
 */
if ($app['debug']) {
	$app->get('/info', function() {
		ob_start();
		phpinfo();
		$info = ob_get_contents();
		ob_end_clean();
		return $info;
	});
}
/*
 * Error handling (404, 500, ...)
 */
$app->error(function(\Exception $exception) use ($app) {
    if ($exception instanceof NotFoundHttpException) {
        return $app['twig']->render('404.html.twig', array('message' => $exception->getMessage()));
    }
    return $app['twig']->render('500.html.twig', array('message' => $exception->getMessage()));
});

$app->run();

return $app;