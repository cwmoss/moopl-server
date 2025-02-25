<?php
ignore_user_abort(true);

use moopl\admin;
use moopl\app;
use moopl\library;
use moopl\player;
use moopl\info;
use moopl\image;

use Nyholm\Psr7\Response;
use Nyholm\Psr7\Factory\Psr17Factory;
use twentyseconds\attribute_router\router;

require __DIR__ . "/../vendor/autoload.php";

error_reporting(E_ALL);
// ini_set("error_log", "php://stderr");
ini_set("display_errors", 0);

$app = (new app)->get_container();

$router = new router([
    image::class,
    player::class,
    library::class,
    info::class,
    admin::class
], "/api");

$count = 0;

// Handler outside the loop for better performance (doing less work)
$handler = static function () use ($app, $router) {
    // Called when a request is received,
    // superglobals, php://input and the like are reset
    // echo $myApp->handle($_GET, $_POST, $_COOKIE, $_FILES, $_SERVER);

    // why?
    $url = explode("?", $_SERVER['REQUEST_URI'])[0];
    if ($_SERVER["REQUEST_METHOD"] == "POST") $data = json_decode(file_get_contents('php://input'), true);
    // TODO: ONLY in dev mode
    send_cors();
    if ($_SERVER["REQUEST_METHOD"] == "OPTIONS") return;
    try {
        // dbg("+++ match", $url, $_SERVER);
        $found = $router->match($url, $_SERVER["REQUEST_METHOD"]);
        $result = $app->call($found->class, $data ?? $_GET);

        if (!is_null($result) && !is_string($result)) $result = json_encode($result);

        print $result;
    } catch (\Throwable $e) {
        dbg("++ exception", $e);
        print json_encode(["error" => $e->getMessage()]);
        // print "--input--";
        // var_dump($data);
    }
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


function send_cors() {
    $orig = $_SERVER['HTTP_ORIGIN'];
    header('Access-Control-Allow-Origin: ' . $orig);
    header('Access-Control-Allow-Methods: POST, GET, HEAD, PATCH, DELETE, OPTIONS');
    header('Access-Control-Max-Age: 1000');
    if (array_key_exists('HTTP_ACCESS_CONTROL_REQUEST_HEADERS', $_SERVER)) {
        header(
            'Access-Control-Allow-Headers: '
                . 'Authorization, Origin, X-Requested-With, X-Request-ID, X-HTTP-Method-Override, Content-Type, Upload-Length, Upload-Offset, Tus-Resumable, Upload-Metadata'
            //   . $_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']
        );
    } else {
        //   header('Access-Control-Allow-Headers: *');
    }

    header('Access-Control-Allow-Credentials: true');
    //  header('Access-Control-Allow-Headers: Authorization');
    header('Access-Control-Expose-Headers: Upload-Key, Upload-Checksum, Upload-Length, Upload-Offset, Upload-Metadata, Tus-Version, Tus-Resumable, Tus-Extension, Location');
}
