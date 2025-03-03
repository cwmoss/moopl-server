<?php

namespace moopl;

use Generator;
use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\db\pdox;
use twentyseconds\attribute_router\route;

class playlist {


    public function __construct(public MphpD $mpd, public pdox $db) {
    }

    #[route("GET /playlists")]
    public function index() {

        $this->mpd->connect();
        $res = $this->mpd->playlists(true);
        dbg("all playlists", $res);
        return $res;
    }
    // Music/Media.localized/Music/Unknown Artist/Unknown Album/Mola - Liebe Brutal.mp3
    #[route("GET /playlist/show")]
    public function show($name) {
        $this->mpd->connect();
        $pl = $this->mpd->playlist($name);
        // $dirs = $db->ls("SDCARD")["directories"];
        //$res = $pl->save();
        return $pl;
    }

    #[route("GET /playlist/add_track")]
    public function add_track($name, $tracks) {
        $this->mpd->connect();
        $pl = $this->mpd->playlist($name);
        $res = $pl->add($tracks);
        return $res;
    }
}
