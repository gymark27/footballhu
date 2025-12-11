// src/pages/NikePage.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import NikeImg1 from "../assets/brands/mercurial.jpg";
import NikeImg2 from "../assets/brands/phantom.jpg";
import NikeImg3 from "../assets/brands/tiempo.jpg";
// --- DEMÓ ADATOK – NIKES CUKÁK ---

const nikeBoots = [
  {
    slug: "phantom-gx-elite-fg",
    name: "Phantom GX Elite FG",
    line: "Phantom",
    tagline: "Irányítóknak, tech-touch játékhoz.",
    pitch: "FG – füves",
    tier: "Elite",
    surface: "FG",
    image: NikeImg2,
    highlights: ["control", "tech"],
    cheapestPartner: {
      name: "BootStore",
      price: "109 990 Ft",
      note: "Legjobb ár, gyors szállítás",
    },
    popularPartner: {
      name: "PartnerSport",
      price: "112 990 Ft",
      note: "Legtöbb eladás",
    },
    newPartner: {
      name: "CsukaShop",
      price: "114 990 Ft",
      note: "Új modell a kínálatban",
    },
    salePartner: null,
  },
  {
    slug: "mercurial-vapor-elite-fg",
    name: "Mercurial Vapor Elite FG",
    line: "Mercurial",
    tagline: "Szélsőknek, akik sebességből élnek.",
    pitch: "FG – füves",
    tier: "Elite",
    surface: "FG",
    image: NikeImg1,
    highlights: ["speed"],
    cheapestPartner: {
      name: "BootStore",
      price: "104 990 Ft",
      note: "Jelenleg a legolcsóbb",
    },
    popularPartner: {
      name: "SpeedBoots",
      price: "109 990 Ft",
      note: "Fast-shipping vonal",
    },
    newPartner: null,
    salePartner: {
      name: "PartnerSport",
      price: "99 990 Ft",
      note: "Akció – kb. -10 000 Ft",
    },
  },
  {
    slug: "tiempo-legend-elite-fg",
    name: "Tiempo Legend Elite FG",
    line: "Tiempo",
    tagline: "Klasszikus bőrös érzés, modern technikával.",
    pitch: "FG – füves",
    tier: "Elite",
    surface: "FG",
    image: NikeImg2,
    highlights: ["classic"],
    cheapestPartner: {
      name: "BootStore",
      price: "94 990 Ft",
      note: "Stabil, megbízható ár",
    },
    popularPartner: null,
    newPartner: {
      name: "ClassicBoots",
      price: "96 990 Ft",
      note: "Új verzió érkezett",
    },
    salePartner: null,
  },
  {
    slug: "phantom-gx-pro-ag",
    name: "Phantom GX Pro AG",
    line: "Phantom",
    tagline: "Műfűre optimalizált, könnyű kontroll.",
    pitch: "AG – műfüves",
    tier: "Pro",
    surface: "AG",
    image: NikeImg1,
    highlights: ["control", "ag"],
    cheapestPartner: {
      name: "BootStore",
      price: "79 990 Ft",
      note: "AG-re a legjobb ár",
    },
    popularPartner: {
      name: "PartnerSport",
      price: "82 990 Ft",
      note: "Népszerű a műfüves pályákon",
    },
    newPartner: null,
    salePartner: {
      name: "CsukaShop",
      price: "74 990 Ft",
      note: "AG akció – limitált ideig",
    },
  },
];

// Segédfüggvény: melyik partner jelenjen meg az aktuális nézetben?
function getHighlightPartner(boot, sortMode) {
  if (sortMode === "sale") return boot.salePartner || boot.cheapestPartner;
  if (sortMode === "popular") return boot.popularPartner || boot.cheapestPartner;
  if (sortMode === "new") return boot.newPartner || boot.cheapestPartner;

  // "Összes" esetben a legjobb általános ajánlat
  return boot.cheapestPartner || boot.popularPartner || boot.salePartner;
}

