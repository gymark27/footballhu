// src/pages/NikeBootDetail.jsx
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";

const NIKE_DETAIL_DATA = {
  "mercurial-vapor-elite-demo": {
    line: "Mercurial",
    name: "Mercurial Vapor Elite FG",
    heroTagline: "Ultrakönnyű speed cipő a robbanékony szélsőknek.",
    style: "Speed",
    tier: "Elite",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 190–200 g mérettől függően",
    upper: "Engineered mesh + NikeSkin bevonat",
    studs: "Bladed és kerek stoplik sprinthez optimalizálva",
    fit: "Közepes / enyhén keskeny lábfejre",
    playstyle:
      "Azoknak a játékosoknak, akik sebességből verik meg a védelmet, és fontos az első érintés minősége nagy tempónál.",
    players: "Mbappé, Vinícius Jr. típusú játékosok stílusához hasonló.",
  },
  "mercurial-vapor-pro-demo": {
    line: "Mercurial",
    name: "Mercurial Vapor Pro FG",
    heroTagline:
      "Speed élmény elérhetőbb áron – edzésekre és meccsekre egyaránt.",
    style: "Speed",
    tier: "Pro",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 210–220 g",
    upper: "Szintetikus felsőrész texturált zónákkal",
    studs: "FG stoplik – gyors irányváltásokhoz",
    fit: "Közepes szélességű lábra",
    playstyle:
      "Akik sokat futnak vonal mellett, indulásoknál és megindulásoknál keresik az előnyt.",
    players: "Félprofi, amatőr szinten is sokaknál népszerű választás.",
  },
  "phantom-gx-elite-demo": {
    line: "Phantom GX",
    name: "Phantom GX Elite FG",
    heroTagline: "Irányítóknak, akik passzokkal és finom érintésekkel döntenek.",
    style: "Control",
    tier: "Elite",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 200–210 g",
    upper: "Gripknit felsőrész, nagy érintési felület",
    studs: "Kombinált stoplik – tapadás és fordulékonyság",
    fit: "Normál / enyhén szélesebb lábfejre is kényelmes",
    playstyle:
      "Középpályásoknak, irányítóknak, akik sokat passzolnak és forgatják a játékot.",
    players: "De Bruyne, Gavi típusú játékosok profiljához áll közel.",
  },
  "phantom-gx-pro-demo": {
    line: "Phantom GX",
    name: "Phantom GX Pro FG",
    heroTagline: "Kontroll-orientált csuka stabil ár–érték aránnyal.",
    style: "Control",
    tier: "Pro",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 215–225 g",
    upper: "Műszálas felsőrész tapadós zónákkal",
    studs: "Kontrollra és forgékonyságra hangolva",
    fit: "Normál szélesség, kényelmes bebújás",
    playstyle:
      "Akiknek fontos, hogy a labda jól „üljön a lábon”, és pontos passzokat tudjanak adni.",
    players:
      "Irányító középpályások, technikás támadók, amatőr/profi szinten egyaránt.",
  },
  "tiempo-legend-elite-demo": {
    line: "Tiempo Legend",
    name: "Tiempo Legend Elite FG",
    heroTagline: "Bőr felsőrész, klasszikus labdaérzet – védők kedvence.",
    style: "Classic",
    tier: "Elite",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 210 g körül",
    upper: "Prémium bőr + modern belső szerkezet",
    studs: "Kerek stoplik – stabilitás és komfort",
    fit: "Normál / szélesebb lábra is kényelmes",
    playstyle:
      "Akiknek a stabilitás, kiszámítható érintés és biztonságos labdakihozatal a legfontosabb.",
    players: "Klasszikus, nyugodt stílusú védők, mélységi irányítók.",
  },
  "tiempo-legend-pro-demo": {
    line: "Tiempo Legend",
    name: "Tiempo Legend Pro FG",
    heroTagline: "Időtálló, kényelmes csuka, kiváló edzés–meccs kombóra.",
    style: "Classic",
    tier: "Pro",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 220–230 g",
    upper: "Minőségi bőr felsőrész szintetikus elemekkel",
    studs: "Kerek FG stoplik – stabil, kényelmes lépésekhez",
    fit: "Kényelmes, kissé tágabb szabás",
    playstyle:
      "Akik szeretik, ha a cipő nem „túl agresszív”, inkább komfortos és megbízható.",
    players: "Felnőtt amatőr csapatokban tipikus védő / védekező középpályás cipő.",
  },
};

