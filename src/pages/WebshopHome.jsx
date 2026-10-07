// ============================================================
// Webshop főoldal
// src/pages/WebshopHome.jsx
// ============================================================

import React, { useState } from "react";
import { Link } from "react-router-dom";

import { api, useApi } from "../lib/api";
import { SURFACE_LABELS } from "../data/brandConfig";
import BootCard from "../components/BootCard";
import {
  TabBar,
  FilterGroup,
  Button,
  SkeletonGrid,
  EmptyState,
  ErrorState,
  StaggerList,
  StaggerItem,
} from "../components/ui";

import NikeCard from "../assets/brands/nike.jpg";
import AdidasCard from "../assets/brands/adidas.jpg";
import PumaCard from "../assets/brands/puma.jpg";

const BRAND_CARDS = [
  { slug: "nike", name: "Nike", image: NikeCard, lines: "Mercurial, Phantom, Tiempo" },
  { slug: "adidas", name: "Adidas", image: AdidasCard, lines: "Predator, X, Copa" },
  { slug: "puma", name: "Puma", image: PumaCard, lines: "Ultra, Future, King" },
];

const TABS = [
  ["top", "Népszerű"],
  ["new", "Újdonság"],
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
  const [filtersOpen, setFiltersOpen] = useState(false);

  const { data: boots, loading, error } = useApi(
    () => api.boots({ tab, brand, tier, surface, size }),
    [tab, brand, tier, surface, size]
  );

  const activeFilters = [brand, tier, surface, size].filter((v) => v !== "all").length;

  const resetFilters = () => {
    setBrand("all");
    setTier("all");
    setSurface("all");
    setSize("all");
  };

  return (
    <div className="mx-auto max-w-7xl px-4 pb-28 pt-12 sm:px-6">
      {/* ---------- Fejléc ---------- */}
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div>
          <h1 className="text-white">Futballcipők</h1>
          <p className="prose-narrow mt-3 text-gray-400">
            Partnerek árait hasonlítjuk össze. A vásárlás a partner oldalán
            történik.
          </p>
        </div>

        <Link
          to="/bootsfinder"
          className="rounded-xl border border-white/15 px-5 py-2.5 font-medium text-gray-200 transition-all duration-200 hover:border-indigo-400/60 hover:bg-white/5 hover:text-white"
        >
          Segítség a választáshoz
        </Link>
      </div>

      {/* ---------- Márkák ---------- */}
      <div className="scroll-x mb-16 flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-3 md:overflow-visible">
        {BRAND_CARDS.map((card) => (
          <Link
            key={card.slug}
            to={`/webshop/${card.slug}`}
            className="group relative h-64 min-w-[80vw] overflow-hidden rounded-3xl md:min-w-0"
          >
            <img
              src={card.image}
              alt=""
              className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-300 group-hover:-translate-y-1">
              <h2 className="text-white">{card.name}</h2>
              <p className="mt-1 text-gray-400">{card.lines}</p>
            </div>
          </Link>
        ))}
      </div>

      {/* ---------- Válogatás ---------- */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <TabBar tabs={TABS} value={tab} onChange={setTab} idPrefix="shop" />

        <div className="flex items-center gap-4">
          {!loading && !error && boots && (
            <p className="text-meta text-gray-500">{boots.length} találat</p>
          )}

          <Button
            variant="secondary"
            onClick={() => setFiltersOpen((v) => !v)}
            className="lg:hidden"
          >
            Szűrők{activeFilters > 0 ? ` (${activeFilters})` : ""}
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-7 lg:flex-row">
        {/* ---------- Szűrők ---------- */}
        <aside
          className={`surface-raised w-full shrink-0 p-6 lg:w-72 ${
            filtersOpen ? "block" : "hidden"
          } lg:block`}
        >
          <div className="mb-5 flex items-center justify-between">
            <h4 className="text-white">Szűrők</h4>
            {activeFilters > 0 && (
              <Button variant="ghost" onClick={resetFilters} className="px-0 py-0">
                Törlés
              </Button>
            )}
          </div>

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
            title="Kategória"
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
            title="Méret"
            options={SIZES}
            value={size}
            onChange={setSize}
            labelFor={(v) => (v === "all" ? "Mind" : v)}
          />
        </aside>

        {/* ---------- Találatok ---------- */}
        <div className="flex-1">
          {loading && (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              <SkeletonGrid count={6} />
            </div>
          )}

          {error && <ErrorState>{error}</ErrorState>}

          {!loading && !error && boots.length > 0 && (
            <StaggerList
              key={`${tab}-${brand}-${tier}-${surface}-${size}`}
              className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            >
              {boots.map((boot) => (
                <StaggerItem key={boot.slug}>
                  <BootCard boot={boot} tab={tab} />
                </StaggerItem>
              ))}
            </StaggerList>
          )}

          {!loading && !error && boots.length === 0 && (
            <EmptyState
              title="Nincs találat"
              action={
                activeFilters > 0 && (
                  <Button variant="secondary" onClick={resetFilters}>
                    Szűrők törlése
                  </Button>
                )
              }
            >
              Próbálj meg lazítani egy feltételen – például a pályatípuson vagy
              a méreten.
            </EmptyState>
          )}
        </div>
      </div>
    </div>
  );
}
