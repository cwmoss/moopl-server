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

    // https://stackoverflow.com/questions/3111406/checking-if-process-still-running

    #[route("/admin/mpd_restart")]
    public function mpd_kill() {
        exec("pgrep -x mpd", $pids);
        $pid = $pids[0];
        // `sudo systemctl kill mpd`;
        `sudo kill -9 $pid`;
        return true;
    }
}
