<?php

namespace moopl\cli;

use moopl\status;
use FloFaber\MphpD\MphpD;

class airplay {

    public function __construct(public status $status, private MphpD $mpd) {
    }

    public function __invoke(array $args) {
        $cmd = $args[0];
        $status = $this->status->load();
        $status->airplay = $cmd;
        $status->save();
        $this->$cmd;
        // print json_encode($this->status);
    }

    public function on() {
        $this->mpd->connect();
        $this->mpd->player()->stop();
    }

    public function off() {
        $this->mpd->connect();
        $this->mpd->player()->play_id(1);
    }
}

/**
 #Local
if [[ $CDSP_VOLSYNC == "on" ]]; then
    Set 0dB CDSP volume
	sed -i '0,/- -.* /s//- 0.0/' /var/lib/cdsp/statefile.yml
    elif [[ $ALSAVOLUME != "none" ]]; then
	# Set 0dB ALSA volume
	/var/www/util/sysutil.sh set-alsavol "$AMIXNAME" $ALSAVOLUME_MAX
fi



# Local
/var/www/util/vol.sh -restore

if [[ $CDSP_VOLSYNC == "on" ]]; then
	# Restore CDSP volume
	systemctl restart mpd2cdspvolume
fi
 */
