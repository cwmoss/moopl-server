<?php
function is_docker() {
    return file_exists('/.dockerenv');
}

if (!function_exists('d')) {
    function d(...$args) {
        echo '<pre>';
        foreach ($args as $arg) {
            print_r($arg);
        }
        echo '</pre>';
    }
}

if (!function_exists('dd')) {
    function dd(...$args) {
        d(...$args);
        die;
    }
}
if (!function_exists('dbg')) {
    function dbg($txt, ...$vars) {
        // im servermodus wird der zeitstempel automatisch gesetzt
        //	$log = [date('Y-m-d H:i:s')];
        $log = [];
        if (!is_string($txt)) {
            array_unshift($vars, $txt);
        } else {
            $log[] = $txt;
        }
        $log[] = join(' ', array_map(fn($var) => json_encode($var, \JSON_UNESCAPED_SLASHES | \JSON_UNESCAPED_UNICODE), $vars));
        error_log(join(' ', $log));
    }
}

function self_url($psr7, $path) {
    $server = $psr7->getServerParams();
    $host = $server['HTTP_HOST'];
    if (
        isset($server['HTTPS']) &&
        ($server['HTTPS'] == 'on' || $server['HTTPS'] == 1) ||
        isset($server['HTTP_X_FORWARDED_PROTO']) &&
        $server['HTTP_X_FORWARDED_PROTO'] == 'https'
    ) {
        $protocol = 'https://';
    } else {
        $protocol = 'http://';
    }
    return $protocol . $host . $path;
}
