<?php

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();

$app['debug'] = true;

// Doctrine DBAL Service provider
$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'   => 'pdo_sqlite',
        'path'     => __DIR__.'/data/app.db',
    ),
));

// Doctrine ORM Service provider
$app->register(new Dflydev\Silex\Provider\DoctrineOrm\DoctrineOrmServiceProvider(), array(
    "orm.proxies_dir" => __DIR__.'/cache/proxies',
    "orm.em.options" => array(
        "mappings" => array(
            array(
                "type" => "annotation",
                "namespace" => "WHL\Model",
                "path" => __DIR__."/src/WHL/Model",
            ),
        ),
    ),
));

// The Session service
$app->register(new Silex\Provider\SessionServiceProvider());

// The Logging Service
$app->register(new Silex\Provider\MonologServiceProvider(), array(
	'monolog.logfile' => __DIR__.'/logs/silex.log',
));

// The Twig service
$app->register(new Silex\Provider\TwigServiceProvider(), array(
        'twig.path' => __DIR__.'/views'
        )
);

return $app;