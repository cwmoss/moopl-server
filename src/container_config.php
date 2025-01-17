<?php

use Psr\Container\ContainerInterface;
use function DI\factory;
use function DI\create;
use function DI\get;

use Spiral\RoadRunner\Services\Manager;
use Spiral\Goridge\RPC\RPC;

return [
    'appbase' => function () {
        return realpath(__DIR__ . '/../');
    },
    'env' => function () {
        // return get_env();
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
    'api_keys' => function (ContainerInterface $c) {
        return $c->get(druckt\config::class)->api_keys;
    },
    FloFaber\MphpD\MphpD::class => create()->constructor([
        "host" => "127.0.0.1",
        "port" => 6600,
        "timeout" => 5
    ]),
    twentyseconds\db\pdox::class => create()->constructor("sqlite:tracks.db"),
    Manager::class => function () {
        return new Manager(RPC::create('tcp://127.0.0.1:6001'));
    }
    // druckt\api_request::class => create()->constructor(get('conf')),
    // druckt\cli_request::class => create()->constructor(get('conf')),

];
