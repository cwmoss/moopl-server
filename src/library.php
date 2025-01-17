<?php

namespace moopl;

use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\db\pdox;

class library {

    public function __construct(public MphpD $mpd, public pdox $db) {
    }

    public function update_index() {
        $this->mpd->connect();
        $db = $this->mpd->db();
        $dirs = $db->ls("")['directories'];
        $this->db->beginTransaction();
        foreach ($dirs as $dir) {
            // continue;
            $f = new Filter("base", " ", $dir["name"]);
            // print "Filter " . $f . "\n";
            $res = $db->search($f);
            $this->import_tracks($res, $dir["name"]);
        }
        $this->db->commit();
        return "OK";
    }

    public function index_json(): string {
        $json = $this->db->select_first_cell("tracks", 'json_group_array(json_array("file", "title", "artist"))');
        return $json;
    }

    public function import_tracks($tracks, string $dir) {
        $this->db->delete("tracks", "WHERE file like ?", ["$dir%"]);
        if (!$tracks) return;
        foreach ($tracks as $track) {
            # continue;
            $this->db->insert("tracks", [
                "file" => $track["file"],
                "modified_at" => $track["last-modified"],
                "title" => $track["title"],
                "artist" => $track["artist"],
                "album" => $track["album"],
                "year" => $track["date"] ?? "",
                "genre" => $track["genre"],
                "duration" => $track["time"],
            ]);
        }
    }
}
