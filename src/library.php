<?php

namespace moopl;

use Generator;
use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\db\pdox;
use twentyseconds\attribute_router\route;

/*
$ ls -al /var/lib/mpd/music
total 24
drwxr-xr-x 3 root root   4096 Dec 30 14:12 .
drwxr-xr-x 4 mpd  audio  4096 Feb 24 23:52 ..
lrwxrwxrwx 1 root root      8 Dec 30 14:12 NAS -> /mnt/NAS
lrwxrwxrwx 1 root root      9 Dec 30 14:12 NVME -> /mnt/NVME
drwxrwxrwx 2 root root  16384 Dec 30 14:12 RADIO
lrwxrwxrwx 1 root root      9 Dec 30 14:12 SATA -> /mnt/SATA
lrwxrwxrwx 1 root root     11 Dec 30 14:12 SDCARD -> /mnt/SDCARD
lrwxrwxrwx 1 root root      6 Dec 30 14:12 USB -> /media
*/

class library {


    public function __construct(public MphpD $mpd, public pdox $db) {
    }

    #[route("/admin/scan")]
    public function mpd_rescan() {
        $this->mpd->connect();
        $db = $this->mpd->db();
        return $db->update(rescan: true);
    }

    #[route("/admin/index")]
    public function update_index() {
        dbg("+++ indexing tracks");
        $this->mpd->connect();
        $db = $this->mpd->db();
        // $dirs = $db->ls("SDCARD")["directories"];
        $res = $db->ls("", true);
        $dirs = $res["directories"];
        dbg("+++ indexing tracks directories", $res, $dirs);
        $this->db->beginTransaction();
        foreach ($dirs as $dir) {
            // if ($dir["name"] == "RADIO") continue;
            // continue;
            dbg("filter dir", $dir);
            $f = new Filter("base", " ", $dir["name"]);
            // print "Filter " . $f . "\n";
            $res = $db->search($f);
            dbg("result dir", $dir, $res);
            $this->import_tracks($res, $dir["name"]);
        }
        dbg("end indexing tracks");
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
            "FROM tracks LEFT JOIN artworks ON tracks.file=artworks.file");

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
        dbg("++ playlist Q", $res);
        // $res = array_map(fn($item) => track::new_from_mpd($item)->to_frontend(), $res);
        return $res;
        //$this->mpd->connect(); playlistinfo
        // $db = $this->mpd->
    }

    #[route("/queue/remove")]
    public function queue_removeid($id) {
        $res = $this->mpd->queue()->delete_id($id);
        return $res;
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
