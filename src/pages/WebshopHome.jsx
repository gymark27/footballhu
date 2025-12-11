import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

// --- MÁRKA KÁRTYÁK KÉPEI ---
import NikeCard from "../assets/brands/nike.jpg";
import AdidasCard from "../assets/brands/adidas.jpg";
import PumaCard from "../assets/brands/puma.jpg";

// DEMÓ ADATOK – márkák vegyesen
const ALL_BOOTS = [
  {
    id: 1,
    brand: "Nike",
    name: "Phantom GX Elite",
    line: "Phantom",
    level: "Elite",
    pitch: "FG – füves",
    sizes: ["40", "41", "42", "43"],
    price: 109990,
    bestSeller: true,
    isNew: true,
    onSale: false,
    partners: [
      { name: "PartnerSport", price: 109990 },
      { name: "BootStore", price: 114990 },
    ],
  },
  {
    id: 2,
    brand: "Adidas",
    name: "Predator Elite",
    line: "Predator",
    level: "Elite",
    pitch: "FG – füves",
    sizes: ["40", "41", "42"],
    price: 114990,
    bestSeller: true,
    isNew: false,
    onSale: true,
    partners: [
      { name: "BootStore", price: 114990 },
      { name: "PartnerSport", price: 119990 },
    ],
  },
  {
    id: 3,
    brand: "Puma",
    name: "Ultra Ultimate",
    line: "Ultra",
    level: "Elite",
    pitch: "FG – füves",
    sizes: ["39", "40", "41"],
    price: 99990,
    bestSeller: true,
    isNew: true,
    onSale: true,
    partners: [{ name: "BootStore", price: 99990 }],
  },
];

function formatPrice(num) {
  return num.toLocaleString("hu-HU") + " Ft";
}

// egyszerű partner-választó: mindig a legolcsóbb partner ajánlata jelenjen meg
function getHighlightPartner(boot) {
  if (!boot.partners || boot.partners.length === 0) return null;
  return boot.partners.reduce((best, p) =>
    p.price < best.price ? p : best
  );
}

