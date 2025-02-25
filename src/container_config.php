<?php

use moopl\config;
use Psr\Container\ContainerInterface;
use function DI\factory;
use function DI\create;
use function DI\get;

// use Spiral\RoadRunner\Services\Manager;
// use Spiral\Goridge\RPC\RPC;
use Symfony\Component\Mercure\Hub;
use Symfony\Component\Mercure\Jwt\StaticTokenProvider;
use twentyseconds\db\logger;

return [
    'appbase' => function () {
        return realpath(__DIR__ . '/../');
    },
    'env' => function () {
        // return get_env();
    },
    'hub_url' => function (ContainerInterface $c) {
        return is_docker() ? 'http://franken/.well-known/mercure' : 'http://localhost/.well-known/mercure';
    },
    'publisher_jwt' => function (ContainerInterface $c) {
        return file_get_contents($c->get("appbase") . "/publisher.jwt");
    },
    'log' => function (ContainerInterface $c) {
        $log = match (true) {
            // fcgi (auch im docker) immer nach app.log
            PHP_SAPI == 'fpm-fcgi' => 'var/app.log',
            is_docker() => 'php://stdout',
            PHP_SAPI == 'cli-server' => 'php://stderr',
            PHP_SAPI == 'cli' => 'var/cli.log',
            default => 'var/app.log'
        };
        // $log[0] != '/' &&
        if (!str_contains($log, ':')) $log = $c->get("appbase") . '/' . $log;
        ini_set('error_log', $log);
        define("APP_LOGFILE", $log);
        return $log;
    },
    config::class => create()->constructor("/var/lib/mpd/music"),
    FloFaber\MphpD\MphpD::class => create()->constructor([
        "host" => is_docker() ? "mpd" : "localhost",
        "port" => 6600,
        "timeout" => 5
    ]),
    twentyseconds\db\pdox::class => create()->constructor("sqlite:" . __DIR__ . "/../var/tracks.db", logger: new logger()),
    // Manager::class => function () {
    //    return new Manager(RPC::create('tcp://127.0.0.1:6001'));
    //},
    Hub::class => function (ContainerInterface $c) {
        return new Hub($c->get("hub_url"), new StaticTokenProvider($c->get("publisher_jwt")));
    }

];
