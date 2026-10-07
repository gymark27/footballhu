// ============================================================
// Profil - sajat hirdetesek kezelese
// src/pages/ProfilePage.jsx
// ============================================================

import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

const STATUS_LABELS = {
  pending:  { text: "Moderálásra vár", cls: "bg-amber-500/20 text-amber-200" },
  approved: { text: "Megjelenik",      cls: "bg-emerald-500/20 text-emerald-200" },
  rejected: { text: "Elutasítva",      cls: "bg-rose-500/20 text-rose-200" },
  sold:     { text: "Eladva",          cls: "bg-white/10 text-gray-300" },
};

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();

  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch("/api/listings/mine", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setListings(Array.isArray(d) ? d : []))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) load();
  }, [user]);

  const handleDelete = async (id) => {
    await fetch(`/api/listings/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    load();
  };

  if (authLoading) {
    return <Shell><p className="text-sm text-gray-400">Betöltés…</p></Shell>;
  }

  if (!user) return <Navigate to="/belepes" replace />;

  return (
    <Shell>
      <div className="mb-10 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Profil</p>
          <h1 className="mt-2 text-3xl font-semibold">{user.name}</h1>
          <p className="mt-1 text-sm text-gray-400">{user.email}</p>
          {user.role === "admin" && (
            <span className="mt-2 inline-block rounded-full bg-indigo-500/20 px-3 py-1 text-[11px] font-semibold text-indigo-200">
              Adminisztrátor
            </span>
          )}
        </div>

        <button
          onClick={logout}
          className="rounded-full border border-white/15 px-4 py-2 text-xs font-semibold text-gray-300 transition hover:bg-white/5"
        >
          Kijelentkezés
        </button>
      </div>

      <h2 className="mb-4 text-lg font-semibold">Hirdetéseim</h2>

      {loading && <p className="text-sm text-gray-400">Betöltés…</p>}

      {!loading && listings.length === 0 && (
        <div className="rounded-2xl border border-white/10 bg-black/50 p-6 text-sm text-gray-300">
          Még nincs hirdetésed. Egy modell oldalán tudsz feladni egyet.
        </div>
      )}

      <div className="space-y-3">
        {listings.map((l) => {
          const status = STATUS_LABELS[l.status] || STATUS_LABELS.pending;

          return (
            <div
              key={l.id}
              className="rounded-2xl border border-white/10 bg-black/50 p-4"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <Link
                    to={`/webshop/${l.brand_slug}/${l.boot_slug}`}
                    className="text-sm font-semibold text-white hover:text-indigo-300"
                  >
                    {l.boot_name}
                  </Link>
                  <p className="mt-1 text-xs text-gray-400">
                    EU {l.eu_size} • {l.condition_txt}
                    {l.location ? ` • ${l.location}` : ""}
                  </p>
                  {l.note && (
                    <p className="mt-1 text-xs text-gray-500">{l.note}</p>
                  )}
                </div>

                <div className="text-right">
                  <p className="text-base font-semibold text-amber-300">
                    {l.price_formatted}
                  </p>
                  <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold ${status.cls}`}>
                    {status.text}
                  </span>
                </div>
              </div>

              <button
                onClick={() => handleDelete(l.id)}
                className="mt-3 text-[11px] font-semibold text-rose-300 transition hover:text-rose-200"
              >
                Hirdetés törlése
              </button>
            </div>
          );
        })}
      </div>
    </Shell>
  );
}

function Shell({ children }) {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-16">{children}</section>
  );
}
