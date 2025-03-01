<?php
$base = __DIR__ . "/../";
require_once $base . "/vendor/autoload.php";

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$privateKey = file_get_contents($base . "var/publisher.key");
$publicKey = file_get_contents($base . "var/publisher.key.pub");
$jwt_file = $base . "var/publisher.jwt";

$payload = [
    "mercure" => [
        "publish" => [
            "*"
        ]
    ],
];

$jwt = JWT::encode($payload, $privateKey, 'RS256');
echo "Encode:\n" . print_r($jwt, true) . "\n";

file_put_contents($jwt_file, $jwt);

$decoded = JWT::decode($jwt, new Key($publicKey, 'RS256'));

/*
 NOTE: This will now be an object instead of an associative array. To get
 an associative array, you will need to cast it as such:
*/

$decoded_array = (array) $decoded;
echo "Decode:\n" . print_r($decoded_array, true) . "\n";
