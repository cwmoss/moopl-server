<?php

namespace moopl\cli;

use moopl\status;

class status_show {

    public function __construct(public status $status) {
    }

    public function __invoke() {
        // print($this->status->load());
        print json_encode($this->status->load());
    }
}
