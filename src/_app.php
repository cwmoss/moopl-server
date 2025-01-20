<?php
ignore_user_abort(true);

use moopl\app;
use moopl\library;
use moopl\services;
use moopl\player;
use twentyseconds\db\pdox;

use Nyholm\Psr7\Response;
use Nyholm\Psr7\Factory\Psr17Factory;

require __DIR__ . "/../vendor/autoload.php";

error_reporting(E_ALL);

$app = (new app)->get_container();

$db = $app->get(pdox::class);
$db->exec_sql_file(__DIR__ . "/../schema.sql");


$count = 0;

// Handler outside the loop for better performance (doing less work)
$handler = static function () use ($app) {
    // Called when a request is received,
    // superglobals, php://input and the like are reset
    // echo $myApp->handle($_GET, $_POST, $_COOKIE, $_FILES, $_SERVER);
    print "hello franken";
};

$maxRequests = (int)($_SERVER['MAX_REQUESTS'] ?? 0);
for ($nbRequests = 0; !$maxRequests || $nbRequests < $maxRequests; ++$nbRequests) {
    $keepRunning = \frankenphp_handle_request($handler);

    // Do something after sending the HTTP response
    // $myApp->terminate();

    // Call the garbage collector to reduce the chances of it being triggered in the middle of a page generation
    gc_collect_cycles();

    if (!$keepRunning) break;
}

// Cleanup
// $myApp->shutdown();
exit;

print "hello franken";
exit;

$env = Environment::fromGlobals();

if ($env->getMode() == "http") {
    $worker = Worker::create();
    $factory = new Psr17Factory();
    $psr7 = new PSR7Worker($worker, $factory, $factory, $factory);

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
                "/api/status" => $app->get(player::class)->status(),
                "/services/mpd" => (new services($app->make(Manager::class)))->list(),
                "/services/mpd/stop" => (new services($app->make(Manager::class)))->mpd_stop(),
                "/services/mpd/restart" => (new services($app->make(Manager::class)))->mpd_start(),
                default => ("~ " . $count . "~" . $url . "~"),
            };

            if (!is_string($result)) $result = json_encode($result);
            $psr7->respond(new Response(200, [], $result));
        } catch (\Throwable $e) {
            $psr7->respond(new Response(500, [], 'Something Went Wrong!' . "\n\n" . (string)$e));
            $psr7->getWorker()->error((string)$e);
        }
    }
} elseif ($env->getMode() == "centrifuge") {
    $worker = Worker::create();
    $requestFactory = new RequestFactory($worker);

    // Create a new Centrifugo Worker from global environment
    $centrifugoWorker = new CentrifugoWorker($worker, $requestFactory);

    while ($request = $centrifugoWorker->waitRequest()) {

        if ($request instanceof Request\Invalid) {
            $errorMessage = $request->getException()->getMessage();

            if ($request->getException() instanceof \RoadRunner\Centrifugo\Exception\InvalidRequestTypeException) {
                $payload = $request->getException()->payload;
            }

            // Handle invalid request
            // $logger->error($errorMessage, $payload ?? []);

            continue;
        }
        /*
        if ($request instanceof Request\Refresh) {
            try {
                // Do something
                $request->respond(new Payload\RefreshResponse(
                    // ...
                ));
            } catch (\Throwable $e) {
                $request->error($e->getCode(), $e->getMessage());
            }

            continue;
        }
*/
        if ($request instanceof Request\Subscribe) {
            $logger->info('subscribe #req');
            try {
                // Do something
                $request->respond(new Payload\SubscribeResponse(
                    [],
                    ["hi", "ws here"]
                ));

                // You can also disconnect connection
                // $request->disconnect('500', 'Connection is not allowed.');
            } catch (\Throwable $e) {
                $request->error($e->getCode(), $e->getMessage());
            }

            continue;
        }
        /*
        if ($request instanceof Request\Publish) {
            try {
                // Do something
                $request->respond(new Payload\PublishResponse(
                    // ...
                ));

                // You can also disconnect connection
                $request->disconnect('500', 'Connection is not allowed.');
            } catch (\Throwable $e) {
                $request->error($e->getCode(), $e->getMessage());
            }

            continue;
        }
*/
        /*
        if ($request instanceof Request\RPC) {
            try {
                $response = $router->handle(
                    new Request(uri: $request->method, data: $request->data),
                ); // ['user' => ['id' => 1, 'username' => 'john_smith']]

                $request->respond(new Payload\RPCResponse(
                    data: $response
                ));
            } catch (\Throwable $e) {
                $request->error($e->getCode(), $e->getMessage());
            }

            continue;
        }
        */
    }
}
