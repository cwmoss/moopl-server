<?php

require __DIR__ . "/../../vendor/autoload.php";

$builder = new DI\ContainerBuilder();
$builder->useAutowiring(true);
// $builder->useAnnotations(false);
$builder->addDefinitions(__DIR__ . '/container_config.php');
$app = $builder->build();

$mpd = $app->get(FloFaber\MphpD\MphpD::class);

while (true) {
    $mpd->connect();
    $res = $mpd->idle(timeout: 3600);
    print_r($res);
}
