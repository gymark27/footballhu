// ============================================================
// FootballHu - API (Cloudflare Worker + Hono)
// worker/index.js
//
// Ez a fajl fogadja a frontend fetch-hivasait, lekerdezi a D1
// adatbazist, es JSON-t ad vissza.
// ============================================================

import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

// Fejlesztes alatt a Vite (5173) es a Worker (8787) kulon portokon
// fut, ezert kell CORS. Eles kornyezetben ugyanaz a domain.
app.use("/api/*", cors());

// ------------------------------------------------------------
// Segedfuggvenyek
// ------------------------------------------------------------

// A D1 integerkent tarolja a logikai ertekeket (0/1).
// A frontendnek igazi true/false kell.
function toBool(row, ...fields) {
  for (const f of fields) {
    if (f in row) row[f] = Boolean(row[f]);
  }
  return row;
}

// "114990"  ->  "114 990 Ft"
function formatPrice(huf) {
  if (huf == null) return null;
  return huf.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Ft";
}

// ------------------------------------------------------------
// GET /api/brands
// Az osszes marka, mellette hany cipo tartozik hozza.
// ------------------------------------------------------------
app.get("/api/brands", async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT br.id, br.slug, br.name, br.tagline,
           COUNT(b.id) AS boot_count
    FROM brands br
    LEFT JOIN model_lines ml ON ml.brand_id = br.id
    LEFT JOIN boots b        ON b.line_id  = ml.id
    GROUP BY br.id
    ORDER BY br.id
  `).all();

  return c.json(results);
});

// ------------------------------------------------------------
// GET /api/boots
// A fo listazo endpoint. Szurheto query parameterekkel:
//   ?brand=nike&tier=Elite&surface=FG&size=42&sort=price_asc
//
// Ez valtja ki a frontendbol a useMemo-s szurest: mostantol
// az adatbazis vegzi a munkat, nem a bongeszo.
// ------------------------------------------------------------
app.get("/api/boots", async (c) => {
  const { brand, tier, surface, size, style, sort, tab } = c.req.query();

  const where = [];
  const params = [];

  if (brand)   { where.push("br.slug = ?");      params.push(brand); }
  if (tier)    { where.push("b.tier = ?");       params.push(tier); }
  if (surface) { where.push("b.surface = ?");    params.push(surface); }
  if (style)   { where.push("b.play_style = ?"); params.push(style); }

  // A webshop tabjai
  if (tab === "new")  where.push("b.is_new = 1");
  if (tab === "top")  where.push("b.is_bestseller = 1");
  if (tab === "sale") where.push("EXISTS (SELECT 1 FROM offers o2 WHERE o2.boot_id = b.id AND o2.is_sale = 1 AND o2.is_current = 1)");

  if (size) {
    where.push("EXISTS (SELECT 1 FROM boot_sizes bs WHERE bs.boot_id = b.id AND bs.eu_size = ?)");
    params.push(size);
  }

  const whereSql = where.length ? "WHERE " + where.join(" AND ") : "";

  const orderSql =
    sort === "price_desc" ? "ORDER BY min_price DESC" :
    sort === "name"       ? "ORDER BY b.name ASC" :
                            "ORDER BY min_price ASC";

  const { results } = await c.env.DB.prepare(`
    SELECT
      b.id, b.slug, b.name, b.tagline, b.tier, b.surface,
      b.play_style, b.image_url, b.is_new, b.is_bestseller,
      br.slug AS brand_slug, br.name AS brand_name,
      ml.name AS line_name,
      MIN(o.price_huf) AS min_price,
      COUNT(DISTINCT o.partner_id) AS partner_count
    FROM boots b
    JOIN model_lines ml ON b.line_id  = ml.id
    JOIN brands br      ON ml.brand_id = br.id
    LEFT JOIN offers o  ON o.boot_id = b.id AND o.is_current = 1
    ${whereSql}
    GROUP BY b.id
    ${orderSql}
  `).bind(...params).all();

  const boots = results.map((r) => ({
    ...toBool(r, "is_new", "is_bestseller"),
    min_price_formatted: formatPrice(r.min_price),
  }));

  return c.json(boots);
});

// ------------------------------------------------------------
// GET /api/boots/:slug
// Egy cipo minden adata: specifikaciok, meretek, partnerarak,
// es a jovahagyott hasznalt hirdetesek.
// ------------------------------------------------------------
app.get("/api/boots/:slug", async (c) => {
  const slug = c.req.param("slug");

  const boot = await c.env.DB.prepare(`
    SELECT b.*, br.slug AS brand_slug, br.name AS brand_name,
           ml.name AS line_name, ml.description AS line_description
    FROM boots b
    JOIN model_lines ml ON b.line_id  = ml.id
    JOIN brands br      ON ml.brand_id = br.id
    WHERE b.slug = ?
  `).bind(slug).first();

  if (!boot) {
    return c.json({ error: "Nem talalhato ez a modell." }, 404);
  }

  // Partnerajanlatok, olcsotol dragaig
  const { results: offers } = await c.env.DB.prepare(`
    SELECT o.id, o.price_huf, o.eu_size, o.in_stock, o.is_sale,
           o.product_url, o.note, o.fetched_at,
           p.name AS partner_name, p.slug AS partner_slug
    FROM offers o
    JOIN partners p ON o.partner_id = p.id
    WHERE o.boot_id = ? AND o.is_current = 1
    ORDER BY o.price_huf ASC
  `).bind(boot.id).all();

  // Elerheto meretek
  const { results: sizes } = await c.env.DB.prepare(`
    SELECT eu_size FROM boot_sizes WHERE boot_id = ? ORDER BY eu_size
  `).bind(boot.id).all();

  // Hasznalt hirdetesek (csak a jovahagyottak!)
  const { results: listings } = await c.env.DB.prepare(`
    SELECT l.id, l.eu_size, l.condition_txt, l.price_huf,
           l.location, l.note, l.created_at,
           u.display_name AS seller
    FROM listings l
    JOIN users u ON l.user_id = u.id
    WHERE l.boot_id = ? AND l.status = 'approved'
    ORDER BY l.created_at DESC
  `).bind(boot.id).all();

  return c.json({
    ...toBool(boot, "is_new", "is_bestseller"),
    sizes: sizes.map((s) => s.eu_size),
    offers: offers.map((o) => ({
      ...toBool(o, "in_stock", "is_sale"),
      price_formatted: formatPrice(o.price_huf),
    })),
    listings: listings.map((l) => ({
      ...l,
      price_formatted: formatPrice(l.price_huf),
    })),
  });
});

// ------------------------------------------------------------
// GET /api/boots/:slug/price-history
// Arelozmeny - ebbol lesz a grafikon a modelloldalon.
// ------------------------------------------------------------
app.get("/api/boots/:slug/price-history", async (c) => {
  const slug = c.req.param("slug");

  const { results } = await c.env.DB.prepare(`
    SELECT o.price_huf, o.fetched_at, p.name AS partner_name
    FROM offers o
    JOIN boots b    ON o.boot_id = b.id
    JOIN partners p ON o.partner_id = p.id
    WHERE b.slug = ?
    ORDER BY o.fetched_at ASC
  `).bind(slug).all();

  return c.json(results);
});

// ------------------------------------------------------------
// GET /api/posts
// A fooldali kozossegi feed.
// ------------------------------------------------------------
app.get("/api/posts", async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT id, type, title, body, cta_label, cta_url, tags, published_at
    FROM posts
    ORDER BY published_at DESC
  `).all();

  const posts = results.map((p) => ({
    ...p,
    tags: p.tags ? p.tags.split(",") : [],
  }));

  return c.json(posts);
});

// ------------------------------------------------------------
// GET /api/health
// Gyors ellenorzes, hogy el-e az API es a DB.
// ------------------------------------------------------------
app.get("/api/health", async (c) => {
  const row = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM boots").first();
  return c.json({ ok: true, boots: row.n });
});

// ------------------------------------------------------------
// Ismeretlen /api utvonal
// ------------------------------------------------------------
app.notFound((c) => {
  if (c.req.path.startsWith("/api")) {
    return c.json({ error: "Nincs ilyen API vegpont." }, 404);
  }
  return c.text("Not found", 404);
});

export default app;
