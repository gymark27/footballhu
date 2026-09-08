-- ============================================================
-- FootballHu - adatbazis sema (Cloudflare D1 / SQLite)
-- 0001_init.sql
-- ============================================================

PRAGMA foreign_keys = ON;

-- ------------------------------------------------------------
-- MARKAK
-- Nike, Adidas, Puma. A "slug" az URL-ben hasznalt rovid nev.
-- ------------------------------------------------------------
CREATE TABLE brands (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  slug        TEXT    NOT NULL UNIQUE,
  name        TEXT    NOT NULL,
  tagline     TEXT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ------------------------------------------------------------
-- MODELLCSALADOK
-- Mercurial, Phantom, Predator, Ultra...
-- Egy markahoz sok modellcsalad tartozik (1:N).
-- ------------------------------------------------------------
CREATE TABLE model_lines (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  brand_id    INTEGER NOT NULL,
  slug        TEXT    NOT NULL,
  name        TEXT    NOT NULL,
  description TEXT,
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),

  FOREIGN KEY (brand_id) REFERENCES brands(id) ON DELETE CASCADE,
  UNIQUE (brand_id, slug)
);

CREATE INDEX idx_model_lines_brand ON model_lines(brand_id);

-- ------------------------------------------------------------
-- CIPOK (variansok)
-- Egy konkret cipo: "Mercurial Vapor Elite FG".
-- A BootsFinder ezeket az oszlopokat fogja pontozni.
-- ------------------------------------------------------------
CREATE TABLE boots (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  line_id       INTEGER NOT NULL,
  slug          TEXT    NOT NULL UNIQUE,
  name          TEXT    NOT NULL,
  tagline       TEXT,

  -- besorolas
  tier          TEXT    NOT NULL CHECK (tier IN ('Elite','Pro','Academy','Club')),
  surface       TEXT    NOT NULL CHECK (surface IN ('FG','AG','SG','TF','IC','MG')),
  play_style    TEXT    CHECK (play_style IN ('speed','control','power','classic')),

  -- BootsFinder attributumok
  weight_grams  INTEGER,
  width_fit     TEXT    CHECK (width_fit IN ('narrow','regular','wide')),
  upper         TEXT,
  studs         TEXT,
  playstyle_txt TEXT,
  players_txt   TEXT,

  -- media
  image_url     TEXT,
  video_url     TEXT,

  -- jelolok a webshop tabokhoz
  is_new        INTEGER NOT NULL DEFAULT 0,
  is_bestseller INTEGER NOT NULL DEFAULT 0,

  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),

  FOREIGN KEY (line_id) REFERENCES model_lines(id) ON DELETE CASCADE
);

CREATE INDEX idx_boots_line    ON boots(line_id);
CREATE INDEX idx_boots_tier    ON boots(tier);
CREATE INDEX idx_boots_surface ON boots(surface);

-- ------------------------------------------------------------
-- MERETEK
-- Egy cipo tobb meretben letezik (N:M feloldva kapcsolotablaval).
-- ------------------------------------------------------------
CREATE TABLE boot_sizes (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  boot_id  INTEGER NOT NULL,
  eu_size  TEXT    NOT NULL,

  FOREIGN KEY (boot_id) REFERENCES boots(id) ON DELETE CASCADE,
  UNIQUE (boot_id, eu_size)
);

