cp dot.env .env
docker-compose up

./rr serve --dotenv .env

https://github.com/GioF71/mpd-alsa-docker#pulseaudio-additional-outputs
https://git.deflax.net/deflax/rpi-mediaplayer/src/commit/09010a18ff8ff27390aaf158f4574866744c0541/docker-compose.yml

https://docs.roadrunner.dev/docs/php-worker/environment
https://github.com/Tob1as/docker-mpd

{
"client": {
"token": {
"hmac_secret_key": "WwsHRDGqFqbrjiYSSqi4kR0CnijBBiSEmjPBGEv4kmCVRcvJW2tiUB1O0g27VZY9jFbE7pzvsKkoilgi0_yLHA"
},
"allowed_origins": []
},
"admin": {
"enabled": false,
"password": "DwCMjA0U_xCmeMRKl5kPUg",
"secret": "JxAdbO2JN1sWHhHwwsND3vuL3j0AQfWppb3Yp5P09tlKKyRr4gO8UTFkcCP_JIYqvelJIF7o-bXRkczXLE2u_Q"
},
"http_api": {
"key": "OoVD4aPDBO6MJ40fY9slcV1-KrqVuAvk-fynx9b4uqGu6XXcz5eI8jkPIFT6TWw_pDOjNuch2p0N2PfF0Nwoeg"
}
}
