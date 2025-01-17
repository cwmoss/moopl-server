#!/bin/bash

/app/bin/configure-mpd.sh

rr serve --dotenv .env -c .rr.docker.yaml