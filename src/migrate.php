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

mkdir(__DIR__ . "/../var/images", recursive: true);
