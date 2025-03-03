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
        // $pl = iterator_to_array($this->db->select("playlists"));
        $pl = $this->db->fetch_all_map("select * from playlists", [], true);
        dbg("db playlists", $pl);
        $pl = array_map(fn($it, $name) => $it[0] + ["name" => $name], $pl, array_keys($pl));
        // dbg("mapped playlists", $pl);
        $this->mpd->connect();
        $res = $this->mpd->playlists(true);
        foreach ($res as $playlist) {
            $name = $playlist["name"];
            if ($pl[$name] ?? null) {
                $pl[$name] += $playlist;
            } else {
                $pl[$name] = $playlist;
            }
        }
        dbg("all playlists", $pl);
        return array_values($pl);
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

    #[route("/playlist/create")]
    public function create(array $input) {
        $pl = $this->db->insert("playlists", $input);
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
