<?php

namespace moopl;

class fetch {

    static function get(string $path = "", array $data = [], string $base = ""): array {
        $encoded = implode("/", array_map("rawurlencode", explode("/", $path)));
        $url = $base . $encoded;
        if ($data) $url .= "?" . http_build_query($data);

        dbg("++ fetch ", $url);
        return ["code" => 200, "body" => file_get_contents($url)];

        $handle = curl_init();

        curl_setopt($handle, CURLOPT_URL, $url);
        curl_setopt($handle, CURLOPT_POST, false);
        curl_setopt($handle, CURLOPT_HEADER, true);
        curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($handle, CURLOPT_CONNECTTIMEOUT, 10);

        $response = curl_exec($handle);
        $hlength  = curl_getinfo($handle, CURLINFO_HEADER_SIZE);
        $httpCode = curl_getinfo($handle, CURLINFO_HTTP_CODE);
        $body     = substr($response, $hlength);

        // If HTTP response is not 200, throw exception
        if ($httpCode != 200) {
            // throw new Exception($httpCode);
        }

        return ["code" => $httpCode, "body" => $body];
    }
}
