<?php

namespace moopl;

use Generator;
use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\db\pdox;
use twentyseconds\attribute_router\route;

class status {

    private $id;
    public $airplay = "off";
    public $bluetooth = "off";
    public $spotify = "off";

    public function __construct(private pdox $db) {
    }

    public function load(): self {
        $data = $this->db->select_first_row("status");
        foreach ($data as $k => $v) {
            $this->$k = $v;
        }
        return $this;
    }

    public function airplay_on() {
        $this->update("airplay", "on");
    }
    public function airplay_off() {
        $this->update("airplay", "off");
    }
    public function bluetooth_on() {
        $this->update("bluetooth", "on");
    }
    public function bluetooth_off() {
        $this->update("bluetooth", "off");
    }
    public function spotify_on() {
        $this->update("spotify", "on");
    }
    public function spotify_off() {
        $this->update("spotify", "off");
    }
    public function update($col, $val) {
        $val = ($val == "on") ? "on" : "off";
        $this->$col = $val;
        $this->db->update("status", [$col => $val]);
    }

    public function xsave(): bool {
        $res = $this->db->update(
            "status",
            ["current" => json_encode($this, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)]
        );
        return (bool) $res;
    }
}
