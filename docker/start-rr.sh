#!/bin/bash

composer update

/app/bin/configure-mpd.sh

rr serve --dotenv .env -c .rr.docker.yaml