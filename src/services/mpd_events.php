<?php

use moopl\message_to_mercure;
use moopl\app;
use moopl\track;

require __DIR__ . "/../../vendor/autoload.php";

$app = (new app)->get_container();

$mpd = $app->get(FloFaber\MphpD\MphpD::class);
$publisher = $app->get(message_to_mercure::class);

// print_r($publisher->hub);
// $publisher->send("mpd-status", "mpd-statusxx");

while (true) {
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
}
