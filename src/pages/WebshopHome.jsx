// ============================================================
// Webshop fooldal - adatbazisbol
// src/pages/WebshopHome.jsx
// ============================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { api, useApi } from "../lib/api";
import { SURFACE_LABELS } from "../data/brandConfig";

import NikeCard from "../assets/brands/nike.jpg";
import AdidasCard from "../assets/brands/adidas.jpg";
import PumaCard from "../assets/brands/puma.jpg";

const BRAND_CARDS = [
  {
    slug: "nike",
    name: "Nike",
    image: NikeCard,
    kicker: "SPEED & PRECISION",
    accent: "text-indigo-100/80",
    text: "Mercurial, Phantom, Tiempo – a legnépszerűbb Nike vonalak.",
  },
  {
    slug: "adidas",
    name: "Adidas",
    image: AdidasCard,
    kicker: "CONTROL & POWER",
    accent: "text-emerald-100/80",
    text: "Predator, X, Copa – kontroll, sebesség és klasszikus érzet.",
  },
  {
    slug: "puma",
    name: "Puma",
    image: PumaCard,
    kicker: "SPEED & AGILITY",
    accent: "text-fuchsia-100/80",
    text: "Ultra, Future, King – könnyű, gyors és kreatív modellek.",
  },
];

const TABS = [
  ["top", "Legnépszerűbb"],
  ["new", "Legújabb"],
  ["sale", "Akciós"],
  ["all", "Összes"],
];

const BRANDS = ["all", "nike", "adidas", "puma"];
const TIERS = ["all", "Elite", "Pro", "Academy"];
const SURFACES = ["all", "FG", "AG", "TF"];
const SIZES = ["all", "39", "40", "41", "42", "43", "44"];

export default function WebshopHome() {
  const [tab, setTab] = useState("top");
  const [brand, setBrand] = useState("all");
  const [tier, setTier] = useState("all");
  const [surface, setSurface] = useState("all");
  const [size, setSize] = useState("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: boots, loading, error } = useApi(
    () => api.boots({ tab, brand, tier, surface, size }),
    [tab, brand, tier, surface, size]
  );

  return (
    <div className="min-h-screen bg-neutral-950 pb-28 text-white">
      <div className="mx-auto max-w-7xl px-4 pt-10 sm:px-6">
        {/* ---------- Fejlec ---------- */}
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
            Webshop • Futballcipők
          </p>

          <Link
            to="/bootsfinder"
            className="inline-flex items-center self-start rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-[0_0_25px_rgba(255,255,255,0.35)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(255,255,255,0.55)] md:self-auto"
          >
            BootsFinder – segítség a választáshoz ↗
          </Link>
        </div>

        {/* ---------- Marka kartyak ---------- */}
        <div className="mb-14">
          <div className="flex gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:gap-7 md:overflow-visible">
            {BRAND_CARDS.map((card) => (
              <Link
                key={card.slug}
                to={`/webshop/${card.slug}`}
                className="group relative h-64 min-w-[82vw] overflow-hidden rounded-3xl shadow-2xl md:h-64 md:min-w-0"
              >
                <img
                  src={card.image}
                  alt={`${card.name} football boots`}
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6">
                  <p className={`text-xs tracking-[0.25em] ${card.accent}`}>
                    {card.kicker}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">{card.name}</h2>
                  <p className="text-sm text-gray-300">{card.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* ---------- Valogatas ---------- */}
        <h2 className="mb-6 text-2xl font-bold">Válogatás szerint</h2>

        <div className="mb-4 flex w-fit items-center gap-2 rounded-full bg-black/40 p-1">
          {TABS.map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-full px-5 py-1.5 text-sm transition ${
                tab === key
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobil szuro kapcsolo */}
        <div className="mb-4 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setIsFilterOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs font-semibold text-gray-100"
          >
            {isFilterOpen ? "Szűrők elrejtése" : "Szűrők megnyitása"}
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* ---------- Szuropanel ---------- */}
          <aside
            className={`w-full shrink-0 rounded-3xl bg-black/60 p-5 text-xs shadow-[0_18px_45px_rgba(0,0,0,0.7)] ring-1 ring-white/10 lg:w-72 ${
              isFilterOpen ? "block" : "hidden"
            } lg:block`}
          >
            <h3 className="mb-4 text-sm font-semibold text-white">Szűrők</h3>

            <FilterGroup
              title="Márka"
              options={BRANDS}
              value={brand}
              onChange={setBrand}
              labelFor={(v) =>
                v === "all" ? "Mind" : v.charAt(0).toUpperCase() + v.slice(1)
              }
            />

            <FilterGroup
              title="Szint"
              options={TIERS}
              value={tier}
              onChange={setTier}
              labelFor={(v) => (v === "all" ? "Mind" : v)}
            />

            <FilterGroup
              title="Pályatípus"
              options={SURFACES}
              value={surface}
              onChange={setSurface}
              labelFor={(v) => (v === "all" ? "Mind" : SURFACE_LABELS[v] || v)}
            />

            <FilterGroup
              title="Méret (EU)"
              options={SIZES}
              value={size}
              onChange={setSize}
              labelFor={(v) => (v === "all" ? "Mind" : v)}
            />

            <p className="mt-4 text-[11px] text-gray-500">
              A szűrés az adatbázisban fut – a szerver csak a találatokat küldi vissza.
            </p>
          </aside>

          {/* ---------- Talalatok ---------- */}
          <div className="flex-1">
            {loading && <StateBox>Betöltés…</StateBox>}
            {error && <StateBox tone="error">Nem sikerült betölteni: {error}</StateBox>}

            {!loading && !error && (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {boots.map((boot) => (
                  <BootCard key={boot.slug} boot={boot} tab={tab} />
                ))}

                {boots.length === 0 && (
                  <StateBox>
                    Nincs olyan csuka, ami megfelelne az aktuális szűrőknek.
                    Érdemes lazítani egy feltételen (pl. márka vagy pályatípus).
                  </StateBox>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ------------------------------------------------------------
function FilterGroup({ title, options, value, onChange, labelFor }) {
  return (
    <div className="mb-4">
      <p className="mb-2 text-[11px] uppercase tracking-wide text-gray-400">
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

function BootCard({ boot, tab }) {
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
        <p className="mb-2 text-[11px] text-gray-300">
          {boot.line_name} • {SURFACE_LABELS[boot.surface] || boot.surface} • {boot.tier}
        </p>

        {boot.min_price && (
          <div className="mt-3 rounded-2xl bg-black/70 p-3 ring-1 ring-white/5">
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
          to={`/webshop/${boot.brand_slug}/${boot.slug}`}
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
    : "border-white/10 bg-black/70 text-gray-300";

  return (
    <div className={`col-span-full rounded-2xl border p-6 text-sm ${cls}`}>
      {children}
    </div>
  );
}
