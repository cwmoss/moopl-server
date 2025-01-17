<?php

require_once __DIR__ . "/vendor/autoload.php";

use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\MPDException;
use twentyseconds\db\pdox;

$mphpd = new MphpD([
    "host" => "127.0.0.1",
    "port" => 6600,
    "timeout" => 5
]);

$mphpd->connect();
$db = $mphpd->db();
$res = $db->ls("");

print_r($res['directories']);
exit;
$f = new FloFaber\MphpD\Filter("base", " ", "Amazon MP3");
print "Filter " . $f . "\n";
$res = $db->search($f);

print_r($res);

/*
[133] => Array
        (
            [file] => Amazon MP3/Various Artists/This is Tapete Records!/12 - Be Steady (Radio Edit).mp3
            [last-modified] => 2011-10-11T13:42:46Z
            [format] => 44100:24:2
            [artist] => The Grand Opening
            [albumartist] => Various Artists
            [title] => Be Steady (Radio Edit)
            [album] => This is Tapete Records!
            [track] => 12
            [date] => 2011
            [genre] => Pop
            [disc] => 1
            [time] => 235
            [duration] => 235.337
        )

*/

$store = new pdox("sqlite:tracks.db");
$store->exec_sql_file("schema.sql");
foreach ($res as $track) {
    continue;
    $store->insert("tracks", [
        "file" => $track["file"],
        "modified_at" => $track["last-modified"],
        "title" => $track["title"],
        "artist" => $track["artist"],
        "album" => $track["album"],
        "year" => $track["date"] ?? "",
        "genre" => $track["genre"],
        "duration" => $track["time"],
    ]);
}

$json = $store->select_first_cell("tracks", 'json_group_array(json_array("file", "title", "artist"))');
print_r(json_decode($json));
