all: .env publisher.key.pub .pubkey.env publisher.jwt

.env:
	cp dot.env .env

publisher.key.pub:
	ssh-keygen -t rsa -b 4096 -m PEM -f publisher.key
	openssl rsa -in publisher.key -pubout -outform PEM -out publisher.key.pub

.pubkey.env: publisher.key.pub
	echo "MERCURE_PUBLISHER_JWT_KEY=\"$$(cat publisher.key.pub)\"" > .pubkey.env

publisher.jwt: publisher.key.pub
	php make-jwt.php