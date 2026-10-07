// ============================================================
// Termékkártya
// src/components/BootCard.jsx
// ============================================================

import React from "react";
import { Link } from "react-router-dom";

import { Price, Badge } from "./ui";
import { SURFACE_LABELS } from "../data/brandConfig";

export default function BootCard({ boot, brand, tab }) {
  const brandSlug = brand || boot.brand_slug;

  const badge =
    tab === "sale"
      ? { text: "Akciós", tone: "rose" }
      : boot.is_new
      ? { text: "Új", tone: "emerald" }
      : boot.is_bestseller
      ? { text: "Népszerű", tone: "indigo" }
      : null;

  return (
    <article className="surface-base card-interactive group flex h-full flex-col p-5">
      {/* Hovatartozás és jelölés */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <p className="text-meta text-gray-500">
          {boot.brand_name} {boot.line_name}
        </p>
        {badge && <Badge tone={badge.tone}>{badge.text}</Badge>}
      </div>

      {/* Név */}
      <h3 className="text-white transition-colors duration-200 group-hover:text-indigo-100">
        {boot.name}
      </h3>

      {boot.tagline && (
        <p className="mt-2 leading-snug text-gray-400">{boot.tagline}</p>
      )}

      {/* Jellemzők */}
      <div className="mt-3.5 flex flex-wrap items-center gap-2 text-meta text-gray-500">
        <span>{SURFACE_LABELS[boot.surface] || boot.surface}</span>
        <span className="h-1 w-1 rounded-full bg-gray-700" aria-hidden="true" />
        <span>{boot.tier}</span>
      </div>

      {/* Ár – a kártya súlypontja */}
      <div className="mt-auto pt-5">
        {boot.min_price ? (
          <div className="surface-quiet px-4 py-3.5 transition-colors duration-200 group-hover:bg-black/55">
            <div className="flex items-end justify-between gap-3">
              <Price value={boot.min_price_formatted} />
              <span className="text-meta pb-1 text-gray-500">legkedvezőbb</span>
            </div>
            <p className="text-meta mt-2 text-gray-500">
              {boot.partner_count} partner kínálatában
            </p>
          </div>
        ) : (
          <p className="surface-quiet px-4 py-3.5 text-meta text-gray-500">
            Jelenleg nincs partnerajánlat
          </p>
        )}

        <Link
          to={`/webshop/${brandSlug}/${boot.slug}`}
          className="btn-shift mt-4 block rounded-xl bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-500 px-4 py-2.5 text-center font-medium text-white"
        >
          Árak és részletek
        </Link>
      </div>
    </article>
  );
}
