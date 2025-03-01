.PHONY: composer-update install moode-off moode-on

all: install

install: composer-update .env var/publisher.jwt var/.pubkey.env
	php src/migrate.php

composer-update:
	mkdir -p var/
	composer update

.env:
	cp dot.env .env

var/publisher.key.pub:
	# ssh-keygen -t rsa -b 4096 -m PEM -f var/publisher.key
	openssl genrsa -out var/publisher.key 4096
	openssl rsa -in var/publisher.key -pubout -outform PEM -out var/publisher.key.pub

var/.pubkey.env: var/publisher.key.pub
	echo "MERCURE_PUBLISHER_JWT_ALG=RS256\nMERCURE_PUBLISHER_JWT_KEY=\"$$(cat var/publisher.key.pub)\"" > var/.pubkey.env

var/publisher.jwt: var/publisher.key.pub
	php script/make-jwt.php 

raspi-sync:
	rsync -avz --exclude="vendor/" --exclude="composer.lock" --exclude="var/" --exclude=".git" --exclude="spool/" --exclude="trash/" --exclude="publisher.*" --exclude=".pubkey*" --exclude=".env" --exclude="*.db" ./ hypertrap:/var/moopl/

# debian bookworm
raspi-setup: composer-update install
	echo "done"

raspi-start: moode-off
	# systemctl start mpd
	SERVER_NAME=hypertrap.fritz.box frankenphp start --config raspi/Caddyfile --envfile var/.pubkey.env

switch-to-moode:
	sudo systemctl disable caddy --now
	sudo systemctl disable mpd --now
	sudo systemctl enable php8.2-fpm --now
	sudo systemctl enable nginx --now
	sudo systemctl enable rc-local --now

switch-to-app:
	sudo systemctl disable rc-local
	sudo systemctl mask rc-local
	sudo systemctl disable nginx --now
	sudo systemctl disable php8.2-fpm --now
	sudo systemctl enable mpd --now
	sudo systemctl enable caddy --now

services-reload:
	sudo cp raspi/caddy.service /etc/systemd/system/
	sudo systemctl daemon-reload
	# journalctl -xef -u caddy.service
	
xmoode-off:
	sudo systemctl stop nginx

xmoode-on:
	frankenphp stop
	sudo systemctl start nginx