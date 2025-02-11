.PHONY: composer-update install

all: install

xxxxxall: .env publisher.key.pub .pubkey.env publisher.jwt

install: .env publisher.jwt composer-update
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

# debian bookworm
raspi:
	sudo apt update
	sudo apt install libvips libvips-dev php-dev git libonig-dev composer libnss3-tools
	sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
	curl -1sLf 'https://dl.cloudsmith.io/public/caddy/xcaddy/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-xcaddy-archive-keyring.gpg
	curl -1sLf 'https://dl.cloudsmith.io/public/caddy/xcaddy/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-xcaddy.list
	# sudo apt update
	# sudo apt install xcaddy
	# bash ./script/build-raspi.sh
	sudo mkdir /var/moopl
	sudo chown $$USER /var/moopl

moode-off:
	sudo systemctl stop nginx