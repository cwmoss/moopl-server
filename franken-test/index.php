<?php
/*
mkdir franken-test; cd franken-test;
# create this file as index.php
docker run \
    -e FRANKENPHP_CONFIG="worker /app/public/index.php" \
    -v $PWD:/app/public \
    -p 80:80 -p 443:443 -p 443:443/udp \
    dunglas/frankenphp
    
# open a new terminal tab
curl -vv -k https://localhost
curl -vv -k https://localhost/hello/my/name/is/bunny
curl -vv -k https://localhost/index.php

*/
$handler = static function () {
    echo "hello franken {$_SERVER['REQUEST_URI']}";
};

while (true) {
    frankenphp_handle_request($handler);
}
