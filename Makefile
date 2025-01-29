all: .env publisher.key.pub .pubkey.env publisher.jwt

.env:
	cp dot.env .env

publisher.key.pub:
	# ssh-keygen -t rsa -b 4096 -m PEM -f publisher.key
	openssl genrsa -out publisher.key 4096
	openssl rsa -in publisher.key -pubout -outform PEM -out publisher.key.pub

.pubkey.env: publisher.key.pub
	echo "MERCURE_PUBLISHER_JWT_KEY=\"$$(cat publisher.key.pub)\"" > .pubkey.env

publisher.jwt: publisher.key.pub
	php make-jwt.php

# debian bookworm
raspi:
	sudo apt update
	sudo apt install golang libvips libvips-dev
	sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
	curl -1sLf 'https://dl.cloudsmith.io/public/caddy/xcaddy/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-xcaddy-archive-keyring.gpg
	curl -1sLf 'https://dl.cloudsmith.io/public/caddy/xcaddy/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-xcaddy.list
	sudo apt update
	sudo apt install xcaddy
	bash ./build-raspi.sh