<?php

namespace moopl;

use Generator;
use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\db\pdox;
use twentyseconds\attribute_router\route;

class library {

    public function __construct(public MphpD $mpd, public pdox $db) {
    }

    #[route("/db/update")]
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
        return true;
    }

    #[route("GET /tracks")]
    public function index_json(): string {
        /*
        "SELECT json_group_array(json_array(file, title, artist, albumartist, album, track, disc, year, genre, duration, format, modified_at)) FROM tracks "
        */
        $json = $this->db->fetch_first_cell("SELECT json_group_array(json_array(" .
            track::frontend_order_select_statement() .
            ")) " .
            "FROM tracks, artworks WHERE tracks.file=artworks.file");

        return $json;

        $json = $this->db->select_first_cell(
            "tracks",
            'json_group_array(json_array(' . track::frontend_order_select_statement() . '))'
        );
        return $json;
    }

    #[route("GET /radios")]
    public function radio_index() {
        $res = [];
        $res = iterator_to_array($this->db->select(
            "radios",
            "*",
            'ORDER BY name'
        ));
        return $res;
        //$this->mpd->connect();
        // $db = $this->mpd->
    }

    #[route("GET /queue")]
    public function queue() {
        $this->mpd->connect();
        $res = $this->mpd->queue()->get();
        $res = array_map(fn($item) => track::new_from_mpd($item)->to_frontend(), $res);
        return $res;
        //$this->mpd->connect(); playlistinfo
        // $db = $this->mpd->
    }

    #[route("/db/import_radio_csv")]
    public function import_radios_csv($file) {
        $this->db->beginTransaction();
        $this->db->delete("radios", "WHERE true");
        foreach (self::csv_reader($file) as $radio) {
            unset($radio["id"]);
            $this->db->insert("radios", $radio);
        }
        $this->db->commit();
        return "OK";
    }

    public function import_tracks($tracks, string $dir) {
        $this->db->delete("tracks", "WHERE file like ?", ["$dir%"]);
        if (!$tracks) return;
        // print_r($tracks[0]);
        foreach ($tracks as $track) {
            # continue;
            $this->db->insert("tracks", track::new_from_mpd($track)->to_database_array());
            /*
            $this->db->insert("tracks", [
                "file" => $track["file"],
                "modified_at" => $track["last-modified"],
                "title" => $track["title"] ?? "",
                "artist" => $track["artist"] ?? "",
                "albumartist" => $track["albumartist"] ?? "",
                "track" => $track["track"] ?? "",
                "disc" => $track["disc"] ?? "",
                "format" => $track["format"] ?? "",
                "album" => $track["album"] ?? "",
                "year" => $track["date"] ?? "",
                "genre" => $track["genre"] ?? "",
                "duration" => $track["time"] ?? "",
            ]);
            */
        }
    }

    static function csv_reader($file): Generator {
        $header = null;
        foreach (file($file) as $row) {
            if (is_null($header)) {
                $header = str_getcsv($row, ",", '"', '\\');
                // print_r($header);
                continue;
            }
            $data = str_getcsv($row, ",", '"', '\\');
            yield array_combine($header, $data);
        }
    }
}
