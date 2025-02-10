<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

use moopl\app;
use moopl\library;
use twentyseconds\db\pdox;

require __DIR__ . "/../vendor/autoload.php";

$app = (new app)->get_container();

$db = $app->get(pdox::class);
$db->exec_sql_file(__DIR__ . "/../schema.sql");
$app->get(library::class)->import_radios_csv(__DIR__ . "/../fixtures/radios.csv");

$base = __DIR__ . "/../";
mkdir("$base/var/images/radio", recursive: true);
`cp $base/fixtures/radio-logos/* $base/var/images/radio/`;
`cp $base/fixtures/default-radio.jpg $base/var/images/radio/__default.jpg`;

mkdir("$base/var/images/tracks", recursive: true);
`cp $base/fixtures/record1.png $base/var/images/tracks/__default.jpg`;
