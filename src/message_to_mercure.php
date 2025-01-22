<?php

namespace moopl;

define('HUB_URL', 'https://franken/.well-known/mercure');

use Symfony\Component\Mercure\Hub;
use Symfony\Component\Mercure\Jwt\StaticTokenProvider;
use Symfony\Component\Mercure\Update;

class message_to_mercure {

    public function __construct(public Hub $hub) {
    }

    public function send(string $topic, string|array $data = []): string {
        // return $this->hub->publish(new Update('mpd-status', json_encode(["status" => "not playing"])));

        // Serialize the update, and dispatch it to the hub, that will broadcast it to the clients
        if (!is_string($data)) $data = json_encode($data);
        #$data = json_encode(["status" => "not playing"]);
        $id = $this->hub->publish(new Update($topic, $data));
        return $id;
    }
}