-- ------------------------------------------------------------
-- PARTNEREK (webshopok)
-- Ide kerulnek majd a valos affiliate partnerek.
-- ------------------------------------------------------------
CREATE TABLE partners (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  slug                TEXT    NOT NULL UNIQUE,
  name                TEXT    NOT NULL,
  website_url         TEXT,
  affiliate_base_url  TEXT,
  feed_url            TEXT,
  feed_format         TEXT    CHECK (feed_format IN ('xml','csv','json','manual')),
  is_active           INTEGER NOT NULL DEFAULT 1,
  created_at          TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ------------------------------------------------------------
-- AJANLATOK  <<< a rendszer szive
-- "ez a cipo, ennel a partnernel, ennyiert, ekkor".
-- Ket idegen kulcs -> ez oldja fel a tobb-a-tobbhoz kapcsolatot.
-- Minden feed-import uj sorokat ir ide -> igy lesz arelozmeny.
-- ------------------------------------------------------------
CREATE TABLE offers (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  boot_id       INTEGER NOT NULL,
  partner_id    INTEGER NOT NULL,

  price_huf     INTEGER NOT NULL,
  currency      TEXT    NOT NULL DEFAULT 'HUF',
  eu_size       TEXT,
  in_stock      INTEGER NOT NULL DEFAULT 1,
  is_sale       INTEGER NOT NULL DEFAULT 0,
  product_url   TEXT,
  note          TEXT,

  fetched_at    TEXT    NOT NULL DEFAULT (datetime('now')),
  is_current    INTEGER NOT NULL DEFAULT 1,

  FOREIGN KEY (boot_id)    REFERENCES boots(id)    ON DELETE CASCADE,
  FOREIGN KEY (partner_id) REFERENCES partners(id) ON DELETE CASCADE
);

CREATE INDEX idx_offers_boot    ON offers(boot_id);
CREATE INDEX idx_offers_current ON offers(boot_id, is_current);
CREATE INDEX idx_offers_price   ON offers(price_huf);

-- ------------------------------------------------------------
-- FELHASZNALOK
-- A jelszo SOHA nem plain textben, csak hash-elve.
-- ------------------------------------------------------------
CREATE TABLE users (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  email          TEXT    NOT NULL UNIQUE,
  password_hash  TEXT    NOT NULL,
  display_name   TEXT    NOT NULL,
  role           TEXT    NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')),
  created_at     TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ------------------------------------------------------------
-- HASZNALT CIPO HIRDETESEK
-- A modelloldalon levo urlap ide fog irni.
-- A "status" adja a moderacios folyamatot.
-- ------------------------------------------------------------
CREATE TABLE listings (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  boot_id       INTEGER NOT NULL,
  user_id       INTEGER NOT NULL,

  eu_size       TEXT    NOT NULL,
  condition_txt TEXT    NOT NULL,
  price_huf     INTEGER NOT NULL,
  location      TEXT,
  note          TEXT,

  status        TEXT    NOT NULL DEFAULT 'pending'
                CHECK (status IN ('pending','approved','rejected','sold')),

  created_at    TEXT    NOT NULL DEFAULT (datetime('now')),

  FOREIGN KEY (boot_id) REFERENCES boots(id)  ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id)  ON DELETE CASCADE
);

CREATE INDEX idx_listings_boot   ON listings(boot_id, status);
CREATE INDEX idx_listings_user   ON listings(user_id);

-- ------------------------------------------------------------
-- HIRDETESKEPEK (R2-ben tarolt fajlok kulcsai)
-- ------------------------------------------------------------
CREATE TABLE listing_images (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  listing_id  INTEGER NOT NULL,
  r2_key      TEXT    NOT NULL,
  sort_order  INTEGER NOT NULL DEFAULT 0,

  FOREIGN KEY (listing_id) REFERENCES listings(id) ON DELETE CASCADE
);

-- ------------------------------------------------------------
-- KOZOSSEGI FEED (a fooldali posztok)
-- ------------------------------------------------------------
CREATE TABLE posts (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  type         TEXT    NOT NULL CHECK (type IN ('video','news','poll')),
  title        TEXT    NOT NULL,
  body         TEXT    NOT NULL,
  cta_label    TEXT,
  cta_url      TEXT,
  tags         TEXT,
  published_at TEXT    NOT NULL DEFAULT (datetime('now'))
);

-- ------------------------------------------------------------
-- BOOTSFINDER KITOLTESEK
-- A valaszok mentese -> ebbol lesz a szakdolgozat merese.
-- ------------------------------------------------------------
CREATE TABLE finder_sessions (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id        INTEGER,
  answers_json   TEXT    NOT NULL,
  results_json   TEXT    NOT NULL,
  rating         INTEGER CHECK (rating BETWEEN 1 AND 5),
  created_at     TEXT    NOT NULL DEFAULT (datetime('now')),

  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);