export default function NikePage() {
  const [sortMode, setSortMode] = useState("popular"); // "popular" | "new" | "sale" | "all"
  const [lineFilter, setLineFilter] = useState("all"); // Mercurial / Phantom / Tiempo
  const [surfaceFilter, setSurfaceFilter] = useState("all"); // FG / AG / TF
  const [tierFilter, setTierFilter] = useState("all"); // Elite / Pro

  // ide görgetünk, ha felül ráklikkelnek egy kártyára
  const filterSectionRef = useRef(null);

  const scrollToFilters = () => {
    if (filterSectionRef.current) {
      filterSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleTopCardClick = (line) => {
    setLineFilter(line);
    scrollToFilters();
  };

  const filteredBoots = nikeBoots.filter((boot) => {
    if (lineFilter !== "all" && boot.line !== lineFilter) return false;
    if (surfaceFilter !== "all" && boot.surface !== surfaceFilter) return false;
    if (tierFilter !== "all" && boot.tier !== tierFilter) return false;

    if (sortMode === "sale" && !boot.salePartner) return false;
    if (sortMode === "popular" && !boot.popularPartner) return false;
    if (sortMode === "new" && !boot.newPartner) return false;

    return true;
  });

  return (
    <div className="bg-neutral-950 text-white">
      {/* Felső szakasz – márka kártyák + BootsFinder gomb */}
      <section className="relative bg-gradient-to-b from-neutral-950 via-neutral-950 to-black pb-12 pt-10">
        {/* Glow háttér */}
        <div className="pointer-events-none absolute -right-40 top-10 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-40 bottom-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4">
          {/* BootsFinder pill a jobb felső sarokban */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-2">
              Webshop • Nike Futballcipők
            </p>
          </div>

          <Link
  to="/bootsfinder"
  className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-sm font-semibold
             shadow-[0_0_25px_rgba(255,255,255,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.55)]
             transition hover:-translate-y-0.5"
>
  BootsFinder – segítség a választáshoz ↗
</Link>

        </div>

          {/* 3 nagy kártya képes háttérrel */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Mercurial */}
            <button
              type="button"
              onClick={() => handleTopCardClick("Mercurial")}
              className="group relative flex overflow-hidden rounded-3xl bg-neutral-900/60 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="relative w-full">
                <img
                  src={NikeImg1}
                  alt="Nike Mercurial"
                  className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-indigo-100/80">
                    Speed & Precision
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">Mercurial</h3>
                  <span className="mt-3 text-sm font-medium text-indigo-100/80 group-hover:text-amber-200">
                    Mercurial modellek szűrése ↓
                  </span>
                </div>
              </div>
            </button>

            {/* Phantom */}
            <button
              type="button"
              onClick={() => handleTopCardClick("Phantom")}
              className="group relative flex overflow-hidden rounded-3xl bg-neutral-900/60 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="relative w-full">
                <img
                  src={NikeImg2}
                  alt="Nike Phantom"
                  className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100/80">
                    Control & Vision
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">Phantom</h3>
                  <span className="mt-3 text-sm font-medium text-emerald-100/80 group-hover:text-emerald-200">
                    Phantom modellek szűrése ↓
                  </span>
                </div>
              </div>
            </button>

            {/* Tiempo */}
            <button
              type="button"
              onClick={() => handleTopCardClick("Tiempo")}
              className="group relative flex overflow-hidden rounded-3xl bg-neutral-900/60 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="relative w-full">
                <img
                  src={NikeImg3}
                  alt="Nike Tiempo"
                  className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-100/80">
                    Classic & Comfort
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">Tiempo</h3>
                  <span className="mt-3 text-sm font-medium text-fuchsia-100/80 group-hover:text-sky-200">
                    Tiempo modellek szűrése ↓
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </section>

      {/* Válogatás & szűrők + csempék – csak Nike modellek */}
      <section
        ref={filterSectionRef}
        className="mx-auto max-w-6xl px-4 pb-20 pt-10"
      >
        {/* Sort pill-ek */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold">Válogatás szerint</h2>
          <div className="flex flex-wrap gap-2 text-xs">
            {[
              { id: "popular", label: "Legnépszerűbb" },
              { id: "new", label: "Legújabb" },
              { id: "sale", label: "Akciós" },
              { id: "all", label: "Összes" },
            ].map((mode) => (
              <button
                key={mode.id}
                onClick={() => setSortMode(mode.id)}
                className={`rounded-full px-4 py-1.5 transition ${
                  sortMode === mode.id
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
          {/* Szűrő – kompakt, Nike-fókuszú */}
          <aside className="w-full rounded-3xl border border-white/10 bg-black/50 p-4 text-xs text-gray-200 shadow-[0_18px_45px_rgba(0,0,0,0.7)] lg:w-72">
            <h3 className="mb-3 text-sm font-semibold text-white">Szűrők</h3>

            {/* Vonal */}
            <div className="mb-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Vonal
              </p>
              <div className="flex flex-wrap gap-1.5">
                {["all", "Mercurial", "Phantom", "Tiempo"].map((value) => (
                  <button
                    key={value}
                    onClick={() => setLineFilter(value)}
                    className={`rounded-full border px-3 py-1 text-[11px] transition ${
                      lineFilter === value
                        ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                        : "border-white/10 bg-white/5 text-gray-300 hover:border-indigo-300/60"
                    }`}
                  >
                    {value === "all" ? "Mind" : value}
                  </button>
                ))}
              </div>
            </div>

            {/* Pályatípus */}
            <div className="mb-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Pályatípus
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "Mind" },
                  { id: "FG", label: "FG – füves" },
                  { id: "AG", label: "AG – műfüves" },
                  { id: "TF", label: "TF – kispálya" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSurfaceFilter(opt.id)}
                    className={`rounded-full border px-3 py-1 text-[11px] transition ${
                      surfaceFilter === opt.id
                        ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                        : "border-white/10 bg-white/5 text-gray-300 hover:border-indigo-300/60"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Szint */}
            <div className="mb-4">
              <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                Szint
              </p>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { id: "all", label: "Mind" },
                  { id: "Elite", label: "Elite" },
                  { id: "Pro", label: "Pro" },
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setTierFilter(opt.id)}
                    className={`rounded-full border px-3 py-1 text-[11px] transition ${
                      tierFilter === opt.id
                        ? "border-indigo-400 bg-indigo-500/20 text-indigo-200"
                        : "border-white/10 bg-white/5 text-gray-300 hover:border-indigo-300/60"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <p className="mt-3 text-[11px] text-gray-500">
              A szűrők egyelőre csak vizuális demóként működnek – a tényleges
              adatbázis-kapcsolat később kerülne be.
            </p>
          </aside>

          {/* Csempék – szélesebb, partner logikával */}
          <div className="flex-1">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {filteredBoots.map((boot) => {
                const partner = getHighlightPartner(boot, sortMode);

                return (
                  <article
                    key={boot.slug}
                    className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black/70 to-black/90 p-4 text-xs shadow-[0_18px_45px_rgba(0,0,0,0.8)]"
                  >
                    <div>
                      <p className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wide text-gray-400">
                        <span>Nike • {boot.line}</span>
                        {sortMode === "sale" && boot.salePartner && (
                          <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-200">
                            Akciós
                          </span>
                        )}
                        {sortMode === "popular" && boot.popularPartner && (
                          <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-200">
                            Best seller
                          </span>
                        )}
                        {sortMode === "new" && boot.newPartner && (
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
                            Új modell
                          </span>
                        )}
                      </p>

                      <h3 className="mb-1 text-sm font-semibold text-white">
                        {boot.name}
                      </h3>
                      <p className="mb-2 text-[11px] text-gray-300">
                        {boot.tagline}
                      </p>

                      <p className="mb-1 text-[11px] text-gray-400">
                        {boot.pitch} • {boot.tier}
                      </p>

                      {partner && (
                        <div className="mt-3 rounded-2xl bg-black/60 p-3 ring-1 ring-white/5">
                          <p className="text-[11px] uppercase tracking-wide text-gray-400">
                            Partner ajánlat
                          </p>
                          <p className="mt-1 text-xs font-semibold text-white">
                            {partner.name}
                          </p>
                          <p className="mt-1 text-base font-semibold text-amber-300">
                            {partner.price}
                          </p>
                          {partner.note && (
                            <p className="mt-1 text-[11px] text-gray-400">
                              {partner.note}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <Link
                        to={`/webshop/nike/${boot.slug}`}
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-indigo-500 px-3 py-2 text-[11px] font-semibold text-white shadow-lg shadow-indigo-500/40 transition group-hover:bg-indigo-400"
                      >
                        Részletek &amp; típusok →
                      </Link>
                    </div>
                  </article>
                );
              })}

              {filteredBoots.length === 0 && (
                <div className="col-span-full rounded-2xl border border-white/10 bg-black/60 p-6 text-sm text-gray-300">
                  Nincs olyan Nike modell, ami megfelelne az aktuális szűrőknek.
                  Érdemes lazítani egy feltételen (pl. pályatípus vagy szint).
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