export default function WebshopHome() {
  const [activeTab, setActiveTab] = useState("popular"); // popular | new | sale | all
  const [brandFilter, setBrandFilter] = useState("Mind");
  const [pitchFilter, setPitchFilter] = useState("Mind");
  const [levelFilter, setLevelFilter] = useState("Mind");
  const [sizeFilter, setSizeFilter] = useState("Mind");

  // mobilon: szűrő “oldalsó fiók”
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredBoots = useMemo(() => {
    return ALL_BOOTS.filter((boot) => {
      if (activeTab === "popular" && !boot.bestSeller) return false;
      if (activeTab === "new" && !boot.isNew) return false;
      if (activeTab === "sale" && !boot.onSale) return false;

      if (brandFilter !== "Mind" && boot.brand !== brandFilter) return false;
      if (pitchFilter !== "Mind" && boot.pitch !== pitchFilter) return false;
      if (levelFilter !== "Mind" && boot.level !== levelFilter) return false;
      if (
        sizeFilter !== "Mind" &&
        (!boot.sizes || !boot.sizes.includes(sizeFilter))
      ) {
        return false;
      }

      return true;
    });
  }, [activeTab, brandFilter, pitchFilter, levelFilter, sizeFilter]);

  return (
    <div className="min-h-screen bg-neutral-950 text-white pb-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-10">
        {/* FELSŐ RÉSZ – CÍM + BOOTSFINDER CTA (marad) */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-gray-500 mb-2">
              Webshop • Futballcipők
            </p>
          </div>

          <Link
            to="/bootsfinder"
            className="inline-flex items-center rounded-full bg-white text-black px-5 py-2 text-sm font-semibold
             shadow-[0_0_25px_rgba(255,255,255,0.35)] hover:shadow-[0_0_40px_rgba(255,255,255,0.55)]
             transition hover:-translate-y-0.5 self-start md:self-auto"
          >
            BootsFinder – segítség a választáshoz ↗
          </Link>
        </div>

        {/* MÁRKA KÁRTYÁK – mobilon vízszintes scroll, desktopon 3-oszlopos grid */}
        <div className="mb-14">
          <div className="flex gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-3 md:gap-7 md:overflow-visible">
            {/* NIKE */}
            <Link
              to="/webshop/nike"
              className="relative h-64 min-w-[82vw] md:min-w-0 md:h-64 rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img
                src={NikeCard}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
                alt="Nike football boots"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <p className="text-xs text-indigo-100/80 tracking-[0.25em]">
                  SPEED &amp; PRECISION
                </p>
                <h2 className="mt-2 text-2xl font-bold">Nike</h2>
                <p className="text-sm text-gray-300">
                  Mercurial, Phantom, Tiempo – a legnépszerűbb Nike vonalak.
                </p>
              </div>
            </Link>

            {/* ADIDAS */}
            <Link
              to="/webshop/adidas"
              className="relative h-64 min-w-[82vw] md:min-w-0 md:h-64 rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img
                src={AdidasCard}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
                alt="Adidas football boots"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <p className="text-xs text-emerald-100/80 tracking-[0.25em]">
                  CONTROL &amp; POWER
                </p>
                <h2 className="mt-2 text-2xl font-bold">Adidas</h2>
                <p className="text-sm text-gray-300">
                  Predator, X, Copa – erő, sebesség, klasszikus bőr érzés.
                </p>
              </div>
            </Link>

            {/* PUMA */}
            <Link
              to="/webshop/puma"
              className="relative h-64 min-w-[82vw] md:min-w-0 md:h-64 rounded-3xl overflow-hidden shadow-2xl group"
            >
              <img
                src={PumaCard}
                className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition duration-700"
                alt="Puma football boots"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 flex flex-col justify-end">
                <p className="text-[11px] uppercase tracking-[0.25em] text-fuchsia-100/80">
                  SPEED &amp; AGILITY
                </p>
                <h2 className="mt-2 text-2xl font-bold">Puma</h2>
                <p className="text-sm text-gray-300">
                  Ultra, Future – villámgyors, technikás játékra.
                </p>
              </div>
            </Link>
          </div>
        </div>

        {/* SZŰRŐ + CSEMPÉK – dizájn igazítva a NikePage-hez */}
        <h2 className="text-2xl font-bold mb-6">Válogatás szerint</h2>

        {/* Tabok */}
        <div className="flex items-center gap-2 mb-4 bg-black/40 p-1 rounded-full w-fit">
          {[
            ["popular", "Legnépszerűbb"],
            ["new", "Legújabb"],
            ["sale", "Akciós"],
            ["all", "Összes"],
          ].map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-1.5 rounded-full text-sm transition ${
                activeTab === key
                  ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/40"
                  : "text-gray-300 hover:bg-white/10"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Mobilon SZŰRŐ gomb, ami nyitja/csukja az oldalsó panelt */}
        <div className="mb-4 flex justify-between items-center lg:hidden">
          <button
            onClick={() => setIsFilterOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/70 px-4 py-2 text-xs font-semibold text-gray-100"
          >
            {isFilterOpen ? "Szűrők elrejtése" : "Szűrők megnyitása"}
          </button>
        </div>

        <div className="flex flex-col gap-6 lg:flex-row">
          {/* BAL OLDALI SZŰRŐ – mobilon csak ha nyitva, nagy kijelzőn mindig látszik */}
          <aside
            className={`w-full lg:w-72 shrink-0 rounded-3xl bg-black/60 p-5 shadow-[0_18px_45px_rgba(0,0,0,0.7)] ring-1 ring-white/10 text-xs
            ${isFilterOpen ? "block" : "hidden"} lg:block`}
          >
            <h3 className="text-sm font-semibold text-white mb-4">
              Szűrők
            </h3>

            {/* Márka */}
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-2">
              Márka
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["Mind", "Nike", "Adidas", "Puma"].map((b) => (
                <button
                  key={b}
                  onClick={() => setBrandFilter(b)}
                  className={`px-3 py-1 rounded-full text-[11px] border transition ${
                    brandFilter === b
                      ? "bg-indigo-500/20 text-indigo-200 border-indigo-400"
                      : "bg-white/5 text-gray-300 border-white/10 hover:border-indigo-300/60"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Szint */}
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-2">
              Szint
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["Mind", "Elite", "Pro", "Academy"].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setLevelFilter(lvl)}
                  className={`px-3 py-1 rounded-full text-[11px] border transition ${
                    levelFilter === lvl
                      ? "bg-indigo-500/20 text-indigo-200 border-indigo-400"
                      : "bg-white/5 text-gray-300 border-white/10 hover:border-indigo-300/60"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>

            {/* Pályatípus */}
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-2">
              Pályatípus
            </p>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {["Mind", "FG – füves", "AG – műfüves", "TF – kispálya"].map(
                (p) => (
                  <button
                    key={p}
                    onClick={() => setPitchFilter(p)}
                    className={`px-3 py-1 rounded-full text-[11px] border transition ${
                      pitchFilter === p
                        ? "bg-indigo-500/20 text-indigo-200 border-indigo-400"
                        : "bg-white/5 text-gray-300 border-white/10 hover:border-indigo-300/60"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
            </div>

            {/* Méret */}
            <p className="text-[11px] uppercase tracking-wide text-gray-400 mb-2">
              Méret (EU)
            </p>
            <div className="flex flex-wrap gap-1.5 mb-1">
              {["Mind", "39", "40", "41", "42", "43", "44"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSizeFilter(s)}
                  className={`px-3 py-1 rounded-full text-[11px] border transition ${
                    sizeFilter === s
                      ? "bg-indigo-500/20 text-indigo-200 border-indigo-400"
                      : "bg-white/5 text-gray-300 border-white/10 hover:border-indigo-300/60"
                    }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <p className="mt-4 text-[11px] text-gray-500">
              A szűrők egyelőre csak vizuális demóként működnek – a
              tényleges adatbázis-kapcsolat később kerülne be.
            </p>
          </aside>

          {/* JOBB OLDAL – CSEMPÉK a NikePage stílusában */}
          <div className="flex-1">
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredBoots.map((boot) => {
                const partner = getHighlightPartner(boot);

                return (
                  <article
                    key={boot.id}
                    className="group flex flex-col justify-between rounded-3xl border border-white/10 bg-gradient-to-b from-white/5 via-black/70 to-black/90 p-4 text-xs shadow-[0_18px_45px_rgba(0,0,0,0.8)]"
                  >
                    <div>
                      <p className="mb-1 flex items-center justify-between text-[11px] uppercase tracking-wide text-gray-400">
                        <span>
                          {boot.brand} • {boot.line}
                        </span>

                        {activeTab === "sale" && boot.onSale && (
                          <span className="rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-200">
                            Akciós
                          </span>
                        )}
                        {activeTab === "popular" && boot.bestSeller && (
                          <span className="rounded-full bg-indigo-500/20 px-2 py-0.5 text-[10px] font-semibold text-indigo-200">
                            Best seller
                          </span>
                        )}
                        {activeTab === "new" && boot.isNew && (
                          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-200">
                            Új modell
                          </span>
                        )}
                      </p>

                      <h3 className="mb-1 text-sm font-semibold text-white">
                        {boot.name}
                      </h3>
                      <p className="mb-2 text-[11px] text-gray-300">
                        {boot.line} • {boot.pitch} • {boot.level}
                      </p>

                      {partner && (
                        <div className="mt-3 rounded-2xl bg-black/70 p-3 ring-1 ring-white/5">
                          <p className="text-[11px] uppercase tracking-wide text-gray-400">
                            Partner ajánlat
                          </p>
                          <p className="mt-1 text-xs font-semibold text-white">
                            {partner.name}
                          </p>
                          <p className="mt-1 text-base font-semibold text-amber-300">
                            {formatPrice(partner.price)}
                          </p>
                          <p className="mt-1 text-[11px] text-gray-400">
                            kb. ár: {formatPrice(boot.price)}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-2">
                      <Link
                        to={`/webshop/${boot.brand.toLowerCase()}/${boot.id}`}
                        className="inline-flex flex-1 items-center justify-center rounded-full bg-indigo-500 px-3 py-2 text-[11px] font-semibold text-white shadow-lg shadow-indigo-500/40 transition group-hover:bg-indigo-400"
                      >
                        Részletek &amp; típusok →
                      </Link>
                    </div>
                  </article>
                );
              })}

              {filteredBoots.length === 0 && (
                <div className="col-span-full rounded-2xl border border-white/10 bg-black/70 p-6 text-sm text-gray-300">
                  Nincs olyan csuka, ami megfelelne az aktuális szűrőknek.
                  Érdemes lazítani egy feltételen (pl. márka vagy pályatípus).
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
