FROM giof71/mpd-alsa:vanilla-bookworm
#FROM phpdockerio/php73-cli

RUN apt-get update && apt-get install --no-install-recommends -y \
    #ca-certificates \
    #locales \
    curl procps gnupg debian-archive-keyring apt-transport-https \
    php-cli php-sqlite3 php-curl php-zip \ 
    && apt-get clean && rm -rf /var/lib/apt/lists/* 

RUN curl -sSLf https://centrifugal.dev/install.sh | sh 

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
# COPY docker/openssl.cnf /etc/ssl/openssl.cnf

ARG TARGETARCH
RUN echo "huhu $TARGETARCH"

RUN curl -O -L https://github.com/roadrunner-server/roadrunner/releases/download/v2024.3.2/roadrunner-2024.3.2-linux-$TARGETARCH.deb \
    && dpkg -i roadrunner-2024.3.2-linux-$TARGETARCH.deb

WORKDIR /moopl

# CMD rr serve --dotenv .env -c .rr.docker.yaml
# CMD php -d short_open_tag=On -S 0.0.0.0:8080 -t public/ dev-router.php

COPY docker/start-rr.sh /start.sh

ENTRYPOINT ["/start.sh"]
