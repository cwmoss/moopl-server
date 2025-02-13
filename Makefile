.PHONY: composer-update install

all: install

xxxxxall: .env publisher.key.pub .pubkey.env publisher.jwt

install: composer-update .env publisher.jwt
	php src/migrate.php

composer-update:
	composer update

.env:
	cp dot.env .env

publisher.key.pub:
	# ssh-keygen -t rsa -b 4096 -m PEM -f publisher.key
	openssl genrsa -out publisher.key 4096
	openssl rsa -in publisher.key -pubout -outform PEM -out publisher.key.pub
	echo "MERCURE_PUBLISHER_JWT_KEY=\"$$(cat publisher.key.pub)\"" > .pubkey.env

.pubkey.env: publisher.key.pub
	

publisher.jwt: publisher.key.pub
	php script/make-jwt.php

raspi-sync:
	rsync -avz --exclude="vendor/" --exclude="var/" --exclude=".git" --exclude="spool/" --exclude="trash/" --exclude="publisher.*" --exclude=".pubkey*" --exclude=".env" --exclude="*.db" ./ hypertrap:/var/moopl/

# debian bookworm
raspi-setup: composer-update install
	echo "done"

raspi-start:
	# systemctl start mpd
	MERCURE_PUBLISHER_JWT_ALG=RS256 SERVER_NAME=hypertrap.fritz.box frankenphp run --config raspi/Caddyfile --envfile .pubkey.env

moode-off:
	sudo systemctl stop nginx

moode-on:
	frankenphp stop
	sudo systemctl stop nginx