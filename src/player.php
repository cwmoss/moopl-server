<?php

namespace moopl;

use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\attribute_router\route;
use moopl\status;

class player {

    public function __construct(public MphpD $mpd, public status $status) {
    }

    #[route("GET /status")]
    public function status() {
        $this->mpd->connect();
        $status = $this->mpd->status();
        $current = $this->mpd->player()->current_song();
        dbg("+++ current track", $current);
        if ($current) $status["current_song"] = $current;
        $status["renderer"] = $this->status->load();
        return $status;
    }

    #[route("/player/volume")]
    public function volume($volume) {
        dbg("volume set", $volume);
        $this->mpd->connect();
        // var_dump((int) $vol);
        return $this->mpd->player()->volume((int) $volume);
    }

    #[route("/player/seek")]
    public function seek($position) {
        $this->mpd->connect();
        return $this->mpd->player()->seek_cur($position);
    }

    #[route("/player/play")]
    public function start() {
        $this->mpd->connect();
        return $this->mpd->player()->pause(MPD_STATE_OFF);
    }

    #[route("/player/play_id")]
    public function play_id($id) {
        $this->mpd->connect();
        return $this->mpd->player()->play_id($id);
    }

    #[route("/player/start_playing")]
    public function start_playing() {
        $this->mpd->connect();
        return $this->mpd->player()->play_id(1);
    }

    #[route("/player/pause")]
    public function stop() {
        $this->mpd->connect();
        return $this->mpd->player()->pause();
    }

    #[route("/player/next")]
    public function next_track() {
        $this->mpd->connect();
        return $this->mpd->player()->next();
    }

    #[route("/player/prev")]
    public function previous_track() {
        $this->mpd->connect();
        return $this->mpd->player()->previous();
    }

    #[route("/player/play_now")]
    public function play_now($file) {
        $this->mpd->connect();
        $id = $this->mpd->queue()->add_id($file);
        if ($id !== false) $this->mpd->player()->play_id($id);
        return $id;
    }
}
