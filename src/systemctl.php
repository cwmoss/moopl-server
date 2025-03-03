<?php

namespace moopl;

use twentyseconds\attribute_router\route;

/*
https://unix.stackexchange.com/questions/396630/the-proper-way-to-test-if-a-service-is-running-in-a-script

systemctl show -a apache2 
systemctl is-active apache2
systemctl -p 

ExecMainStartTimestamp=Fri 2024-09-27 20:01:52 CEST
ExecMainStartTimestampMonotonic=127040745646982
ExecMainExitTimestamp=
ExecMainExitTimestampMonotonic=0
ExecMainPID=719201
ExecMainCode=0
ExecMainStatus=0

StateDirectoryMode=0755
LoadState=loaded
ActiveState=active
SubState=running
UnitFileState=enabled
StateChangeTimestamp=Mon 2025-03-03 00:00:00 CET
StateChangeTimestampMonotonic=140537031264135

*/

class systemctl {

    public $services = [
        "mpd",
        "shairport-sync",
        "nqptp",
    ];

    public $props = "SubState,ActiveState,LoadState,MainPID,Environment,ExecMainStartTimestamp,ExecMainCode,ExecMainStatus";

    // https://serverfault.com/questions/907857/how-get-systemd-status-in-json-format

    #[route("GET /system_status")]
    public function system_status() {
        $status = array_map(fn($name) => $this->service_status($name) + ["name" => $name], $this->services);
        return ["services" => $status];
    }

    public function service_status($name) {
        $cmd = sprintf("sudo /usr/bin/systemctl show -p %s %s", $this->props, $name);
        $out = [];
        exec($cmd, $out, $rc);
        $props = parse_ini_string(join("\n", $out));
        // $props = ["ini" => $out];
        return $props;
    }
}
