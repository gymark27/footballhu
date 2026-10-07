// ============================================================
// Autentikacios segedfuggvenyek
// worker/auth.js
//
// Ket dolgot csinal:
//   1. Jelszo hash-eles (PBKDF2) es ellenorzes
//   2. JWT token keszitese es ellenorzese (HMAC-SHA256)
//
// Mindket resz a bongeszo/Worker beepitett WebCrypto API-jat
// hasznalja - nincs szukseg kulso konyvtarra.
// ============================================================

// ------------------------------------------------------------
// Segedfuggvenyek a kodolashoz
// ------------------------------------------------------------
const encoder = new TextEncoder();

function toBase64Url(bytes) {
  const bin = String.fromCharCode(...new Uint8Array(bytes));
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(str) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}

// ============================================================
// 1. JELSZO KEZELES
// ============================================================
//
// A jelszot SOHA nem taroljuk eredeti formaban. Amit tarolunk:
//
//   pbkdf2$100000$<so>$<hash>
//
// A "so" (salt) egy veletlen ertek minden felhasznalonak kulon.
// Ettol ket azonos jelszo is mas hash-t ad, igy egy kiszivargott
// adatbazisbol nem lehet elore szamolt tablaval visszafejteni.
//
// A PBKDF2 szandekosan lassu (100 000 iteracio) - ez neheziti a
// brute force tamadast.
// ------------------------------------------------------------

const ITERATIONS = 100_000;

async function pbkdf2(password, salt) {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );

  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", salt, iterations: ITERATIONS, hash: "SHA-256" },
    keyMaterial,
    256
  );

  return new Uint8Array(bits);
}

export async function hashPassword(password) {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await pbkdf2(password, salt);
  return `pbkdf2$${ITERATIONS}$${toBase64Url(salt)}$${toBase64Url(hash)}`;
}

export async function verifyPassword(password, stored) {
  try {
    const [scheme, , saltB64, hashB64] = stored.split("$");
    if (scheme !== "pbkdf2") return false;

    const salt = fromBase64Url(saltB64);
    const expected = fromBase64Url(hashB64);
    const actual = await pbkdf2(password, salt);

    // Konstans ideju osszehasonlitas - nem arulja el, hanyadik
    // bajtnal ter el (timing attack ellen).
    if (actual.length !== expected.length) return false;
    let diff = 0;
    for (let i = 0; i < actual.length; i++) {
      diff |= actual[i] ^ expected[i];
    }
    return diff === 0;
  } catch {
    return false;
  }
}

// ============================================================
// 2. JWT TOKEN
// ============================================================
//
// A JWT harom reszbol all, ponttal elvalasztva:
//   fejlec.adat.alairas
//
// Az elso ketto csak base64 - barki elolvashatja, NEM titkos.
// Az alairas viszont a szerver titkos kulcsaval keszul, igy a
// tartalmat nem lehet eszrevetlenul modositani.
//
// Ezert nem teszunk bele erzekeny adatot, csak azonositot.
// ------------------------------------------------------------

const TOKEN_TTL = 60 * 60 * 24 * 7; // 7 nap masodpercben

async function getKey(secret) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signToken(payload, secret) {
  const header = { alg: "HS256", typ: "JWT" };
  const now = Math.floor(Date.now() / 1000);

  const body = { ...payload, iat: now, exp: now + TOKEN_TTL };

  const headerB64 = toBase64Url(encoder.encode(JSON.stringify(header)));
  const bodyB64 = toBase64Url(encoder.encode(JSON.stringify(body)));
  const data = `${headerB64}.${bodyB64}`;

  const key = await getKey(secret);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(data));

  return `${data}.${toBase64Url(signature)}`;
}

export async function verifyToken(token, secret) {
  try {
    const [headerB64, bodyB64, sigB64] = token.split(".");
    if (!headerB64 || !bodyB64 || !sigB64) return null;

    const key = await getKey(secret);
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64Url(sigB64),
      encoder.encode(`${headerB64}.${bodyB64}`)
    );

    if (!valid) return null;

    const payload = JSON.parse(new TextDecoder().decode(fromBase64Url(bodyB64)));

    // Lejart?
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

// ============================================================
// 3. SUTI KEZELES
// ============================================================
//
// A tokent httpOnly sutiben taroljuk, NEM localStorage-ban.
// Igy JavaScriptbol nem olvashato, ami vedelmet ad XSS ellen.
// ------------------------------------------------------------

export function buildAuthCookie(token, isSecure) {
  const parts = [
    `token=${token}`,
    "HttpOnly",
    "Path=/",
    "SameSite=Lax",
    `Max-Age=${TOKEN_TTL}`,
  ];
  if (isSecure) parts.push("Secure");
  return parts.join("; ");
}

export function buildLogoutCookie(isSecure) {
  const parts = ["token=", "HttpOnly", "Path=/", "SameSite=Lax", "Max-Age=0"];
  if (isSecure) parts.push("Secure");
  return parts.join("; ");
}

export function readCookie(request, name) {
  const header = request.headers.get("Cookie") || "";
  for (const part of header.split(";")) {
    const [key, ...rest] = part.trim().split("=");
    if (key === name) return rest.join("=");
  }
  return null;
}

// ============================================================
// 4. MIDDLEWARE
// ============================================================
//
// requireAuth  - csak bejelentkezve engedi tovabb
// requireAdmin - csak admin szerepkorrel
//
// A megtalalt felhasznalot c.set("user", ...) teszi elerhetove.
// ------------------------------------------------------------

export async function attachUser(c, next) {
  const token = readCookie(c.req.raw, "token");

  if (token) {
    const payload = await verifyToken(token, c.env.JWT_SECRET);
    if (payload) c.set("user", payload);
  }

  await next();
}

export async function requireAuth(c, next) {
  if (!c.get("user")) {
    return c.json({ error: "Bejelentkezés szükséges." }, 401);
  }
  await next();
}

export async function requireAdmin(c, next) {
  const user = c.get("user");
  if (!user || user.role !== "admin") {
    return c.json({ error: "Nincs jogosultságod ehhez." }, 403);
  }
  await next();
}
