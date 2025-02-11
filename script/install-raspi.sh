#!/bin/bash

curl -O -L https://github.com/cwmoss/moopl-server/releases/download/v20250211/franken.zip
unzip franken.zip
cp release/local/bin/frankenphp /usr/local/bin/