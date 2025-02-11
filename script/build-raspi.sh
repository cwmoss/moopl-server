#!/bin/bash

# https://stackoverflow.com/questions/9522631/how-to-put-a-line-comment-for-a-multi-line-command

# Mercure and Vulcain are included in the official build, but feel free to remove them 
#  
# --with github.com/dunglas/vulcain/caddy \
# Add extra Caddy modules here \      

CGO_ENABLED=1 \
    XCADDY_SETCAP=1 \
    XCADDY_GO_BUILD_FLAGS="-ldflags='-w -s' -tags=nobadger,nomysql,nopgx" \
    CGO_CFLAGS=$(php-config --includes) \
    CGO_LDFLAGS="$(php-config --ldflags) $(php-config --libs)" \
    xcaddy build \
        --output /usr/local/bin/frankenphp \
        --with github.com/dunglas/frankenphp=./ \
        --with github.com/dunglas/frankenphp/caddy=./caddy/ \
        --with github.com/dunglas/caddy-cbrotli \
        --with github.com/dunglas/mercure/caddy \
		--with github.com/quix-labs/caddy-image-processor \
		--with github.com/baldinof/caddy-supervisor

git clone https://github.com/e-dant/watcher.git
cd watcher
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
sudo cmake --install build
cd build/
sudo cp libwatcher-c.so /usr/local/lib/libwatcher-c.so
sudo ldconfig

# https://github.com/dunglas/frankenphp/issues/1156
CGO_ENABLED=1 \
XCADDY_GO_BUILD_FLAGS="-ldflags='-w -s' -tags=nobadger,nomysql,nopgx" \
CGO_CFLAGS=$(php-config --includes) \
CGO_LDFLAGS="$(php-config --ldflags) $(php-config --libs)" \
xcaddy build \
    --output frankenphp \
    --with github.com/dunglas/frankenphp/caddy \
    --with github.com/dunglas/mercure/caddy \
    --with github.com/dunglas/caddy-cbrotli \
    --with github.com/dunglas/mercure/caddy \
	--with github.com/quix-labs/caddy-image-processor \
	--with github.com/baldinof/caddy-supervisor