// src/pages/PumaPage.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import PumaImg1 from "../assets/brands/puma.jpg";
import PumaImg2 from "../assets/brands/fut.jpg";
import PumaImg3 from "../assets/brands/king.jpg";

// --- DEMÓ ADATOK – PUMA CSUKÁK ---

const pumaBoots = [
  {
    slug: "ultra-ultimate-fg",
    name: "Ultra Ultimate FG",
    line: "Ultra",
    tagline: "Villámgyors speed csuka a széleken futóknak.",
    pitch: "FG – füves",
    tier: "Elite",
    surface: "FG",
    image: PumaImg1,
    highlights: ["speed"],
    cheapestPartner: {
      name: "SpeedBoots",
      price: "109 990 Ft",
      note: "Leggyorsabb szállítás",
    },
    popularPartner: {
      name: "BootStore",
      price: "111 990 Ft",
      note: "Népszerű választás",
    },
    newPartner: null,
    salePartner: {
      name: "PartnerSport",
      price: "104 990 Ft",
      note: "Akció – kb. -5 000 Ft",
    },
  },
  {
    slug: "ultra-pro-fg",
    name: "Ultra Pro FG",
    line: "Ultra",
    tagline: "Könnyű, agresszív talpmintával – elérhetőbb áron.",
    pitch: "FG – füves",
    tier: "Pro",
    surface: "FG",
    image: PumaImg1,
    highlights: ["speed"],
    cheapestPartner: {
      name: "PartnerSport",
      price: "94 990 Ft",
      note: "Jó ár-érték arány",
    },
    popularPartner: null,
    newPartner: {
      name: "CsukaShop",
      price: "96 990 Ft",
      note: "Új modell a kínálatban",
    },
    salePartner: null,
  },
  {
    slug: "future-ultimate-fg",
    name: "Future Ultimate FG",
    line: "Future",
    tagline: "Rugalmas felsőrész, kötésmentes érzet – technikás játékosoknak.",
    pitch: "FG – füves",
    tier: "Elite",
    surface: "FG",
    image: PumaImg2,
    highlights: ["agility"],
    cheapestPartner: {
      name: "BootStore",
      price: "114 990 Ft",
      note: "Stabil, megbízható ár",
    },
    popularPartner: {
      name: "PartnerSport",
      price: "116 990 Ft",
      note: "Sok visszatérő rendelés",
    },
    newPartner: null,
    salePartner: null,
  },
  {
    slug: "king-ultimate-fg",
    name: "King Ultimate FG",
    line: "King",
    tagline: "Modernizált klasszikus – tiszta labdaérzet és komfort.",
    pitch: "FG – füves",
    tier: "Elite",
    surface: "FG",
    image: PumaImg3,
    highlights: ["classic"],
    cheapestPartner: {
      name: "ClassicBoots",
      price: "104 990 Ft",
      note: "Klasszikus vonal kedvező áron",
    },
    popularPartner: null,
    newPartner: {
      name: "BootStore",
      price: "106 990 Ft",
      note: "Frissített verzió",
    },
    salePartner: null,
  },
];

function getHighlightPartner(boot, sortMode) {
  if (sortMode === "sale" && boot.salePartner) {
    return { badge: "Akciós", ...boot.salePartner };
  }
  if (sortMode === "new" && boot.newPartner) {
    return { badge: "Új", ...boot.newPartner };
  }
  if (sortMode === "popular" && boot.popularPartner) {
    return { badge: "Legnépszerűbb", ...boot.popularPartner };
  }
  if (boot.cheapestPartner) {
    return { badge: "Legjobb ár", ...boot.cheapestPartner };
  }
  return null;
}

