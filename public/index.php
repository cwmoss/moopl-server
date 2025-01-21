<?php
#print "hello";
#exit;
/*
$handler = static function () {
    echo "hello franken {$_SERVER['REQUEST_URI']}";
};

while (true) {
    frankenphp_handle_request($handler);
}
*/
require __DIR__ . "/../src/_app.php";
