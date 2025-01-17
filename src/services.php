<?php

namespace moopl;

use Spiral\RoadRunner\Services\Manager;
use Spiral\Goridge\RPC\RPC;

class services {

    public function __construct(public Manager $manager) {
    }

    public function list() {
        return $this->manager->list();
    }

    public function mpd_stop() {
        return $this->manager->terminate(name: 'mpd');
    }

    public function mpd_restart() {
        return $this->manager->restart(name: 'mpd');
    }
}
