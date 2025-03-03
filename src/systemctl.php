<?php

namespace moopl;

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
        "shairportsync"
    ];

    public $props = "SubState,ActiveState,LoadState,MainPID,Environment,ExecMainStartTimestamp,ExecMainCode,ExecMainStatus";

    // https://serverfault.com/questions/907857/how-get-systemd-status-in-json-format

    public function service_status($name) {
        $cmd = sprintf("sudo systemctl show -p %s ");
        exec($cmd, $out, $rc);
        $props = parse_ini_string(join("\n", $out));
        return $props;
    }
}
