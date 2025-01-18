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