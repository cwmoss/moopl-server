<?php

use moopl\library;
use moopl\services;

use Nyholm\Psr7\Response;
use Nyholm\Psr7\Factory\Psr17Factory;

use Spiral\RoadRunner\Worker;
use Spiral\RoadRunner\Http\PSR7Worker;
use Spiral\RoadRunner\Services\Manager;
use twentyseconds\db\pdox;

error_reporting(E_ALL);

require __DIR__ . "/../vendor/autoload.php";

$builder = new DI\ContainerBuilder();
$builder->useAutowiring(true);
// $builder->useAnnotations(false);
$builder->addDefinitions(__DIR__ . '/container_config.php');
$app = $builder->build();

$db = $app->get(pdox::class);
$db->exec_sql_file(__DIR__ . "/../schema.sql");

$worker = Worker::create();

$factory = new Psr17Factory();

$psr7 = new PSR7Worker($worker, $factory, $factory, $factory);
$count = 0;

while (true) {
    try {
        $request = $psr7->waitRequest();
        if ($request === null) {
            break;
        }
    } catch (\Throwable $e) {
        $psr7->respond(new Response(400));
        continue;
    }

    try {
        $url = $request->getUri()->getPath();
        $count++;
        $result = match ($url) {
            "/" => 'Hello RoadRunner! ' . $_SERVER["MUSIC_HOME"] . " " . $count . $url,
            "/api/tracks" => $app->get(library::class)->index_json(),
            "/api/index" => $app->get(library::class)->update_index(),
            "/services/mpd" => (new services($app->make(Manager::class)))->list(),
            "/services/mpd/stop" => (new services($app->make(Manager::class)))->mpd_stop(),
            "/services/mpd/restart" => (new services($app->make(Manager::class)))->mpd_start(),
            default => ("~" . $count . "~" . $url . "~"),
        };

        if (!is_string($result)) $result = json_encode($result);
        $psr7->respond(new Response(200, [], $result));
    } catch (\Throwable $e) {
        $psr7->respond(new Response(500, [], 'Something Went Wrong!' . "\n\n" . (string)$e));
        $psr7->getWorker()->error((string)$e);
    }
}

function mpd() {
    return "services: ";
}
