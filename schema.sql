CREATE TABLE
    IF NOT EXISTS tracks (
        file TEXT PRIMARY KEY,
        modified_at DATE,
        title TEXT,
        artist TEXT,
        albumartist TEXT,
        album TEXT,
        track TEXT,
        disc TEXT,
        format TEXT,
        year TEXT,
        genre TEXT,
        duration TEXT
    );
CREATE TABLE
    IF NOT EXISTS radios (
    station TEXT PRIMARY KEY, 
    name TEXT, 
    type TEXT, 
    logo TEXT, 
    genre TEXT, 
    broadcaster TEXT, 
    language TEXT,
    country TEXT, 
    region TEXT, 
    bitrate TEXT, 
    format TEXT,
     geo_fenced TEXT,
      home_page TEXT, 
      monitor TEXT
    );