<?php

$app = require_once __DIR__.'/../bootstrap.php';

use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpFoundation\Request;

use WHL\Model\Game;
use WHL\Model\Url;

Request::enableHttpMethodParameterOverride();

/*
 * Routes
 */
$app->get('/', function (Request $request) use($app) {
    return $app['twig']->render('index.html.twig');
});

$app->get('/new', function (Request $request) use($app) {
    return $app['twig']->render('new.html.twig');
})->bind('game_new');

$app->post('/create', function (Request $request) use($app) {

    $em = $app['orm.em'];

    $game = new Game();
    $game->setPlayed(false);
    $em->persist($game);

    $text = $request->request->get('urls');
    $urlsData = explode("\r\n", $text);

    foreach ($urlsData as $urlData) {
        $url = new Url();
        $url->setCounter(0);
        $url->setHref($urlData);
        $url->setGame($game);
        $em->persist($url);
    }

    $em->flush();

    return $app->redirect("/report/" . $game->getId());
})->bind('game_create');

$app->get('/game/{id}', function (Request $request, $id) use($app) {

    $em = $app['orm.em'];

    $game = $em->getRepository('WHL\Model\Game')->find($id);

    $game->setPlayed(true);

    $em->flush();

    $data = array();

    foreach ($game->getUrls() as $url) {
        $data[] = array( "id" => $url->getId(), "href" => $url->getHref());
    }

    $encrypted = base64_encode(json_encode($data));

    return $app['twig']->render('game.html.twig', array('data' => $encrypted, 'game' => $game));
})->bind('game_show');

$app->get('/report/{id}', function (Request $request, $id) use($app) {

    $em = $app['orm.em'];

    $game = $em->getRepository('WHL\Model\Game')->find($id);

    $totalCount = 0;

    foreach ($game->getUrls() as $url) {
        $totalCount += $url->getCounter();
    }

    return $app['twig']->render('report.html.twig', array('game' => $game, 'total' => $totalCount));
})->bind('game_report');

$app->post('/url/{id}', function (Request $request, $id) use($app) {
    $em = $app['orm.em'];

    $url = $em->getRepository('WHL\Model\Url')->find($id);

    $url->setCounter($url->getCounter() + 1);

    $em->flush();

    return new \Symfony\Component\HttpFoundation\Response("", 200);
})->bind('url_update');

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