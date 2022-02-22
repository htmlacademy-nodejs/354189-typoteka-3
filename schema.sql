/* create db */
CREATE DATABASE typoteka_dev
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C'
    LC_CTYPE = 'C'
    TABLESPACE = pg_default
		TEMPLATE template0
    CONNECTION LIMIT = -1;

/* create tables */
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS categories_articles;

CREATE TABLE articles(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title text NOT NULL,
  announce text NOT NULL,
  full_text text NOT NULL,
  created_at timestamp DEFAULT current_timestamp
);
CREATE TABLE categories(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text NOT NULL,
  created_at timestamp DEFAULT current_timestamp
);
CREATE TABLE comments(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text text NOT NULL,
  article_id integer NOT NULL,
  created_at timestamp DEFAULT current_timestamp,
  FOREIGN KEY (article_id) REFERENCES articles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
CREATE TABLE categories_articles(
  category_id integer NOT NULL,
  article_id integer NOT NULL,
  PRIMARY KEY (category_id, article_id),
  FOREIGN KEY (article_id) REFERENCES articles(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);

CREATE INDEX ON articles(title);
