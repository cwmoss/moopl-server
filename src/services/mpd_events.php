<?php

use moopl\message_to_mercure;
use moopl\app;
use moopl\track;

require __DIR__ . "/../../vendor/autoload.php";
ini_set("error_log", __DIR__ . "/../../var/caddy.log");
$app = (new app)->get_container();

try {

    $mpd = $app->get(FloFaber\MphpD\MphpD::class);
    $publisher = $app->get(message_to_mercure::class);
} catch (Throwable $e) {
    dbg("mpd events exception", $e->getMessage());
}
// print_r($publisher->hub);
// $publisher->send("mpd-status", "mpd-statusxx");
dbg("mpd events start");

while (true) {
    try {
        $mpd->connect();
        $res = $mpd->idle(timeout: 360_000);
        print_r($res);

        // herr vergib mir, warum sleep?
        sleep(1);
        // usleep(10000);
        // "mixer"
        // $mpd->close();
        // $mpd->connect();
        $res2 = $mpd->status();
        if ($current = $mpd->player()->current_song())
            $res2["current_song"] = $current;

        if (in_array("playlist", $res)) {
            $res2["queue"] = $mpd->queue()->get();
        }

        print_r($res2);
        $id = $publisher->send("mpd-status", $res2);
        print $id . "\n";
    } catch (Throwable $e) {
        dbg("mpd events loop exception", $e->getMessage());
    }
}
