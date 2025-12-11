// src/pages/AdidasPage.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

import AdidasImg1 from "../assets/brands/adidas.jpg";
import AdidasImg2 from "../assets/brands/f50.jpg";
import AdidasImg3 from "../assets/brands/copa.jpg";

// --- DEMÓ ADATOK – ADIDAS CSUKÁK ---

const adidasBoots = [
  {
    slug: "predator-elite-fg",
    name: "Predator Elite FG",
    line: "Predator",
    tagline: "Kontrollra hangolva irányítóknak és lövőspecialistáknak.",
    pitch: "FG – füves",
    tier: "Elite",
    surface: "FG",
    image: AdidasImg1,
    highlights: ["control", "power"],
    cheapestPartner: {
      name: "BootStore",
      price: "114 990 Ft",
      note: "Stabil, megbízható ár",
    },
    popularPartner: {
      name: "PartnerSport",
      price: "116 990 Ft",
      note: "Legtöbb eladás",
    },
    newPartner: null,
    salePartner: null,
  },
  {
    slug: "predator-pro-fg",
    name: "Predator Pro FG",
    line: "Predator",
    tagline: "Tapadás és erő, elérhetőbb áron.",
    pitch: "FG – füves",
    tier: "Pro",
    surface: "FG",
    image: AdidasImg1,
    highlights: ["control"],
    cheapestPartner: {
      name: "PartnerSport",
      price: "99 990 Ft",
      note: "Jó ár-érték arány",
    },
    popularPartner: null,
    newPartner: {
      name: "CsukaShop",
      price: "101 990 Ft",
      note: "Új modell, friss készlet",
    },
    salePartner: null,
  },
  {
    slug: "x-crazyfast-elite-fg",
    name: "X Crazyfast Elite FG",
    line: "X",
    tagline: "Extrém könnyű speed csuka szélsőknek, csatároknak.",
    pitch: "FG – füves",
    tier: "Elite",
    surface: "FG",
    image: AdidasImg2,
    highlights: ["speed"],
    cheapestPartner: {
      name: "SpeedBoots",
      price: "124 990 Ft",
      note: "Leggyorsabb szállítás",
    },
    popularPartner: {
      name: "BootStore",
      price: "126 990 Ft",
      note: "Népszerű választás",
    },
    newPartner: null,
    salePartner: {
      name: "PartnerSport",
      price: "119 990 Ft",
      note: "Akció – kb. -5 000 Ft",
    },
  },
  {
    slug: "copa-pure-elite-fg",
    name: "Copa Pure Elite FG",
    line: "Copa",
    tagline: "Puha bőrös érzet, klasszikus kontroll.",
    pitch: "FG – füves",
    tier: "Elite",
    surface: "FG",
    image: AdidasImg3,
    highlights: ["classic"],
    cheapestPartner: {
      name: "ClassicBoots",
      price: "109 990 Ft",
      note: "Klasszikus vonal kedvező áron",
    },
    popularPartner: null,
    newPartner: {
      name: "BootStore",
      price: "112 990 Ft",
      note: "Új széria érkezett",
    },
    salePartner: null,
  },
];

// kiemelt partner a válogatás mód alapján
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

