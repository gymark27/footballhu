// ============================================================
// Marka oldal - egyetlen komponens mind a harom markahoz
// src/pages/BrandPage.jsx
//
// Ez valtja ki a NikePage.jsx / AdidasPage.jsx / PumaPage.jsx
// harmast (~1350 sor -> ~230 sor). A marka az URL-bol jon.
// ============================================================

import React, { useState, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";

import { api, useApi } from "../lib/api";
import { BRAND_CONFIG, SURFACE_LABELS } from "../data/brandConfig";

const SORT_MODES = [
  { id: "top",  label: "Legnépszerűbb" },
  { id: "new",  label: "Legújabb" },
  { id: "sale", label: "Akciós" },
  { id: "all",  label: "Összes" },
];

const SURFACES = ["all", "FG", "AG", "TF"];
const TIERS = ["all", "Elite", "Pro"];

export default function BrandPage() {
  const { brand } = useParams();
  const config = BRAND_CONFIG[brand];

  const [tab, setTab] = useState("top");
  const [lineFilter, setLineFilter] = useState("all");
  const [surfaceFilter, setSurfaceFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");

  const filterSectionRef = useRef(null);

  // Adatlekeres - minden szuro valtozasnal ujra fut
  const { data: boots, loading, error } = useApi(
    () => api.boots({ brand, tab, surface: surfaceFilter, tier: tierFilter }),
    [brand, tab, surfaceFilter, tierFilter]
  );

  // Ismeretlen marka -> vissza a webshopra
  if (!config) return <Navigate to="/webshop" replace />;

  const scrollToFilters = () =>
    filterSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleTopCardClick = (line) => {
    setLineFilter(line);
    scrollToFilters();
  };

  // A vonal szerinti szures marad kliensoldalon - keves elem, gyors
  const visibleBoots = (boots || []).filter(
    (b) => lineFilter === "all" || b.line_name === lineFilter
  );

  return (
    <div className="bg-neutral-950 text-white">
      {/* ---------- Felso szakasz: modellcsalad kartyak ---------- */}
      <section className="relative bg-gradient-to-b from-neutral-950 via-neutral-950 to-black pb-12 pt-10">
        <div className="pointer-events-none absolute -right-40 top-10 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
              Webshop • {config.label}
            </p>

            <Link
              to="/bootsfinder"
              className="inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-[0_0_25px_rgba(255,255,255,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,255,255,0.55)]"
            >
              BootsFinder – segítség a választáshoz ↗
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {config.lines.map((line) => (
              <button
                key={line.name}
                type="button"
                onClick={() => handleTopCardClick(line.name)}
                className="group relative flex overflow-hidden rounded-3xl bg-neutral-900/60 text-left shadow-[0_20px_60px_rgba(0,0,0,0.8)] ring-1 ring-white/10"
              >
                <div className="relative w-full">
                  <img
                    src={line.image}
                    alt={line.name}
                    className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 flex flex-col justify-end p-5">
                    <p className={`text-xs font-semibold uppercase tracking-[0.25em] ${line.accent}`}>
                      {line.kicker}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold">{line.name}</h3>
                    <span className={`mt-3 text-sm font-medium ${line.accent} ${line.hover}`}>
                      {line.name} modellek szűrése ↓
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Szurok + talalatok ---------- */}
      <section ref={filterSectionRef} className="mx-auto max-w-6xl px-4 pb-20 pt-10">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Válogatás szerint</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {SORT_MODES.map((mode) => (
              <button
                key={mode.id}
                onClick={() => setTab(mode.id)}
                className={`rounded-full px-4 py-1.5 transition ${
                  tab === mode.id
                    ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40"
                    : "bg-white/5 text-gray-300 hover:bg-white/10"
                }`}
              >
                {mode.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Szuropanel */}
          <aside className="w-full rounded-3xl border border-white/10 bg-black/50 p-4 text-xs text-gray-200 shadow-[0_18px_45px_rgba(0,0,0,0.7)] lg:w-72">
            <h3 className="mb-3 text-sm font-semibold text-white">Szűrők</h3>

            <FilterGroup
              title="Vonal"
              options={["all", ...config.lines.map((l) => l.name)]}
              value={lineFilter}
              onChange={setLineFilter}
              labelFor={(v) => (v === "all" ? "Mind" : v)}
            />

            <FilterGroup
              title="Pályatípus"
              options={SURFACES}
              value={surfaceFilter}
              onChange={setSurfaceFilter}
              labelFor={(v) => (v === "all" ? "Mind" : SURFACE_LABELS[v] || v)}
            />

            <FilterGroup
              title="Szint"
              options={TIERS}
              value={tierFilter}
              onChange={setTierFilter}
              labelFor={(v) => (v === "all" ? "Mind" : v)}
            />

            <p className="mt-3 text-[11px] text-gray-500">
              A szűrés az adatbázisban fut – a szerver csak a találatokat küldi vissza.
            </p>
          </aside>

          {/* Talalatok */}
          <div className="flex-1">
            {loading && <StateBox>Betöltés…</StateBox>}
            {error && <StateBox tone="error">Nem sikerült betölteni: {error}</StateBox>}

            {!loading && !error && (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {visibleBoots.map((boot) => (
                  <BootCard key={boot.slug} boot={boot} brand={brand} tab={tab} />
                ))}

                {visibleBoots.length === 0 && (
                  <StateBox>
                    Nincs olyan modell, ami megfelelne az aktuális szűrőknek.
                    Érdemes lazítani egy feltételen (pl. pályatípus vagy szint).
                  </StateBox>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

// ------------------------------------------------------------
// Kisebb, ujrahasznalt reszek
// ------------------------------------------------------------

function FilterGroup({ title, options, value, onChange, labelFor }) {
  return (
    <div className="mb-4">
      <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
        {title}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`rounded-full border px-3 py-1 text-[11px] transition ${
              value === opt
                ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                : "border-white/10 bg-white/5 text-gray-300 hover:border-indigo-300/60"
            }`}
          >
            {labelFor(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}

function BootCard({ boot, brand, tab }) {
  const badge =
    tab === "sale" ? { text: "Akciós", cls: "bg-rose-500/20 text-rose-200" } :
    tab === "new" && boot.is_new ? { text: "Új modell", cls: "bg-emerald-500/20 text-emerald-200" } :
    tab === "top" && boot.is_bestseller ? { text: "Best seller", cls: "bg-indigo-500/20 text-indigo-200" } :
    null;

  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black/70 to-black/90 p-4 text-xs shadow-[0_18px_45px_rgba(0,0,0,0.8)]">
      <div>
        <p className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wide text-gray-400">
          <span>{boot.brand_name} • {boot.line_name}</span>
          {badge && (
            <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${badge.cls}`}>
              {badge.text}
            </span>
          )}
        </p>

        <h3 className="mb-1 text-sm font-semibold text-white">{boot.name}</h3>
        <p className="mb-2 text-[11px] text-gray-300">{boot.tagline}</p>
        <p className="mb-1 text-[11px] text-gray-400">
          {SURFACE_LABELS[boot.surface] || boot.surface} • {boot.tier}
        </p>

        {boot.min_price && (
          <div className="mt-3 rounded-2xl bg-black/60 p-3 ring-1 ring-white/5">
            <p className="text-[11px] uppercase tracking-wide text-gray-400">
              Legjobb partner ajánlat
            </p>
            <p className="mt-1 text-base font-semibold text-amber-300">
              {boot.min_price_formatted}
            </p>
            <p className="mt-1 text-[11px] text-gray-400">
              {boot.partner_count} partner kínálatában
            </p>
          </div>
        )}
      </div>

      <div className="mt-4">
        <Link
          to={`/webshop/${brand}/${boot.slug}`}
          className="inline-flex w-full items-center justify-center rounded-full bg-indigo-500 px-3 py-2 text-[11px] font-semibold text-white shadow-lg shadow-indigo-500/40 transition group-hover:bg-indigo-400"
        >
          Részletek &amp; típusok →
        </Link>
      </div>
    </article>
  );
}

function StateBox({ children, tone }) {
  const cls = tone === "error"
    ? "border-rose-500/30 bg-rose-500/10 text-rose-200"
    : "border-white/10 bg-black/60 text-gray-300";

  return (
    <div className={`col-span-full rounded-2xl border p-6 text-sm ${cls}`}>
      {children}
    </div>
  );
}
