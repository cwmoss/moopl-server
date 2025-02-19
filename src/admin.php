<?php

namespace moopl;

use Generator;
use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\db\pdox;
use twentyseconds\attribute_router\route;

class admin {

    public function __construct(public MphpD $mpd, public pdox $db) {
    }

    #[route("/admin/mpd_restart")]
    public function mpd_restart() {
        `sudo systemctl kill mpd`;
        return true;
    }
}
