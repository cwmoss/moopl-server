<?php

namespace moopl;

use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;


class player {

    public function __construct(public MphpD $mpd) {
    }

    public function status() {
        $this->mpd->connect();
        $status = $this->mpd->status();
        $current = $this->mpd->player()->current_song();
        if ($current) $status["current_song"] = track::new_from_mpd($current)->to_frontend();
        return $status;
    }

    public function volume($vol) {
        $this->mpd->connect();
        // var_dump((int) $vol);
        return $this->mpd->player()->volume((int) $vol);
    }

    public function start($name) {
        $this->mpd->connect();
        return $this->mpd->player()->play(0);
    }

    public function stop() {
        $this->mpd->connect();
        return $this->mpd->player()->stop();
    }

    public function play_now($file) {
        $this->mpd->connect();
        return $this->mpd->queue()->add($file);
    }
}
