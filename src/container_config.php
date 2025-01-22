<?php

use Psr\Container\ContainerInterface;
use function DI\factory;
use function DI\create;
use function DI\get;

use Spiral\RoadRunner\Services\Manager;
use Spiral\Goridge\RPC\RPC;
use Symfony\Component\Mercure\Hub;
use Symfony\Component\Mercure\Jwt\StaticTokenProvider;

return [
    'appbase' => function () {
        return realpath(__DIR__ . '/../');
    },
    'env' => function () {
        // return get_env();
    },
    'hub_url' => function (ContainerInterface $c) {
        return 'http://franken/.well-known/mercure';
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
    FloFaber\MphpD\MphpD::class => create()->constructor([
        "host" => "mpd",
        "port" => 6600,
        "timeout" => 5
    ]),
    twentyseconds\db\pdox::class => create()->constructor("sqlite:tracks.db"),
    Manager::class => function () {
        return new Manager(RPC::create('tcp://127.0.0.1:6001'));
    },
    Hub::class => function (ContainerInterface $c) {
        return new Hub($c->get("hub_url"), new StaticTokenProvider($c->get("publisher_jwt")));
    }

];
