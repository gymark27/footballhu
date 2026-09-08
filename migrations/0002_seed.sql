-- ============================================================
-- FootballHu - kezdo adatok
-- 0002_seed.sql
-- A jelenlegi hardcode-olt tombok atemelve az adatbazisba.
-- ============================================================

-- ---------- MARKAK ----------
INSERT INTO brands (id, slug, name, tagline) VALUES
  (1, 'nike',   'Nike',   'Speed & precision'),
  (2, 'adidas', 'Adidas', 'Control & power'),
  (3, 'puma',   'Puma',   'Speed & agility');

-- ---------- MODELLCSALADOK ----------
INSERT INTO model_lines (id, brand_id, slug, name, description) VALUES
  (1, 1, 'mercurial', 'Mercurial', 'A sebesseg szimboluma: vekony felsoresz, robbanekony indulasok.'),
  (2, 1, 'phantom',   'Phantom',   'Precizios iranyitas, puhabb felsoresz technikas jatekhoz.'),
  (3, 1, 'tiempo',    'Tiempo',    'Kenyelmes, bor felsoreszu modell stabilitassal es kontrollal.'),
  (4, 2, 'predator',  'Predator',  'Eros lovesekhez es kontrollhoz tervezett modell.'),
  (5, 2, 'x',         'X',         'Speed orientalt cipo konnyu felsoresszel.'),
  (6, 2, 'copa',      'Copa',      'Klasszikus bor felsoresz, maximalis erzet a labdaval.'),
  (7, 3, 'ultra',     'Ultra',     'Konnyu speed cipo, agressziv talpkialakitassal.'),
  (8, 3, 'future',    'Future',    'Rugalmas felsoresz, kivalo illeszkedes kreativ jatekosoknak.'),
  (9, 3, 'king',      'King',      'Modernizalt klasszikus, tiszta labdaerzet es komfort.');

-- ---------- PARTNEREK ----------
INSERT INTO partners (id, slug, name, feed_format, is_active) VALUES
  (1, 'bootstore',    'BootStore',    'manual', 1),
  (2, 'partnersport', 'PartnerSport', 'manual', 1),
  (3, 'csukashop',    'CsukaShop',    'manual', 1),
  (4, 'speedboots',   'SpeedBoots',   'manual', 1),
  (5, 'classicboots', 'ClassicBoots', 'manual', 1);

-- ---------- CIPOK: NIKE ----------
INSERT INTO boots (id, line_id, slug, name, tagline, tier, surface, play_style,
                   weight_grams, width_fit, upper, studs, playstyle_txt, players_txt,
                   is_new, is_bestseller) VALUES
  (1, 2, 'phantom-gx-elite-fg', 'Phantom GX Elite FG',
   'Iranyitoknak, tech-touch jatekhoz.', 'Elite', 'FG', 'control',
   205, 'wide', 'Gripknit felsoresz, nagy erintesi felulet',
   'Kombinalt stoplik - tapadas es fordulekonysag',
   'Kozeppalyasoknak, iranyitoknak, akik sokat passzolnak.',
   'De Bruyne, Gavi tipusu jatekosok profiljahoz all kozel.', 1, 1),

  (2, 1, 'mercurial-vapor-elite-fg', 'Mercurial Vapor Elite FG',
   'Szelsoknek, akik sebessegbol elnek.', 'Elite', 'FG', 'speed',
   195, 'narrow', 'Engineered mesh + NikeSkin bevonat',
   'Bladed es kerek stoplik sprinthez optimalizalva',
   'Akik sebessegbol verik meg a vedelmet.',
   'Mbappe, Vinicius Jr. tipusu jatekosok stilusahoz hasonlo.', 0, 1),

  (3, 3, 'tiempo-legend-elite-fg', 'Tiempo Legend Elite FG',
   'Klasszikus boros erzes, modern technikaval.', 'Elite', 'FG', 'classic',
   210, 'wide', 'Premium bor + modern belso szerkezet',
   'Kerek stoplik - stabilitas es komfort',
   'Akiknek a stabilitas es kiszamithato erintes a legfontosabb.',
   'Klasszikus, nyugodt stilusu vedok, melysegi iranyitok.', 0, 0),

  (4, 2, 'phantom-gx-pro-ag', 'Phantom GX Pro AG',
   'Mufure optimalizalt, konnyu kontroll.', 'Pro', 'AG', 'control',
   220, 'regular', 'Muszalas felsoresz tapados zonakkal',
   'Kontrollra es forgekonysagra hangolva',
   'Akiknek fontos, hogy a labda jol uljon a labon.',
   'Iranyito kozeppalyasok, technikas tamadok.', 0, 1);

