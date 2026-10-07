// ============================================================
// FootballHu - API (Cloudflare Worker + Hono)
// worker/index.js
// ============================================================

import { Hono } from "hono";
import { cors } from "hono/cors";

import {
  hashPassword,
  verifyPassword,
  signToken,
  buildAuthCookie,
  buildLogoutCookie,
  attachUser,
  requireAuth,
  requireAdmin,
} from "./auth.js";

const app = new Hono();

app.use("/api/*", cors({ origin: (o) => o, credentials: true }));
app.use("/api/*", attachUser);

// ------------------------------------------------------------
// Segedfuggvenyek
// ------------------------------------------------------------

function toBool(row, ...fields) {
  for (const f of fields) {
    if (f in row) row[f] = Boolean(row[f]);
  }
  return row;
}

function formatPrice(huf) {
  if (huf == null) return null;
  return huf.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " Ft";
}

function isSecure(c) {
  return new URL(c.req.url).protocol === "https:";
}

// ============================================================
// AUTENTIKACIO
// ============================================================

// ---------- Regisztracio ----------
app.post("/api/auth/register", async (c) => {
  const { email, password, display_name } = await c.req.json();

  if (!email || !password || !display_name) {
    return c.json({ error: "Minden mező kitöltése kötelező." }, 400);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return c.json({ error: "Érvénytelen e-mail cím." }, 400);
  }
  if (password.length < 8) {
    return c.json({ error: "A jelszó legalább 8 karakter legyen." }, 400);
  }

  const existing = await c.env.DB
    .prepare("SELECT id FROM users WHERE email = ?")
    .bind(email.toLowerCase())
    .first();

  if (existing) {
    return c.json({ error: "Ezzel az e-mail címmel már van fiók." }, 409);
  }

  const password_hash = await hashPassword(password);

  const result = await c.env.DB
    .prepare(`INSERT INTO users (email, password_hash, display_name)
              VALUES (?, ?, ?) RETURNING id, email, display_name, role`)
    .bind(email.toLowerCase(), password_hash, display_name)
    .first();

  const token = await signToken(
    { id: result.id, email: result.email, name: result.display_name, role: result.role },
    c.env.JWT_SECRET
  );

  c.header("Set-Cookie", buildAuthCookie(token, isSecure(c)));
  return c.json({ user: result }, 201);
});

// ---------- Bejelentkezes ----------
app.post("/api/auth/login", async (c) => {
  const { email, password } = await c.req.json();

  if (!email || !password) {
    return c.json({ error: "Add meg az e-mail címet és a jelszót." }, 400);
  }

  const user = await c.env.DB
    .prepare("SELECT * FROM users WHERE email = ?")
    .bind(email.toLowerCase())
    .first();

  // Ugyanaz az uzenet rossz email es rossz jelszo eseten is:
  // igy nem derul ki, hogy letezik-e a fiok.
  const ok = user && (await verifyPassword(password, user.password_hash));
  if (!ok) {
    return c.json({ error: "Hibás e-mail cím vagy jelszó." }, 401);
  }

  const token = await signToken(
    { id: user.id, email: user.email, name: user.display_name, role: user.role },
    c.env.JWT_SECRET
  );

  c.header("Set-Cookie", buildAuthCookie(token, isSecure(c)));
  return c.json({
    user: { id: user.id, email: user.email, display_name: user.display_name, role: user.role },
  });
});

// ---------- Kijelentkezes ----------
app.post("/api/auth/logout", (c) => {
  c.header("Set-Cookie", buildLogoutCookie(isSecure(c)));
  return c.json({ ok: true });
});

// ---------- Ki vagyok? ----------
app.get("/api/auth/me", (c) => {
  const user = c.get("user");
  if (!user) return c.json({ user: null });
  return c.json({ user });
});

// ============================================================
// HIRDETESEK
// ============================================================

app.post("/api/listings", requireAuth, async (c) => {
  const user = c.get("user");
  const { boot_id, eu_size, condition_txt, price_huf, location, note } =
    await c.req.json();

  if (!boot_id || !eu_size || !condition_txt || !price_huf) {
    return c.json({ error: "Hiányzó adatok." }, 400);
  }

  const price = parseInt(price_huf, 10);
  if (isNaN(price) || price <= 0) {
    return c.json({ error: "Érvénytelen ár." }, 400);
  }

  const listing = await c.env.DB
    .prepare(`INSERT INTO listings
              (boot_id, user_id, eu_size, condition_txt, price_huf, location, note)
              VALUES (?, ?, ?, ?, ?, ?, ?) RETURNING id, status`)
    .bind(boot_id, user.id, eu_size, condition_txt, price, location || null, note || null)
    .first();

  return c.json({ listing }, 201);
});

