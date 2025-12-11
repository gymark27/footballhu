import React from "react";
import { Link } from "react-router-dom";

export default function BootsFinderTeaser() {
  return (
    <section className="relative border-b border-white/5">
      {/* Lokális glow – BootsFinder blokk mögött */}
      <div className="pointer-events-none absolute -top-20 right-[-140px] h-72 w-72 rounded-full bg-fuchsia-500/30 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-[-120px] left-[-140px] h-72 w-72 rounded-full bg-indigo-500/24 blur-[110px]" />

      <div className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-indigo-300/80">
          bootsfinder
        </p>

        <h2 className="text-2xl font-semibold text-white md:text-3xl">
          BootsFinder – találd meg a cipődet.
        </h2>

        <p className="mt-4 max-w-2xl text-sm text-gray-300 md:text-base">
          Nem vagy biztos benne, melyik csuka illik hozzád? Pár kérdéssel
          közelebb visszük a döntést – játékstílus, pályatípus, lábfej,
          költségkeret alapján szűkítjük a lehetőségeket. Első körben ajánlást
          adunk, a rendelés a partnerek oldalán történik.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
          <Link to="/bootsfinder">
            <button className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-neutral-900 shadow-lg shadow-fuchsia-500/40 transition hover:-translate-y-0.5 hover:bg-neutral-100">
              Indítsd el a BootsFindert ↗
            </button>
          </Link>

          <p className="text-xs text-gray-400">
            Beta verzió – a visszajelzések alapján finomítjuk.
          </p>
        </div>
      </div>
    </section>
  );
}