-- ---------- CIPOK: ADIDAS ----------
INSERT INTO boots (id, line_id, slug, name, tagline, tier, surface, play_style,
                   weight_grams, width_fit, upper, studs, playstyle_txt, players_txt,
                   is_new, is_bestseller) VALUES
  (5, 4, 'predator-elite-fg', 'Predator Elite FG',
   'Kontrollra hangolva iranyitoknak es lovospecialistaknak.', 'Elite', 'FG', 'power',
   215, 'regular', 'Gumipaneles felsoresz (HybridTouch)',
   'FG stoplik - stabil tamasz lovesnel',
   'Akik pontos hosszu passzokat es eros loveseket keresnek.',
   'Bellingham, Alexander-Arnold tipusu jatekosok.', 0, 1),

  (6, 4, 'predator-pro-fg', 'Predator Pro FG',
   'Tapadas es ero, elerhetobb aron.', 'Pro', 'FG', 'power',
   225, 'regular', 'Szintetikus felsoresz textural zonakkal',
   'FG stoplik',
   'Felprofi es hobbi jatekosoknak, akik kontrollt keresnek.',
   'Amator szinten nepszeru valasztas.', 1, 0),

  (7, 5, 'x-crazyfast-elite-fg', 'X Crazyfast Elite FG',
   'Extrem konnyu speed csuka szelsoknek, csataroknak.', 'Elite', 'FG', 'speed',
   185, 'narrow', 'Aerocage + ultrakonnyu felsoresz',
   'Sprinthez tervezett stoplikiosztas',
   'Robbanekony indulasokhoz, egy az egy elleni helyzetekhez.',
   'Gyors szelsok, melysegbe futo csatarok.', 0, 0),

  (8, 6, 'copa-pure-elite-fg', 'Copa Pure Elite FG',
   'Puha boros erzet, klasszikus kontroll.', 'Elite', 'FG', 'classic',
   220, 'wide', 'Puha bor felsoresz',
   'Kerek stoplik - komfort es stabilitas',
   'Akik a maximalis labdaerzetet keresik.',
   'Technikas kozeppalyasok, klasszikus vedok.', 1, 0);

-- ---------- CIPOK: PUMA ----------
INSERT INTO boots (id, line_id, slug, name, tagline, tier, surface, play_style,
                   weight_grams, width_fit, upper, studs, playstyle_txt, players_txt,
                   is_new, is_bestseller) VALUES
  (9, 7, 'ultra-ultimate-fg', 'Ultra Ultimate FG',
   'Villamgyors speed csuka a szeleken futoknak.', 'Elite', 'FG', 'speed',
   190, 'narrow', 'ULTRAWEAVE felsoresz',
   'SPEEDUNIT talp sprinthez',
   'Tiszta sebesseg - szelsoknek es melysegbe futoknak.',
   'Gyors szelsok, kontrafutasokra epito csapatok jatekosai.', 1, 1),

  (10, 7, 'ultra-pro-fg', 'Ultra Pro FG',
   'Konnyu, agressziv talpmintaval - elerhetobb aron.', 'Pro', 'FG', 'speed',
   210, 'regular', 'Szintetikus konnyu felsoresz',
   'FG stoplik gyors iranyvaltasokhoz',
   'Hobbi es felprofi szinten sebesseget kereso jatekosoknak.',
   'Amator szelsok, gyors kozeppalyasok.', 0, 0),

  (11, 8, 'future-ultimate-fg', 'Future Ultimate FG',
   'Rugalmas felsoresz, kotesmentes erzet - technikas jatekosoknak.', 'Elite', 'FG', 'control',
   215, 'wide', 'FUZIONFIT+ adaptiv felsoresz',
   'DYNAMIC MOTION SYSTEM talp',
   'Kreativ jatekosoknak, akik sokat cselezenek.',
   'Neymar, Griezmann tipusu jatekosok stilusa.', 0, 1),

  (12, 9, 'king-ultimate-fg', 'King Ultimate FG',
   'Modernizalt klasszikus - tiszta labdaerzet es komfort.', 'Elite', 'FG', 'classic',
   225, 'wide', 'Premium K-bor felsoresz',
   'Kerek stoplik',
   'Akik a klasszikus boros erzest keresik modern talppal.',
   'Klasszikus iranyitok, vedok.', 0, 0);