app.get("/api/listings/mine", requireAuth, async (c) => {
  const user = c.get("user");

  const { results } = await c.env.DB.prepare(`
    SELECT l.*, b.name AS boot_name, b.slug AS boot_slug,
           br.slug AS brand_slug
    FROM listings l
    JOIN boots b        ON l.boot_id = b.id
    JOIN model_lines ml ON b.line_id = ml.id
    JOIN brands br      ON ml.brand_id = br.id
    WHERE l.user_id = ?
    ORDER BY l.created_at DESC
  `).bind(user.id).all();

  return c.json(results.map((l) => ({ ...l, price_formatted: formatPrice(l.price_huf) })));
});

app.delete("/api/listings/:id", requireAuth, async (c) => {
  const user = c.get("user");
  const id = c.req.param("id");

  const query = user.role === "admin"
    ? c.env.DB.prepare("DELETE FROM listings WHERE id = ?").bind(id)
    : c.env.DB.prepare("DELETE FROM listings WHERE id = ? AND user_id = ?").bind(id, user.id);

  const { meta } = await query.run();

  if (!meta.changes) {
    return c.json({ error: "Nem található, vagy nincs jogosultságod." }, 404);
  }
  return c.json({ ok: true });
});

// ---------- Moderacio (admin) ----------
app.get("/api/admin/listings", requireAdmin, async (c) => {
  const status = c.req.query("status") || "pending";

  const { results } = await c.env.DB.prepare(`
    SELECT l.*, b.name AS boot_name, u.display_name AS seller, u.email
    FROM listings l
    JOIN boots b ON l.boot_id = b.id
    JOIN users u ON l.user_id = u.id
    WHERE l.status = ?
    ORDER BY l.created_at ASC
  `).bind(status).all();

  return c.json(results.map((l) => ({ ...l, price_formatted: formatPrice(l.price_huf) })));
});

app.patch("/api/admin/listings/:id", requireAdmin, async (c) => {
  const { status } = await c.req.json();

  if (!["pending", "approved", "rejected", "sold"].includes(status)) {
    return c.json({ error: "Érvénytelen státusz." }, 400);
  }

  await c.env.DB
    .prepare("UPDATE listings SET status = ? WHERE id = ?")
    .bind(status, c.req.param("id"))
    .run();

  return c.json({ ok: true });
});

// ============================================================
// TERMEKEK (nyilvanos)
// ============================================================

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

app.get("/api/boots", async (c) => {
  const { brand, tier, surface, size, style, sort, tab } = c.req.query();

  const where = [];
  const params = [];

  if (brand)   { where.push("br.slug = ?");      params.push(brand); }
  if (tier)    { where.push("b.tier = ?");       params.push(tier); }
  if (surface) { where.push("b.surface = ?");    params.push(surface); }
  if (style)   { where.push("b.play_style = ?"); params.push(style); }

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

  return c.json(results.map((r) => ({
    ...toBool(r, "is_new", "is_bestseller"),
    min_price_formatted: formatPrice(r.min_price),
  })));
});

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

  if (!boot) return c.json({ error: "Nem található ez a modell." }, 404);

  const { results: offers } = await c.env.DB.prepare(`
    SELECT o.id, o.price_huf, o.eu_size, o.in_stock, o.is_sale,
           o.product_url, o.note, o.fetched_at,
           p.name AS partner_name, p.slug AS partner_slug
    FROM offers o
    JOIN partners p ON o.partner_id = p.id
    WHERE o.boot_id = ? AND o.is_current = 1
    ORDER BY o.price_huf ASC
  `).bind(boot.id).all();

  const { results: sizes } = await c.env.DB
    .prepare("SELECT eu_size FROM boot_sizes WHERE boot_id = ? ORDER BY eu_size")
    .bind(boot.id).all();

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
    listings: listings.map((l) => ({ ...l, price_formatted: formatPrice(l.price_huf) })),
  });
});

app.get("/api/boots/:slug/price-history", async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT o.price_huf, o.fetched_at, p.name AS partner_name
    FROM offers o
    JOIN boots b    ON o.boot_id = b.id
    JOIN partners p ON o.partner_id = p.id
    WHERE b.slug = ?
    ORDER BY o.fetched_at ASC
  `).bind(c.req.param("slug")).all();

  return c.json(results);
});

app.get("/api/posts", async (c) => {
  const { results } = await c.env.DB.prepare(`
    SELECT id, type, title, body, cta_label, cta_url, tags, published_at
    FROM posts ORDER BY published_at DESC
  `).all();

  return c.json(results.map((p) => ({
    ...p,
    tags: p.tags ? p.tags.split(",") : [],
  })));
});

app.get("/api/health", async (c) => {
  const row = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM boots").first();
  return c.json({ ok: true, boots: row.n });
});

// ------------------------------------------------------------
app.notFound((c) => {
  if (c.req.path.startsWith("/api")) {
    return c.json({ error: "Nincs ilyen API végpont." }, 404);
  }
  return c.text("Not found", 404);
});

export default app;
