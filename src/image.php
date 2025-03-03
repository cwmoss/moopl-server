<?php

namespace moopl;

use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\attribute_router\route;
use twentyseconds\db\pdox;
use getID3;
use Throwable;

class image {

    // public string $music_base = "/music";
    //public string $music_base = "/";

    public function __construct(public config $config, public pdox $db) {
    }

    /*
        hash is empty => extract and search in folder => update database => gen thumb
        hash is "-" => default image
        hash is set => gen thumb
    */
    #[route("GET /image/artwork")]
    public function artwork($name = "", $hash = "", $info = []) {
        $default =  "__default.jpg";
        $image = match ($hash) {
            "-" => $default,
            "" => $this->find_artwork($name),
            default => $hash
        };

        if (!$image || $image == "-") $image = $default;
        $thumb = "tracks/__th__{$image}.jpg";
        $res = $this->save_thumbnail("track", $image, $thumb, "m");
        // 404
        if ($res === false)  $this->redirect($thumb);
        $this->redirect($res);
    }

    #[route("GET /image/artwork_pl")]
    public function artwork_pl($name = "", $hash = "", $info = []) {
        $default =  "__default.jpg";
        $image = match ($hash) {
            "-" => $default,
            "" => $default,
            default => $hash
        };

        if (!$image || $image == "-") $image = $default;
        $thumb = "tracks/__th__{$image}.jpg";
        $res = $this->save_thumbnail("track", $image, $thumb, "m");
        // 404
        if ($res === false)  $this->redirect($thumb);
        $this->redirect($res);
    }

    public function find_artwork($name) {
        // file was requested before?
        $hash = $this->db->select_first_cell("artworks", "sha1", "WHERE file=?", [$name]);
        if ($hash !== false) return $hash;

        $file = $this->config->mpd_music_base . "/" . $name;
        $cover_file = null;

        [$cover_bin, $hash] = $this->find_embed($file);
        if ($cover_bin == null) {
            [$cover_file, $hash] = $this->find_folder($file);
        }

        $this->update_file($name, $hash, $cover_bin, $cover_file);
        return $hash;
    }

    public function update_file(string $name, string $hash, ?string $bin, ?string $file) {
        $var = $this->config->base . "/var/images/tracks/";
        $dest = $var . $hash;
        $info = [];

        if ($hash != "-") {
            if (!file_exists($dest)) {
                if ($bin !== null) {
                    file_put_contents($dest, $bin);
                } else {
                    copy($file, $dest);
                }
                $info = getimagesize($dest);
                try {
                    $this->db->insert("files", ["sha1" => $hash, "info" => json_encode($info, JSON_FORCE_OBJECT)]);
                } catch (Throwable $e) {
                    dbg("files insert failed", $e->getMessage());
                }
            }
        }
        try {
            $this->db->insert("artworks", ["file" => $name, "sha1" => $hash]);
        } catch (Throwable $e) {
            dbg("artworks insert failed", $e->getMessage());
        }
    }

    public function find_folder($file) {
        $tests = [
            'Cover.jpg',
            'cover.jpg',
            'Cover.jpeg',
            'cover.jpeg',
            'Cover.png',
            'cover.png',
            'Cover.tif',
            'cover.tif',
            'Cover.tiff',
            'cover.tiff',
            'Folder.jpg',
            'folder.jpg',
            'Folder.jpeg',
            'folder.jpeg',
            'Folder.png',
            'folder.png',
            'Folder.tif',
            'folder.tif',
            'Folder.tiff',
            'folder.tiff'
        ];
        $dir = dirname($file);
        foreach ($tests as $test) {
            if (file_exists($dir . "/" . $test)) {
                return [$dir . "/" . $test, sha1_file($dir . "/" . $test)];
            }
        }
        return [null, "-"];
    }

    public function find_embed($file) {
        $getID3 = new getID3;
        $info = $getID3->analyze($file);
        if ($info['comments']['picture'][0] ?? null) {
            return [
                $info['comments']['picture'][0]['data'],
                sha1($info['comments']['picture'][0]['data'])
            ];
        }
        return [null, "-"];
    }

    #[route("GET /image/radio")]
    public function radio_logo($name = "") {
        dbg("radio-logo", $name);
        $var = $this->config->base . "/var/images/";
        $fix = "/fixtures/radio-logos/{$name}.jpg";
        $orig = "radio/{$name}.jpg";
        $thumb = "radio/__th__{$name}.jpg";
        $default = "__default";
        if (file_exists($var . $thumb)) {
            $this->redirect('/$images/' . $thumb);
            return;
        }
        if (file_exists($var . $orig)) {
            $res = $this->save_thumbnail("radio", $name, $thumb, "m");
            if (!$res !== false) {
                $this->redirect($res);
                return;
            }
        }
        // not found
        if ($name != $default) {
            return $this->radio_logo($default);
        }
        // missing default image
        $this->redirect($thumb);
    }

    public function save_thumbnail($type, $name, $dest, $size) {
        $var = $this->config->base . "/var/images/";

        $sizes = [
            "s" => 80,
            "m" => 400,
            "l" => 800,
        ];

        $width = $sizes[$size];

        $src = match ($type) {
            "radio" => "/radio/{$name}.jpg",
            default => "/tracks/{$name}"
        };

        if (file_exists($var . $dest)) {
            return '/$images/' . $dest;
        }

        $resize = fetch::get($src, ["w" => $width, "h" => $width, "crop" => 1], "http://localhost/\$images");
        dbg("++ resize", $src, $dest, $width, $resize["code"]);
        if ($resize["code"] == 200 && $resize["body"]) {
            file_put_contents($var . $dest, $resize["body"]);
            return '/$images/' . $dest;
        }
        return false;
    }

    public function redirect($to) {
        header('Location: ' . $to, response_code: 302);
    }
}
