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
}
