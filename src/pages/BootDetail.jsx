// ============================================================
// Modell reszletek oldal - mind a harom markahoz
// src/pages/BootDetail.jsx
//
// Ez valtja ki a NikeBootDetail / AdidasBootDetail /
// PumaBootDetail harmast.
// ============================================================

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { api, useApi } from "../lib/api";
import { SURFACE_LABELS } from "../data/brandConfig";

const WIDTH_LABELS = {
  narrow: "Keskeny lábfej",
  regular: "Átlagos lábfej",
  wide: "Széles lábfej",
};

export default function BootDetail() {
  const { brand, slug } = useParams();

  const { data: boot, loading, error } = useApi(
    () => api.boot(slug),
    [slug]
  );

  if (loading) {
    return (
      <Wrapper>
        <p className="text-sm text-gray-400">Betöltés…</p>
      </Wrapper>
    );
  }

  if (error || !boot) {
    return (
      <Wrapper>
        <h1 className="mb-2 text-xl font-semibold">Nem található ez a modell</h1>
        <p className="mb-6 text-sm text-gray-400">{error}</p>
        <Link
          to={`/webshop/${brand}`}
          className="inline-flex items-center rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold"
        >
          ← Vissza a modellekhez
        </Link>
      </Wrapper>
    );
  }

  return (
    <div className="bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-10">
        {/* ---------- Fejlec ---------- */}
        <Link
          to={`/webshop/${brand}`}
          className="mb-6 inline-block text-xs text-gray-400 transition hover:text-white"
        >
          ← {boot.brand_name} modellek
        </Link>

        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            {boot.brand_name} • {boot.line_name}
          </p>
          <h1 className="mt-2 text-3xl font-semibold md:text-4xl">{boot.name}</h1>
          <p className="mt-3 max-w-2xl text-sm text-gray-300">{boot.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-2 text-[11px]">
            <Chip>{SURFACE_LABELS[boot.surface] || boot.surface}</Chip>
            <Chip>{boot.tier}</Chip>
            {boot.weight_grams && <Chip>{boot.weight_grams} g</Chip>}
            {boot.width_fit && <Chip>{WIDTH_LABELS[boot.width_fit]}</Chip>}
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* ---------- Bal oszlop ---------- */}
          <div className="space-y-6 lg:col-span-2">
            <Panel title="Specifikációk">
              <dl className="grid gap-3 sm:grid-cols-2">
                <Spec label="Felsőrész" value={boot.upper} />
                <Spec label="Stoplik" value={boot.studs} />
                <Spec label="Súly" value={boot.weight_grams && `${boot.weight_grams} g`} />
                <Spec label="Illeszkedés" value={WIDTH_LABELS[boot.width_fit]} />
              </dl>
            </Panel>

            {(boot.playstyle_txt || boot.players_txt) && (
              <Panel title="Kinek ajánljuk?">
                {boot.playstyle_txt && (
                  <p className="mb-3 text-sm text-gray-300">{boot.playstyle_txt}</p>
                )}
                {boot.players_txt && (
                  <p className="text-sm text-gray-400">{boot.players_txt}</p>
                )}
              </Panel>
            )}

            <Panel title="Elérhető méretek">
              <div className="flex flex-wrap gap-2">
                {boot.sizes.map((size) => (
                  <span
                    key={size}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs"
                  >
                    EU {size}
                  </span>
                ))}
              </div>
            </Panel>

            <UsedListings boot={boot} />
          </div>

          {/* ---------- Jobb oszlop: partnerarak ---------- */}
          <div>
            <Panel title="Partner ajánlatok" sticky>
              <p className="mb-4 text-[11px] text-gray-500">
                A vásárlás a partner oldalán történik. Az árak tájékoztató jellegűek.
              </p>

              <div className="space-y-3">
                {boot.offers.map((offer, i) => (
                  <div
                    key={offer.id}
                    className={`rounded-2xl p-3 ring-1 ${
                      i === 0
                        ? "bg-amber-500/10 ring-amber-400/30"
                        : "bg-black/60 ring-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-semibold text-white">
                        {offer.partner_name}
                      </p>
                      {i === 0 && (
                        <span className="rounded-full bg-amber-400/20 px-2 py-0.5 text-[10px] font-semibold text-amber-200">
                          Legolcsóbb
                        </span>
                      )}
                      {offer.is_sale && i !== 0 && (
                        <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-200">
                          Akciós
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-lg font-semibold text-amber-300">
                      {offer.price_formatted}
                    </p>
                    {offer.note && (
                      <p className="mt-1 text-[11px] text-gray-400">{offer.note}</p>
                    )}
                    {!offer.in_stock && (
                      <p className="mt-1 text-[11px] text-rose-300">Jelenleg nincs készleten</p>
                    )}
                  </div>
                ))}

                {boot.offers.length === 0 && (
                  <p className="text-xs text-gray-500">
                    Jelenleg nincs elérhető partner ajánlat.
                  </p>
                )}
              </div>
            </Panel>
          </div>
        </div>
      </section>
    </div>
  );
}

// ------------------------------------------------------------
// Hasznalt hirdetesek + urlap
// ------------------------------------------------------------
function UsedListings({ boot }) {
  const [form, setForm] = useState({ size: "", condition: "", price: "", note: "" });
  const [sent, setSent] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = () => {
    // TODO: POST /api/listings - a bejelentkezes utan kerul be
    setSent(true);
  };

  return (
    <Panel title="Használt hirdetések">
      {boot.listings.length > 0 ? (
        <div className="mb-6 space-y-3">
          {boot.listings.map((l) => (
            <div key={l.id} className="rounded-2xl bg-black/60 p-3 ring-1 ring-white/5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold">EU {l.eu_size} • {l.condition_txt}</p>
                <p className="text-sm font-semibold text-amber-300">{l.price_formatted}</p>
              </div>
              {l.note && <p className="mt-1 text-[11px] text-gray-400">{l.note}</p>}
              <p className="mt-1 text-[11px] text-gray-500">
                {l.seller}{l.location ? ` • ${l.location}` : ""}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="mb-6 text-xs text-gray-500">
          Ehhez a modellhez még nincs használt hirdetés.
        </p>
      )}

      <div className="rounded-2xl border border-white/10 bg-black/40 p-4">
        <h4 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-300">
          Hirdetés feladása
        </h4>

        {sent ? (
          <p className="text-xs text-emerald-300">
            Köszönjük! A hirdetés moderálás után jelenik meg.
          </p>
        ) : (
          <div className="space-y-2">
            <div className="grid gap-2 sm:grid-cols-3">
              <Input placeholder="Méret (pl. 42)" value={form.size} onChange={update("size")} />
              <Input placeholder="Állapot" value={form.condition} onChange={update("condition")} />
              <Input placeholder="Ár (Ft)" value={form.price} onChange={update("price")} />
            </div>
            <Input placeholder="Megjegyzés" value={form.note} onChange={update("note")} />

            <button
              onClick={handleSubmit}
              className="mt-1 rounded-full bg-indigo-500 px-4 py-2 text-[11px] font-semibold transition hover:bg-indigo-400"
            >
              Hirdetés beküldése
            </button>

            <p className="text-[11px] text-gray-500">
              A beküldés a bejelentkezés bevezetése után lesz aktív.
            </p>
          </div>
        )}
      </div>
    </Panel>
  );
}

// ------------------------------------------------------------
// Apro epitoelemek
// ------------------------------------------------------------
function Wrapper({ children }) {
  return (
    <div className="bg-neutral-950 text-white">
      <section className="mx-auto max-w-6xl px-4 pb-20 pt-16">{children}</section>
    </div>
  );
}

function Panel({ title, children, sticky }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-black/50 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.7)] ${
        sticky ? "lg:sticky lg:top-24" : ""
      }`}
    >
      <h2 className="mb-4 text-sm font-semibold text-white">{title}</h2>
      {children}
    </div>
  );
}

function Spec({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="mt-0.5 text-sm text-gray-200">{value}</dd>
    </div>
  );
}

function Chip({ children }) {
  return (
    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-gray-300">
      {children}
    </span>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2 text-xs text-white placeholder-gray-500 outline-none transition focus:border-indigo-400"
    />
  );
}
