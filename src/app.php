<?php

namespace moopl;

use DI\ContainerBuilder;
use DI\Container;

class app {

    public function get_container(): Container {
        $builder = new ContainerBuilder();
        $builder->useAutowiring(true);
        // $builder->useAnnotations(false);
        $builder->addDefinitions(__DIR__ . '/container_config.php');
        $app = $builder->build();
        return $app;
    }
}
