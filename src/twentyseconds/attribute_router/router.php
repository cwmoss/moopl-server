<?php

namespace twentyseconds\attribute_router;

use ReflectionClass;
use ReflectionMethod;
use Exception;

class router {

    public function __construct(public array $routes = [], public string $prefix = "") {
        $this->add_routes($routes);
    }

    public function match(string $path, string $method): route {
        foreach ($this->routes as $r) {
            if ($r->method != $method) continue;
            if ($this->prefix . $r->path == $path) return $r;
        }
        throw new Exception("NOT FOUND $path");
    }

    public function add_routes(array $routes) {
        foreach ($routes as $route_class) {
            $this->add_route($route_class);
        }
    }
    public function add_route(string $class) {
        $reflection = new ReflectionClass($class);
        $cls_attrs = $reflection->getAttributes(route::class);
        $methods = $reflection->getMethods(ReflectionMethod::IS_PUBLIC);
        foreach ($methods as $method) {
            $m_attrs = $method->getAttributes(route::class);
            foreach ($m_attrs as $m_attr) {
                $args = $m_attr->getArguments();
                $args["class"] = [$class, $method->getName()];
                $this->routes[] = new route(...$args);
            }
            /*$args = $m_attrs[0]->getArguments();
        print_r($args);
        print_r($method);
        print_r($m_attrs);*/
        }
    }
}
