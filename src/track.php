<?php

namespace moopl;

class track {

    public function __construct(
        public string $file,
        public string $modified_at,
        public string $title = "",
        public string $artist = "",
        public string $albumartist = "",
        public string $track = "",
        public string $disc = "",
        public string $format = "",
        public string $album = "",
        public string $year = "",
        public string $genre = "",
        public string $duration = "",
        public string $pos = "",
        public string $id = "",
    ) {
    }

    /*
    [file] => Amazon MP3/Various Artists/This is Tapete Records!/09 - Flicker.mp3
    [last-modified] => 2011-10-11T13:32:48Z
    [format] => 44100:24:2
    [artist] => Downpilot
    [albumartist] => Various Artists
    [title] => Flicker
    [album] => This is Tapete Records!
    [track] => 9
    [date] => 2011
    [genre] => Pop
    [disc] => 1
    [time] => 194
    [duration] => 193.776
    [pos] => 22
    [id] => 23
*/
    static public function new_from_mpd(array $track): self {
        // print_r($track);
        return new self(...[
            "file" => $track["file"],
            "modified_at" => $track["last-modified"] ?? "", // TODO: why?
            "title" => $track["title"] ?? "",
            "artist" => $track["artist"] ?? "",
            "albumartist" => $track["albumartist"] ?? "",
            "track" => $track["track"] ?? "",
            "disc" => $track["disc"] ?? "",
            "format" => $track["format"] ?? "",
            "album" => $track["album"] ?? "",
            "year" => $track["date"] ?? "",
            "genre" => $track["genre"] ?? "",
            "duration" => $track["time"] ?? "",
            "pos" => $track["pos"] ?? "",
            "id" => $track["id"] ?? "",
        ]);
    }

    public function to_database_array() {
        $record = (array) $this;
        unset($record["pos"], $record["id"]);
        return $record;
    }

    public function to_frontend() {
        $fe = array_map(fn($key) => $this->$key, self::frontend_order());
        $fe[] = $this->pos;
        $fe[] = $this->id;
        return $fe;
    }

    static public function frontend_order() {
        return ["tracks.file", "title", "artist", "albumartist", "album", "track", "disc", "year", "genre", "duration", "format", "modified_at", "sha1"];
    }

    static public function frontend_order_select_statement() {
        return join(", ", self::frontend_order());
    }
}
