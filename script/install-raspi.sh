#!/bin/bash

curl -O -L https://github.com/cwmoss/moopl-server/releases/download/v20250211/franken.zip
unzip franken.zip
sudo cp release/local/bin/frankenphp /usr/local/bin/
sudo cp -r release/local/lib/* /usr/local/lib/

sudo setcap cap_net_bind_service=+ep $(which frankenphp)

# frankenphp run --config raspi/Caddyfile --envfile .pubkey.env