<?php

namespace moopl;

use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\attribute_router\route;

class player {

    public function __construct(public MphpD $mpd) {
    }

    #[route("GET /status")]
    public function status() {
        $this->mpd->connect();
        $status = $this->mpd->status();
        $current = $this->mpd->player()->current_song();
        if ($current) $status["current_song"] = track::new_from_mpd($current)->to_frontend();
        return $status;
    }

    #[route("/player/volume")]
    public function volume($volume) {
        $this->mpd->connect();
        // var_dump((int) $vol);
        return $this->mpd->player()->volume((int) $volume);
    }

    #[route("/player/seek")]
    public function seek($pos) {
        $this->mpd->connect();
        return $this->mpd->player()->seek_cur($pos);
    }

    #[route("/player/start")]
    public function start($name) {
        $this->mpd->connect();
        return $this->mpd->player()->pause();
    }

    #[route("/player/stop")]
    public function stop() {
        $this->mpd->connect();
        return $this->mpd->player()->pause();
    }

    #[route("/player/play_now")]
    public function play_now($file) {
        $this->mpd->connect();
        return $this->mpd->queue()->add($file);
    }
}
