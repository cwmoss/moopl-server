<?php

namespace moopl;

use twentyseconds\attribute_router\route;
use twentyseconds\db\pdox;
use moopl\util\upload as fupload;


class upload {

    // public string $music_base = "/music";
    //public string $music_base = "/";

    public function __construct(public config $config, public pdox $db) {
    }

    /*
        {"name":"DSC_5549.jpg","type":"stream","tmp_name":"/tmp/sh-6at1tdi98o2o5KhJgtW",
        "error":0,"size":166837,"mime":["image/jpeg","jpg","jpeg/jpg/jpe/jfif"],"extension":"jpg"}
    */
    #[route("/upload/playlistcover")]
    public function playlistcover($filename = "") {
        $file = fupload::stream_to_file($filename);

        dbg("upload playlist COVER", $filename, $file);
        $hash = sha1_file($file["tmp_name"]);
        $var = $this->config->base . "/var/images/tracks";
        $dest = $var . "/" . $hash;
        if (!file_exists($dest)) {
            rename($file["tmp_name"], $dest);
            $info = fupload::get_image_dimensions($dest, $file["mime"][0]);
            $info["uploaded"] = "1";
            $info["uploaded_name"] = $filename;
            $this->db->insert("files", ["sha1" => $hash, "info" => json_encode($info, JSON_FORCE_OBJECT)]);
        }
        return ["_id" => $hash];
    }
}
