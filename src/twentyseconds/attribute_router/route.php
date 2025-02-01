<?php

namespace twentyseconds\attribute_router;

use Attribute;

#[Attribute]
class route {

    public function __construct(
        public string $path = '/',
        public string $method = 'POST',
        public array $class = []
    ) {
        $parts = explode(" ", trim($path), 2);
        if (isset($parts[1])) {
            $this->path = trim($parts[1]);
            $this->method = $parts[0];
        }
    }
}
