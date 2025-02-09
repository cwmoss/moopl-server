<?php

namespace moopl;

use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\attribute_router\route;

class image {

    public function __construct(public config $config) {
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
            header('Location: /$images/' . $thumb, response_code: 302);
            return;
        }
        if (file_exists($var . $orig)) {
            $resize = fetch::get("/radio/{$name}.jpg", ["w" => 400, "h" => 400, "crop" => 1], "http://localhost/\$images");
            dbg("++ resize", $resize["code"]);
            if ($resize["code"] == 200 && $resize["body"]) {
                file_put_contents($var . $thumb, $resize["body"]);
                header('Location: /$images/' . $thumb, response_code: 302);
                return;
            }
        }
        // not found
        if ($name != $default) {
            return $this->radio_logo($default);
        }
        // missing default image
        header('Location: /$images/' . $thumb, response_code: 302);
    }
}
