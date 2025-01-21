<?php
require_once __DIR__ . "/vendor/autoload.php";

// change these values accordingly to your hub installation
define('HUB_URL', 'https://localhost/.well-known/mercure');
// define('JWT', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJtZXJjdXJlIjp7InB1Ymxpc2giOlsiKiJdfX0.HnjyaRc8JXZzc6Sp4RZJD5CJW1Rr0IUYxiKcbAxRr56bsLMzdgLxUUB8GLFkffJVgb20GAjm139l9PJL32UYpCprQ9wZfQP4YxCN0GMjHNzxapG3uIrCSCN5hxXtcGtsAeYmB6U6XiW1kSYWrro7P1_Dk3zdFq98AkqEBDO1r7NkPxGVowejK7QF7DEfPEOJM8b96AxDdcXardTsp5_TFcN9vsCeQzftYZGyR4_86Meq-nIZ20vsaVDUjAS8SIVx5jSS8ixHXjbWLxUBm9Qa26UID5qPbr-55RRxQPkMKEYgu3ZKnR5I7uQMP1HR0v0mkg_Y4x_FMph18B3P-WK9YeUKDq12wczTpe4NGuxZuomQbgdlTWG8TivcZdg7IGQEe9-MjDXUAfsKQ0tOg_hFkS-YLQXfuuZf2kyoBSFbSwUwr11diJX2utOZls-Gjh6G5AyOD_tp6voE4SwfQ7WZK2Z9GMy2W87SzRV8A49z-ClqsgJvEI_VWIYGacyerE26Bni9EVqjdneFYTpxhR42bzdPU3jQqInrXC_YE85rSz1slT9OQeXKdb_Uj2LMC-11gA6OrL6cQi1WuFabjU6KJ13GIGWixMvxmpgGyCIkZAgj9dWwLGz0AhXWLRdNWzCPOMJhYvdrOYfRD5pBxmqljfkVz73W7uMOLFyplqJEEXk');
$jwt = file_get_contents("publisher.jwt");

use Symfony\Component\Mercure\Hub;
use Symfony\Component\Mercure\Jwt\StaticTokenProvider;
use Symfony\Component\Mercure\Update;

$hub = new Hub(HUB_URL, new StaticTokenProvider($jwt));
// Serialize the update, and dispatch it to the hub, that will broadcast it to the clients
$id = $hub->publish(new Update('mpd-status', json_encode(["status" => "not playing"])));