-- ---------- MERETEK ----------
INSERT INTO boot_sizes (boot_id, eu_size)
SELECT b.id, s.eu FROM boots b
CROSS JOIN (SELECT '40' AS eu UNION ALL SELECT '41' UNION ALL
            SELECT '42' UNION ALL SELECT '43' UNION ALL SELECT '44') s;

-- ---------- AJANLATOK ----------
-- Nike
INSERT INTO offers (boot_id, partner_id, price_huf, is_sale, note) VALUES
  (1, 1, 109990, 0, 'Legjobb ar, gyors szallitas'),
  (1, 2, 112990, 0, 'Legtobb eladas'),
  (1, 3, 114990, 0, 'Uj modell a kinalatban'),
  (2, 1, 104990, 0, 'Jelenleg a legolcsobb'),
  (2, 4, 109990, 0, 'Fast-shipping vonal'),
  (2, 2,  99990, 1, 'Akcio - kb. -10 000 Ft'),
  (3, 1,  94990, 0, 'Stabil, megbizhato ar'),
  (3, 5,  96990, 0, 'Uj verzio erkezett'),
  (4, 1,  79990, 0, 'AG-re a legjobb ar'),
  (4, 2,  82990, 0, 'Nepszeru a mufuves palyakon'),
  (4, 3,  74990, 1, 'AG akcio - limitalt ideig');

-- Adidas
INSERT INTO offers (boot_id, partner_id, price_huf, is_sale, note) VALUES
  (5, 1, 114990, 0, 'Stabil, megbizhato ar'),
  (5, 2, 116990, 0, 'Legtobb eladas'),
  (6, 2,  99990, 0, 'Jo ar-ertek arany'),
  (6, 3, 101990, 0, 'Uj modell, friss keszlet'),
  (7, 4, 124990, 0, 'Leggyorsabb szallitas'),
  (7, 1, 126990, 0, 'Nepszeru valasztas'),
  (7, 2, 119990, 1, 'Akcio - kb. -5 000 Ft'),
  (8, 5, 109990, 0, 'Klasszikus vonal kedvezo aron'),
  (8, 1, 112990, 0, 'Uj szeria erkezett');

-- Puma
INSERT INTO offers (boot_id, partner_id, price_huf, is_sale, note) VALUES
  ( 9, 4, 109990, 0, 'Leggyorsabb szallitas'),
  ( 9, 1, 111990, 0, 'Nepszeru valasztas'),
  ( 9, 2, 104990, 1, 'Akcios ar'),
  (10, 2,  94990, 0, 'Jo ar-ertek arany'),
  (10, 3,  96990, 0, 'Friss keszlet'),
  (11, 1, 114990, 0, 'Stabil ar'),
  (11, 2, 116990, 0, 'Nepszeru valasztas'),
  (12, 5, 104990, 0, 'Klasszikus vonal kedvezo aron'),
  (12, 1, 106990, 0, 'Uj szeria erkezett');

-- ---------- KOZOSSEGI POSZTOK ----------
INSERT INTO posts (type, title, body, cta_label, tags) VALUES
  ('video', 'Art of Predator - elso video kint',
   'Megerkezett az elso rovid video a Predatorrol. Nezd meg, hogyan dolgozik a cipo eles szitukban.',
   'Video megnyitasa TikTokon', '#Predator,#control,#ujvideo'),
  ('news', 'Mercurial fokuszban - keszul a kovetkezo anyag',
   'Uton a kovetkezo Mercurial-video, kozben gyujtjuk a tapasztalatokat kulonbozo palyatipusokrol.',
   'Kovesd TikTokon', '#Mercurial,#speed,#kovetkezo'),
  ('poll', 'Kozossegi teszt - melyik palyara viszed eloszor az uj csukat?',
   'Hamarosan erkezik egy szavazas: mufu, fuves palya vagy ketrec? Figyeld a sztorikat.',
   'Szavazz majd a sztoriban', '#poll,#community,#boots');