export default function AdidasPage() {
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

  const filteredBoots = adidasBoots.filter((boot) => {
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

          {/* 3 nagy kártya képes háttérrel */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Predator */}
            <button
              type="button"
              onClick={() => handleTopCardClick("Predator")}
              className="group relative flex overflow-hidden rounded-3xl bg-neutral-900/60 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="relative w-full">
                <img
                  src={AdidasImg1}
                  alt="Adidas Predator"
                  className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100/80">
                    Control & Power
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">Predator</h3>
                  <span className="mt-3 text-sm font-medium text-emerald-100/80 group-hover:text-emerald-200">
                    Predator modellek szűrése ↓
                  </span>
                </div>
              </div>
            </button>

            {/* X */}
            <button
              type="button"
              onClick={() => handleTopCardClick("X")}
              className="group relative flex overflow-hidden rounded-3xl bg-neutral-900/60 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="relative w-full">
                <img
                  src={AdidasImg2}
                  alt="Adidas X"
                  className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-lime-100/80">
                    Speed
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">X Crazyfast</h3>
                  <span className="mt-3 text-sm font-medium text-lime-100/80 group-hover:text-lime-200">
                    X modellek szűrése ↓
                  </span>
                </div>
              </div>
            </button>

            {/* Copa */}
            <button
              type="button"
              onClick={() => handleTopCardClick("Copa")}
              className="group relative flex overflow-hidden rounded-3xl bg-neutral-900/60 ring-1 ring-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.8)] text-left"
            >
              <div className="relative w-full">
                <img
                  src={AdidasImg3}
                  alt="Adidas Copa"
                  className="h-64 w-full object-cover opacity-80 transition duration-700 group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-emerald-100/80">
                    Classic Feel
                  </p>
                  <h3 className="mt-2 text-xl font-semibold">Copa</h3>
                  <span className="mt-3 text-sm font-medium text-emerald-100/80 group-hover:text-emerald-200">
                    Copa modellek szűrése ↓
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
                      ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/40"
                      : "bg-white/5 text-gray-300 hover:bg-white/10"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6 lg:flex-row">
            {/* Szűrő – Adidas-fókuszú */}
            <aside className="w-full rounded-3xl border border-white/10 bg-black/50 p-4 text-xs text-gray-200 shadow-[0_18px_45px_rgba(0,0,0,0.7)] lg:w-72">
              <h3 className="mb-3 text-sm font-semibold text-white">Szűrők</h3>

              {/* Vonal */}
              <div className="mb-4">
                <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400">
                  Vonal
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {["all", "Predator", "X", "Copa"].map((value) => (
                    <button
                      key={value}
                      onClick={() => setLineFilter(value)}
                      className={`rounded-full border px-3 py-1 text-[11px] transition ${
                        lineFilter === value
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                          : "border-white/10 bg-white/5 text-gray-300 hover:border-emerald-300/60"
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
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                          : "border-white/10 bg-white/5 text-gray-300 hover:border-emerald-300/60"
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
                          ? "border-emerald-400 bg-emerald-500/20 text-emerald-200"
                          : "border-white/10 bg-white/5 text-gray-300 hover:border-emerald-300/60"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <p className="mt-2 text-[11px] text-gray-500">
                A szűrők egyelőre demo jellegűek – a tényleges adatbázis-kapcsolat
                később kerülne be.
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
                        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[11px] text-emerald-200">
                          Adidas
                        </span>
                      </div>

                      <h3 className="text-sm font-semibold">{boot.name}</h3>
                      <p className="mt-1 text-xs text-gray-300">
                        {boot.tagline}
                      </p>

                      <p className="mt-2 text-[11px] text-gray-400">
                        Felület:{" "}
                        <span className="text-gray-200">{boot.pitch}</span> •
                        {"  "}
                        Szint:{" "}
                        <span className="text-gray-200">{boot.tier}</span>
                      </p>

                      {highlight && (
                        <div className="mt-3 rounded-2xl bg-black/40 px-3 py-2 text-[11px]">
                          <p className="font-semibold text-emerald-300">
                            {highlight.badge}: {highlight.name}
                          </p>
                          <p className="text-gray-100">{highlight.price}</p>
                          <p className="text-gray-400">{highlight.note}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between text-xs">
                      <span className="text-emerald-300 font-semibold">
                        Demo ár: 95 000 – 130 000 Ft
                      </span>
                      <Link
                        to={`/webshop/adidas/${boot.slug}`}
                        className="rounded-full border border-emerald-400/70 bg-emerald-500/20 px-3 py-1 text-[11px] font-semibold text-emerald-100 hover:bg-emerald-500/35 transition"
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
            Minden adat demo jellegű – koncepció- és partnerbemutatóhoz. Valós
            integrációnál a FootballHu közvetlenül a márka vagy hivatalos
            viszonteladók adataira épülne.
          </p>
        </section>
      </div>
    
  );
}
