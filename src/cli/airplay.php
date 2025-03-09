<?php

namespace moopl\cli;

use moopl\status;
use FloFaber\MphpD\MphpD;
use Srhmster\PhpDbus\PHPDbus;

/*

amixer -M -c 1 sset "PCM" 100%

amixer -M get PCM

$ awk -F"[][]" '/%/ {print $2; count++; if (count==1) exit}' <(amixer -c 1 sget "PCM")
100%

https://github.com/lionep/amixer-parser
https://stackoverflow.com/questions/36867273/set-volume-using-php-exec-and-amixer

https://unix.stackexchange.com/questions/89571/how-to-get-volume-level-from-the-command-line

https://github.com/kellyjonbrazil/jc/blob/master/jc/parsers/amixer.py

busctl introspect org.gnome.ShairportSync /org/gnome/ShairportSync

rw@hypertrap:/var/moopl $ busctl -l get-property org.gnome.ShairportSync /org/gnome/ShairportSync org.gnome.ShairportSync.RemoteControl PlayerState

$ busctl -l get-property org.gnome.ShairportSync /org/gnome/ShairportSync org.gnome.ShairportSync.RemoteControl Metadata
a{sv} 4 "mpris:trackid" o "/org/gnome/ShairportSync/F12DE12FD043E114" "sps:songdatakind" u 0 "xesam:title" s "Einmusik & Aaron Suiss - Sabai" "mpris:length" x 441704000

https://askubuntu.com/questions/150790/how-do-i-run-a-script-on-a-dbus-signal

 $ busctl -j get-property org.gnome.ShairportSync /org/gnome/ShairportSync org.gnome.ShairportSync.RemoteControl Metadata|jq -c
{"type":"a{sv}","data":{"mpris:artUrl":{"type":"s","data":"file:///tmp/shairport-sync/.cache/coverart/cover-2d4874f7e80935492304cfe502ff6a47.png"},"mpris:trackid":{"type":"o","data":"/org/gnome/ShairportSync/EE66492903104194"},"sps:songdatakind":{"type":"u","data":0},"xesam:title":{"type":"s","data":"I Know"},"xesam:album":{"type":"s","data":"Disco Romance"},"xesam:artist":{"type":"as","data":["SALLY SHAPIRO"]},"xesam:genre":{"type":"as","data":["Disco"]},"mpris:length":{"type":"x","data":373916000}}}

dbus-monitor --system

https://unix.stackexchange.com/questions/80143/how-to-create-a-daemon-which-would-be-listening-to-dbus-and-fire-script-on-messa

*/

class airplay {

    private PHPDbus $dbus;

    public function __construct(public status $status, private MphpD $mpd) {
        $this->dbus = new PHPDbus('org.gnome.ShairportSync');
    }

    public function __invoke(array $args) {
        $cmd = $args[0];
        $status = $this->status->load();
        $status->{"airplay_{$cmd}"}();
        $this->$cmd();
        // print_r($this->meta());
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

    public function meta() {
        $meta = $this->dbus->getProperty(
            '/org/gnome/ShairportSync',
            'org.gnome.ShairportSync.RemoteControl',
            'Metadata'
        );
        return [
            "title" => $meta["xesam:title"] ?? "",
            "artwork" => $meta["mpris:artUrl"] ?? "",
            "length" => ($meta["mpris:length"] ?? 0) / 1_000_000
        ];
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
