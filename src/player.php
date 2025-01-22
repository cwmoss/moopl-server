<?php

namespace moopl;

use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;


class player {

    public function __construct(public MphpD $mpd) {
    }

    public function status() {
        $this->mpd->connect();
        return $this->mpd->status();
    }

    public function volume($vol) {
        $this->mpd->connect();
        // var_dump((int) $vol);
        return $this->mpd->player()->volume((int) $vol);
    }
}
