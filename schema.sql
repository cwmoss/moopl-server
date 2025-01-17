CREATE TABLE
    IF NOT EXISTS tracks (
        file TEXT PRIMARY KEY,
        modified_at DATE,
        title TEXT,
        artist TEXT,
        album TEXT,
        year TEXT,
        genre TEXT,
        duration TEXT
    );