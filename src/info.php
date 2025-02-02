<?php

namespace moopl;

use FloFaber\MphpD\MphpD;
use FloFaber\MphpD\Filter;
use twentyseconds\attribute_router\route;

class info {

    #[route("GET /info")]
    public function php() {

        phpinfo();
        //return ["hi"];
    }
}
