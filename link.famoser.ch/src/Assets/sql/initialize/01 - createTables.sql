CREATE TABLE relinks (
  id          INTEGER PRIMARY KEY,
  url         TEXT,
  target      TEXT,
  name        TEXT,
  description TEXT
);

CREATE TABLE hits (
  id          INTEGER PRIMARY KEY,
  relink_id   TEXT,
  ip          TEXT,
  create_date INTEGER
);