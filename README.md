# dev

```
git clone https://github.com/cwmoss/moopl-server.git
cd moopl-server
docker compose run --rm install
docker compose up
```

open in vscode
start liveserver

https://localhost/api/index  
https://localhost/api/tracks

https://localhost/$images/testcover.jpg?w=300&h=200&crop=true

vlc player: open network http://localhost:8700

copy root cert to host, open with system keystore, trust

    docker compose cp franken:/data/caddy/pki/authorities/local/root.crt .

# todo

- [x] mpd_events via supervisor modul
- [x] play, pause, scrup
- [x] cute knob
- [x] playhead running
- [x] add to default playlist
- [x] attribute based router
- [ ] sortable playlist
- [x] skip, back
- [x] coverart
- [ ] darkmode
- [ ] deploy: make/ compile on raspberry
- [ ] deploy: moodeplayer ON/OFF
- [x] list/play radio
- [ ] external events for bluetooth/ airplay ...
- [ ] admin widgets

# random

    # reload supervised processes
    frankenphp reload -c /etc/caddy/Caddyfile -f

    # start raspi
    MERCURE_PUBLISHER_JWT_ALG=RS256 SERVER_NAME=hypertrap.fritz.box frankenphp start --config raspi/Caddyfile --envfile .pubkey.env
