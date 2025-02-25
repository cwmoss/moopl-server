<?php

namespace moopl;

class config {

    public function __construct(public string $mpd_music_base, public string $base = __DIR__ . "/../") {
    }
}
