<?php
/*
https://stackoverflow.com/questions/6403525/check-if-a-process-is-running-using-php-in-linux/6403592#6403592
https://stackoverflow.com/questions/9874331/how-to-check-whether-specified-pid-is-currently-running-without-invoking-ps-from
https://stackoverflow.com/questions/3111406/checking-if-process-still-running
https://github.com/Samer-Al-iraqi/PHP-Linux-Process-Monitor/blob/master/ProcMon.php
https://www.php.net/manual/en/ev.examples.php
https://www.php.net/manual/en/function.stream-select.php

https://stitcher.io/blog/parallel-php
https://tomasvotruba.com/blog/7-steps-to-start-with-parallel-run-in-php-cli-app
https://dev.to/abhay_yt_52a8e72b213be229/handling-concurrency-and-parallelism-in-php-applications-techniques-and-tools-56l
https://www.mullie.eu/parallel-processing-multi-tasking-php/
https://www.ngavalas.com/posts/parallel-php
https://www.jackmarchant.com/exploring-async-php
https://yarnaudov.com/symfony-process-examples.html
https://phpmagazine.net/2023/03/unleashing-the-power-of-php-fibers-boost-web-development-with-efficient-coroutines.html
https://gist.github.com/nggit/4419705331f008d0c00b329c48906fad
https://medium.com/@alieckaja/unleashing-the-power-of-fibers-for-background-jobs-8a22e3a38cd1

*/

class process {
    /**
     * Checks whether the process is running.
     *
     * @param int $pid Process PID.
     * @return bool
     */
    public static function isProcessRunning($pid) {
        // Calling with 0 kill signal will return true if process is running.
        return posix_kill((int) $pid, 0);
    }

    /**
     * Get the command of the process.
     * For example apache2 in case that's the Apache process.
     *
     * @param int $pid Process PID.
     * @return string
     */
    public static function getProcessCommand($pid) {
        $pid = (int) $pid;
        return trim(shell_exec("ps o comm= $pid"));
    }
}
