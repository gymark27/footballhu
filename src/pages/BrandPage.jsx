// ============================================================
// Márkaoldal
// src/pages/BrandPage.jsx
// ============================================================

import React, { useState, useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";

import { api, useApi } from "../lib/api";
import { BRAND_CONFIG, SURFACE_LABELS } from "../data/brandConfig";
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

const TABS = [
  ["top", "Népszerű"],
  ["new", "Újdonság"],
  ["sale", "Akciós"],
  ["all", "Összes"],
];

const SURFACES = ["all", "FG", "AG", "TF"];
const TIERS = ["all", "Elite", "Pro"];

export default function BrandPage() {
  const { brand } = useParams();
  const config = BRAND_CONFIG[brand];

  const [tab, setTab] = useState("top");
  const [line, setLine] = useState("all");
  const [surface, setSurface] = useState("all");
  const [tier, setTier] = useState("all");

  const resultsRef = useRef(null);

  const { data: boots, loading, error } = useApi(
    () => api.boots({ brand, tab, surface, tier }),
    [brand, tab, surface, tier]
  );

  if (!config) return <Navigate to="/webshop" replace />;

  const visible = (boots || []).filter((b) => line === "all" || b.line_name === line);
  const activeFilters = [line, surface, tier].filter((v) => v !== "all").length;

  const resetFilters = () => {
    setLine("all");
    setSurface("all");
    setTier("all");
  };

  const selectLine = (name) => {
    setLine(name);
    resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-28 pt-12">
      {/* ---------- Fejléc ---------- */}
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div>
          <Link
            to="/webshop"
            className="text-meta text-gray-500 transition-colors hover:text-gray-300"
          >
            Webshop
          </Link>
          <h1 className="mt-2 text-white">{config.label}</h1>
        </div>

        <Link
          to="/bootsfinder"
          className="rounded-xl border border-white/15 px-5 py-2.5 font-medium text-gray-200 transition-all duration-200 hover:border-indigo-400/60 hover:bg-white/5 hover:text-white"
        >
          Segítség a választáshoz
        </Link>
      </div>

      {/* ---------- Modellcsaládok ---------- */}
      <div className="mb-16 grid gap-5 md:grid-cols-3">
        {config.lines.map((item) => {
          const active = line === item.name;

          return (
            <button
              key={item.name}
              onClick={() => selectLine(item.name)}
              aria-pressed={active}
              className={`group relative h-56 overflow-hidden rounded-3xl text-left transition-all duration-300 ${
                active ? "ring-2 ring-indigo-400" : "hover:ring-1 hover:ring-white/25"
              }`}
            >
              <img
                src={item.image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6 transition-transform duration-300 group-hover:-translate-y-1">
                <h2 className="text-white">{item.name}</h2>
                <p className="mt-1 text-gray-400">{item.kicker}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* ---------- Válogatás ---------- */}
      <div
        ref={resultsRef}
        className="mb-6 flex flex-wrap items-center justify-between gap-4"
      >
        <TabBar tabs={TABS} value={tab} onChange={setTab} idPrefix="brand" />

        {!loading && !error && (
          <p className="text-meta text-gray-500">{visible.length} találat</p>
        )}
      </div>

      <div className="flex flex-col gap-7 lg:flex-row">
        <aside className="surface-raised w-full shrink-0 p-6 lg:w-64">
          <div className="mb-5 flex items-center justify-between">
            <h4 className="text-white">Szűrők</h4>
            {activeFilters > 0 && (
              <Button variant="ghost" onClick={resetFilters} className="px-0 py-0">
                Törlés
              </Button>
            )}
          </div>

          <FilterGroup
            title="Modellcsalád"
            options={["all", ...config.lines.map((l) => l.name)]}
            value={line}
            onChange={setLine}
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
            title="Kategória"
            options={TIERS}
            value={tier}
            onChange={setTier}
            labelFor={(v) => (v === "all" ? "Mind" : v)}
          />
        </aside>

        <div className="flex-1">
          {loading && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <SkeletonGrid count={6} />
            </div>
          )}

          {error && <ErrorState>{error}</ErrorState>}

          {!loading && !error && visible.length > 0 && (
            <StaggerList
              key={`${tab}-${line}-${surface}-${tier}`}
              className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
            >
              {visible.map((boot) => (
                <StaggerItem key={boot.slug}>
                  <BootCard boot={boot} brand={brand} tab={tab} />
                </StaggerItem>
              ))}
            </StaggerList>
          )}

          {!loading && !error && visible.length === 0 && (
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
              Próbálj meg lazítani egy feltételen – például a pályatípuson.
            </EmptyState>
          )}
        </div>
      </div>
    </div>
  );
}
