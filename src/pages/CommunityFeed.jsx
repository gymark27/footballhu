// ============================================================
// Kozossegi feed - adatbazisbol
// src/components/CommunityFeed.jsx
// ============================================================

import React from "react";
import { api, useApi } from "../lib/api";

const TYPE_LABELS = {
  video: { badge: "VIDEÓ", label: "Videó" },
  news:  { badge: "HÍR",   label: "Hír" },
  poll:  { badge: "SZAVAZÁS", label: "Szavazás" },
};

// "2026-09-08 14:30:00"  ->  "3 órája"
function relativeTime(isoString) {
  if (!isoString) return "";

  // A D1 "YYYY-MM-DD HH:MM:SS" formaban ad vissza (UTC).
  const then = new Date(isoString.replace(" ", "T") + "Z");
  const diffMs = Date.now() - then.getTime();
  const minutes = Math.floor(diffMs / 60000);

  if (minutes < 1) return "épp most";
  if (minutes < 60) return `${minutes} perce`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} órája`;

  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} napja`;

  return then.toLocaleDateString("hu-HU");
}

function PostCard({ post }) {
  const type = TYPE_LABELS[post.type] || { badge: "POSZT", label: "Poszt" };

  return (
    <article className="rounded-2xl border border-white/10 bg-black/55 p-4 shadow-[0_18px_40px_rgba(0,0,0,0.7)]">
      <header className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-violet-200">
            {type.badge}
          </span>
          <span className="text-xs text-gray-400">
            {type.label} • {relativeTime(post.published_at)}
          </span>
        </div>
      </header>

      <h3 className="mb-1 text-sm font-semibold text-white sm:text-base">
        {post.title}
      </h3>
      <p className="mb-3 text-xs text-gray-300 sm:text-sm">{post.body}</p>

      {post.cta_label && (
        <a
          href={post.cta_url || "#"}
          target={post.cta_url ? "_blank" : undefined}
          rel="noreferrer"
          className="mb-3 inline-block text-xs font-semibold text-indigo-300 transition hover:text-indigo-200"
        >
          {post.cta_label} ↗
        </a>
      )}

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/5 px-2 py-1 text-[11px] text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export default function CommunityFeed() {
  const { data: posts, loading, error } = useApi(() => api.posts(), []);

  return (
    <section id="feed" className="relative border-t border-white/5 pt-14 md:pt-16">
      {/* Feed koruli glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-80 w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/26 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[-160px] right-[-140px] -z-10 h-80 w-80 rounded-full bg-fuchsia-600/28 blur-[120px]" />

      <div className="mx-auto max-w-6xl px-4 pb-20">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white md:text-3xl">
              Közösségi feed
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-300 md:text-base">
              Itt jelennek meg a FootballHu hírei, rövid videói és friss
              updatejei. Később innen indulnak majd a nyereményjátékok is.
            </p>
          </div>

          <div className="rounded-full border border-white/12 bg-white/7 px-4 py-2 text-[11px] text-gray-200">
            Próba verzió – egyelőre a posztokat csak a FootballHu szerkeszti.
          </div>
        </header>

        {loading && (
          <p className="text-sm text-gray-400">Posztok betöltése…</p>
        )}

        {error && (
          <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-200">
            Nem sikerült betölteni a posztokat: {error}
          </div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}

            {posts.length === 0 && (
              <p className="text-sm text-gray-400">
                Még nincs megjeleníthető poszt.
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
