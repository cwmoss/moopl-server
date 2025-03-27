<?php

use moopl\message_to_mercure;
use moopl\app;
use moopl\airplay;
use moopl\status;

require __DIR__ . "/../../vendor/autoload.php";
ini_set("error_log", __DIR__ . "/../../var/caddy.log");
$app = (new app)->get_container();
$status = $app->get(status::class);
$airplay = $app->get(airplay::class);

try {

    $mpd = $app->get(FloFaber\MphpD\MphpD::class);
    $publisher = $app->get(message_to_mercure::class);
} catch (Throwable $e) {
    dbg("mpd events exception", $e->getMessage());
}
// print_r($publisher->hub);
// $publisher->send("mpd-status", "mpd-statusxx");
dbg("mpd events start");

$previous = [];
while (true) {
    sleep(1);

    try {
        $status->load();
        if ($status->airplay == "on") {
            $meta = $airplay->meta();
            if ($meta != $previous) {
                $publisher->send("mpd-status", ["airplay" => $meta]);
                $previous = $meta;
            }
        }
    } catch (Throwable $e) {
        dbg("renderer watch loop exception", $e->getMessage());
    }
}