export default function PumaPage() {
  const [sortMode, setSortMode] = useState("popular");
  const [lineFilter, setLineFilter] = useState("all");
  const [surfaceFilter, setSurfaceFilter] = useState("all");
  const [tierFilter, setTierFilter] = useState("all");
  const filterSectionRef = useRef(null);

  const handleTopCardClick = (lineLabel) => {
    setLineFilter(lineLabel);
    if (filterSectionRef.current) {
      filterSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const filteredBoots = pumaBoots.filter((boot) => {
    const lineOk = lineFilter === "all" || boot.line === lineFilter;
    const surfaceOk = surfaceFilter === "all" || boot.surface === surfaceFilter;
    const tierOk = tierFilter === "all" || boot.tier === tierFilter;
    return lineOk && surfaceOk && tierOk;
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
              Webshop • Adidas Futballcipők
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


          {/* 3 nagy kártya */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Ultra */}
            <button
              type="button"
              onClick={() => handleTopCardClick("Ultra")}
              className="group relative flex overflow-hidden rounded-3xl bg-neutral-900/60 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="relative w-full">
                <img
                  src={PumaImg1}
                  alt="Puma Ultra"
                  className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-sky-100/80">
                    Speed
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">Ultra</h3>
                  <span className="mt-3 text-sm font-medium text-sky-100/80 group-hover:text-amber-200">
                    Ultra modellek szűrése ↓
                  </span>
                </div>
              </div>
            </button>

            {/* Future */}
            <button
              type="button"
              onClick={() => handleTopCardClick("Future")}
              className="group relative flex overflow-hidden rounded-3xl bg-neutral-900/60 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="relative w-full">
                <img
                  src={PumaImg2}
                  alt="Puma Future"
                  className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-100/80">
                    Agility & Touch
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">Future</h3>
                  <span className="mt-3 text-sm font-medium text-cyan-100/80 group-hover:text-cyan-200">
                    Future modellek szűrése ↓
                  </span>
                </div>
              </div>
            </button>

            {/* King */}
            <button
              type="button"
              onClick={() => handleTopCardClick("King")}
              className="group relative flex overflow-hidden rounded-3xl bg-neutral-900/60 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="relative w-full">
                <img
                  src={PumaImg3}
                  alt="Puma King"
                  className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-100/80">
                    Classic & Comfort
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">King</h3>
                  <span className="mt-3 text-sm font-medium text-amber-100/80 group-hover:text-amber-200">
                    King modellek szűrése ↓
                  </span>
                </div>
              </div>
            </button>
          </div>
          </div>
        </section>

        {/* Válogatás & szűrők + csempék */}
        <section
          ref={filterSectionRef}
          className="mx-auto max-w-6xl px-4 pb-20 pt-10"
        >
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
                      ? "bg-sky-500 text-white shadow-lg shadow-sky-500/40"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Szűrő – Puma-fókuszú */}
            <aside className="w-full rounded-3xl border border-white/10 bg-black/50 p-4 text-xs text-gray-200 shadow-[0_18px_45px_rgba(0,0,0,0.7)] lg:w-72">
              <h3 className="mb-3 text-sm font-semibold text-white">Szűrők</h3>

              {/* Vonal */}
              <div className="mb-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Vonal
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["all", "Ultra", "Future", "King"].map((value) => (
                    <button
                      key={value}
                      onClick={() => setLineFilter(value)}
                      className={`rounded-full border px-3 py-1 text-[11px] transition ${
                        lineFilter === value
                          ? "border-sky-400 bg-sky-500/20 text-sky-200"
                          : "border-white/10 bg-white/5 text-gray-300 hover:border-sky-300/60"
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
                          ? "border-sky-400 bg-sky-500/20 text-sky-200"
                          : "border-white/10 bg-white/5 text-gray-300 hover:border-sky-300/60"
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
                          ? "border-sky-400 bg-sky-500/20 text-sky-200"
                          : "border-white/10 bg-white/5 text-gray-300 hover:border-sky-300/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-2 text-[11px] text-gray-500">
                Demo szűrők – később valódi Puma-kínálatra csatlakoztatva.
              </p>
            </aside>

            {/* Csempék */}
            <div className="grid flex-1 gap-4 md:grid-cols-2">
              {filteredBoots.map((boot) => {
                const highlight = getHighlightPartner(boot, sortMode);

                return (
                  <article
                    key={boot.slug}
                    className="flex flex-col justify-between rounded-2xl border border-white/12 bg-neutral-900/85 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)]"
                  >
                    <div>
                      <div className="mb-2 flex items-center justify-between text-xs">
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-200">
                          {boot.line}
                        </span>
                        <span className="rounded-full bg-sky-500/20 px-2 py-0.5 text-[11px] text-sky-200">
                          Puma
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold">{boot.name}</h3>
                      <p className="mt-1 text-xs text-gray-300">
                        {boot.tagline}
                      </p>

                      <p className="mt-2 text-[11px] text-gray-400">
                        Felület:{" "}
                        <span className="text-gray-200">{boot.pitch}</span> •{" "}
                        Szint:{" "}
                        <span className="text-gray-200">{boot.tier}</span>
                      </p>

                      {highlight && (
                        <div className="mt-3 rounded-2xl bg-black/40 px-3 py-2 text-[11px]">
                          <p className="font-semibold text-sky-300">
                            {highlight.badge}: {highlight.name}
                          </p>
                          <p className="text-gray-100">{highlight.price}</p>
                          <p className="text-gray-400">{highlight.note}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-sky-300 font-semibold">
                        Demo ár: 90 000 – 125 000 Ft
                      </span>
                      <Link
                        to={`/webshop/puma/${boot.slug}`}
                        className="rounded-full border border-sky-400/70 bg-sky-500/20 px-3 py-1 text-[11px] font-semibold text-sky-100 hover:bg-sky-500/35 transition"
                      >
                        Részletek & típusok →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          <p className="mt-6 text-[11px] text-gray-500">
            Demo felület – később valós Puma-partnerek áraival és elérhetőségével
            dolgozna a FootballHu.
          </p>
        </section>
      </div>
  );
}