const INITIAL_LISTINGS = [
  {
    id: 1,
    size: "42,5",
    condition: "Nagyon jó állapot (2 szezon, heti 1–2 edzés)",
    price: "45 000 Ft",
    location: "Budapest",
    note: "Elite szint, csak füves pályán használva, eredeti doboz megvan.",
    seller: "B. Márk",
  },
  {
    id: 2,
    size: "41",
    condition: "Jó állapot (1 szezon, kevés meccs)",
    price: "38 000 Ft",
    location: "Győr",
    note: "Kicsit keskeny a lábamra, ezért adom el. Stoplik jók, felsőrész ép.",
    seller: "T. Ádám",
  },
];

export default function NikeBootDetail() {
  const { slug } = useParams();
  const data = NIKE_DETAIL_DATA[slug];

  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [form, setForm] = useState({
    size: "",
    condition: "",
    price: "",
    location: "",
  });

  if (!data) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold">Nem található ez a modell.</h1>
          <p className="text-sm text-gray-300">
            Lehet, hogy demo linkre kattintottál, amihez még nincs részletes oldal.
          </p>
          <Link
            to="/webshop/nike"
            className="inline-flex mt-2 rounded-full bg-violet-500 px-4 py-2 text-sm font-semibold hover:bg-violet-600 transition"
          >
            Vissza a Nike listához
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitListing = (e) => {
    e.preventDefault();
    if (!form.size || !form.condition || !form.price) return;

    const newListing = {
      id: Date.now(),
      size: form.size,
      condition: form.condition,
      price: form.price,
      location: form.location || "–",
      note: "Demo hirdetés – valós projektben ellenőrzés után kerülne ki.",
      seller: "FootballHu user",
    };

    setListings((prev) => [newListing, ...prev]);
    setForm({ size: "", condition: "", price: "", location: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">

        {/* VISSZA & FEJLÉC */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/webshop/nike"
            className="text-xs text-gray-300 hover:text-violet-300 transition"
          >
            ← Vissza a Nike listához
          </Link>
          <span className="text-[11px] text-gray-400">
            Demo modelloldal • FootballHu
          </span>
        </div>

        {/* HERO BLOKK */}
        <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-violet-300">
              Nike • {data.line}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {data.name}
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              {data.heroTagline}
            </p>

            {/* CHIPPEK */}
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-violet-500/20 border border-violet-400/70 px-3 py-1 text-violet-100">
                {data.style} stílus
              </span>
              <span className="rounded-full bg-white/5 border border-white/15 px-3 py-1 text-gray-100">
                {data.tier} szint
              </span>
              <span className="rounded-full bg-white/5 border border-white/15 px-3 py-1 text-gray-100">
                {data.surface}
              </span>
            </div>
          </div>

          {/* HELY A KÉPNEK / 3D RENDERNEK */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-violet-500/40 via-neutral-900 to-fuchsia-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.9)] h-56 md:h-72 flex items-center justify-center">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_0_0,rgba(236,72,153,0.7)_0,transparent_60%),radial-gradient(circle_at_100%_100%,rgba(129,140,248,0.7)_0,transparent_60%)]" />
            <div className="relative z-10 text-center px-6">
              <p className="text-xs uppercase tracking-[0.25em] text-violet-100/80">
                Product visual
              </p>
              <p className="mt-2 text-sm text-violet-50">
                Ide kerülhet egy nagy felbontású termékkép vagy egy rövid, 3D-s
                forgás a cipőről. Demo módban egy placeholder szekció látható.
              </p>
            </div>
          </div>
        </section>

        {/* SPECIFIKÁCIÓ + JÁTÉKSTÍLUS */}
        <section className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/12 bg-neutral-900/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-2">
            <h2 className="text-sm font-semibold mb-1">Fő specifikációk</h2>
            <SpecRow label="Felsőrész" value={data.upper} />
            <SpecRow label="Súly" value={data.weight} />
            <SpecRow label="Talaj" value={data.surface} />
            <SpecRow label="Stoplik" value={data.studs} />
            <SpecRow label="Illeszkedés" value={data.fit} />
          </div>

          <div className="rounded-2xl border border-white/12 bg-neutral-900/90 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-3">
            <h2 className="text-sm font-semibold mb-1">Kinek ajánlott?</h2>
            <p className="text-xs text-gray-200">{data.playstyle}</p>
            <p className="text-[11px] text-gray-400">
              Profi játékosok, akiket sokan ezzel a modellel azonosítanak:
              <br />
              <span className="text-gray-200">{data.players}</span>
            </p>
          </div>
        </section>

        {/* VIDEÓ + PARTNER BLOKK */}
        <section className="grid gap-6 md:grid-cols-[3fr,2fr] items-stretch">
          <div className="rounded-2xl border border-violet-400/50 bg-black/60 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col">
            <h2 className="text-sm font-semibold mb-2">
              Bemutató videó (demo hely)
            </h2>
            <div className="flex-1 rounded-xl bg-neutral-900/90 border border-white/10 flex items-center justify-center text-center px-6">
              <p className="text-xs text-gray-300">
                Ide beágyazható egy YouTube vagy saját hostolt videó, ami a
                cipő mozgás közbeni viselkedését mutatja.  
                A partner márkák felé ezzel lehet hangsúlyozni a FootballHu
                tartalomértékét.
              </p>
            </div>
          </div>

          {/* ÁR ÖSSZEHASONLÍTÁS – DEMO PARTNEREK */}
          <div className="rounded-2xl border border-white/12 bg-neutral-900/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-3">
            <h2 className="text-sm font-semibold">
              Demo partner ár-összehasonlítás
            </h2>
            <p className="text-[11px] text-gray-400">
              Valós integráció esetén a FootballHu a hivatalos partnerek árait,
              készletét és méretválasztékát mutatná itt.
            </p>

            <div className="space-y-2 text-xs">
              <PartnerRow
                name="PartnerShop.hu"
                price="89 990 Ft"
                note="Hivatalos magyar partner – teljes méretválaszték"
              />
              <PartnerRow
                name="BootsStore EU"
                price="84 990 Ft"
                note="EU szállítás, 3–5 munkanap"
              />
              <PartnerRow
                name="LocalSport Bolt"
                price="92 990 Ft"
                note="Személyes átvétel, felpróbálási lehetőség"
              />
            </div>

            <button className="mt-2 w-full rounded-full bg-violet-500 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-600 transition">
              Demo: megnézem partnereknél
            </button>
          </div>
        </section>

        {/* ÚJ: KÖZÖSSÉGI CÍPŐHÍRDETÉSEK BLOKK */}
        <section className="space-y-4">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-sm md:text-base font-semibold">
                Cipőhirdetések – FootballHu közösség (demo)
              </h2>
              <p className="text-[11px] text-gray-400 max-w-md">
                Itt a FootballHu felhasználók tudnának Mercurial/Phantom/Tiempo
                cipőket hirdetni. Valós projektben minden hirdetés ellenőrzésen
                menne át a hamisítványok kiszűrésére.
              </p>
            </div>
            <span className="text-[11px] text-gray-500">
              Demo funkció – csak frontend prototípus
            </span>
          </div>

          {/* HIRDETÉS FELADÁSA – MINI FORM */}
          <form
            onSubmit={handleSubmitListing}
            className="rounded-2xl border border-white/12 bg-neutral-900/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-3 text-xs"
          >
            <div className="grid gap-3 md:grid-cols-4">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-gray-300">Méret</label>
                <input
                  type="text"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  placeholder="pl. 42,5"
                  className="rounded-md bg-black/60 border border-white/15 px-2 py-1 text-[11px] text-gray-100 focus:outline-none focus:ring-1 focus:ring-violet-400"
                />
              </div>
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="text-[11px] text-gray-300">Állapot</label>
                <input
                  type="text"
                  name="condition"
                  value={form.condition}
                  onChange={handleChange}
                  placeholder="pl. 1 szezon, jó állapot"
                  className="rounded-md bg-black/60 border border-white/15 px-2 py-1 text-[11px] text-gray-100 focus:outline-none focus:ring-1 focus:ring-violet-400"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-gray-300">Ár</label>
                <input
                  type="text"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="pl. 45 000 Ft"
                  className="rounded-md bg-black/60 border border-white/15 px-2 py-1 text-[11px] text-gray-100 focus:outline-none focus:ring-1 focus:ring-violet-400"
                />
              </div>
            </div>

            <div className="grid gap-3 md:grid-cols-[2fr,auto]">
              <div className="flex flex-col gap-1">
                <label className="text-[11px] text-gray-300">Város (opcionális)</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleChange}
                  placeholder="pl. Budapest"
                  className="rounded-md bg-black/60 border border-white/15 px-2 py-1 text-[11px] text-gray-100 focus:outline-none focus:ring-1 focus:ring-violet-400"
                />
              </div>
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full md:w-auto rounded-full bg-violet-500 px-4 py-2 text-[11px] font-semibold text-white hover:bg-violet-600 transition"
                >
                  Demo: hirdetés hozzáadása
                </button>
              </div>
            </div>

            <p className="text-[10px] text-gray-500">
              Demo módban a hirdetések csak helyben, az oldalon jelennek meg, nem
              kerülnek mentésre. Valós működés esetén külön admin felületen lehetne
              ellenőrizni őket.
            </p>
          </form>

          {/* HIRDETÉSEK LISTÁJA */}
          <div className="space-y-2">
            {listings.map((l) => (
              <div
                key={l.id}
                className="rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-xs flex flex-col md:flex-row md:items-center md:justify-between gap-2"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-100">
                      Méret: {l.size}
                    </span>
                    <span className="rounded-full bg-violet-500/20 px-2 py-0.5 text-[11px] text-violet-100">
                      {l.price}
                    </span>
                    <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] text-gray-200">
                      {l.location}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-300">{l.condition}</p>
                  <p className="text-[10px] text-gray-400">{l.note}</p>
                </div>
                <div className="text-right text-[10px] text-gray-500">
                  <div>Eladó (rövidítve): {l.seller}</div>
                  <div className="mt-1 text-[9px] text-gray-600">
                    Kapcsolat a FootballHu felületén keresztül (demo).
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <p className="text-[11px] text-gray-500">
          Fontos: minden ár, specifikáció, partnernév és hirdetés demo jellegű.  
          A FootballHu célja, hogy a focicipő választást és adásvételt átlátható,
          biztonságos folyamattá tegye – a márkákkal, hivatalos viszonteladókkal
          és ellenőrzött közösségi hirdetésekkel együtt.
        </p>
      </div>
    </div>
  );
}

function SpecRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-white/5 py-1.5">
      <span className="text-[11px] text-gray-400">{label}</span>
      <span className="text-[11px] text-gray-100 text-right">{value}</span>
    </div>
  );
}

function PartnerRow({ name, price, note }) {
  return (
    <div className="flex flex-col rounded-xl bg-black/40 border border-white/10 px-3 py-2 text-xs">
      <div className="flex items-center justify-between text-[11px]">
        <span className="font-semibold text-gray-100">{name}</span>
        <span className="text-violet-300 font-semibold">{price}</span>
      </div>
      <span className="mt-1 text-[10px] text-gray-400">{note}</span>
    </div>
  );
}
