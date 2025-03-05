<?php

namespace moopl;

use Generator;
use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\db\pdox;
use twentyseconds\attribute_router\route;

class status {

    public $airplay = "off";
    public $bluetooth = "off";
    public $spotify = "off";

    public function __construct(private pdox $db) {
    }

    public function load(): self {
        $json = $this->db->select_first_cell("status", "current");
        $data = json_decode($json);
        foreach ($data as $k => $v) {
            $this->$k = $v;
        }
        return $this;
    }

    public function save(): bool {
        $res = $this->db->update(
            "status",
            ["current" => json_encode($this, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE)]
        );
        return (bool) $res;
    }
}
