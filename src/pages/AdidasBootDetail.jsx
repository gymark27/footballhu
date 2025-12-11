// src/pages/AdidasBootDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

const ADIDAS_DETAIL_DATA = {
  "predator-elite-fg-demo": {
    line: "Predator",
    name: "Predator Elite FG",
    heroTagline: "Kontroll és power – akik szeretik „megküldeni” a labdát.",
    style: "Control & power",
    tier: "Elite",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 210 g mérettől függően",
    upper: "Hybridknit felsőrész gumipanelekkel a rúgófelületen",
    studs: "FG stoplik – erős tapadás lövéseknél",
    fit: "Normál / enyhén szélesebb lábfejre is jó",
    playstyle:
      "Középpályásoknak és támadóknak, akik sokat lőnek kapura, beadnak, és fontos nekik a pontos, erős lövés.",
    players: "Bellingham, Pedri típusú játékosok stílusához köthető.",
  },
  "predator-pro-fg-demo": {
    line: "Predator",
    name: "Predator Pro FG",
    heroTagline: "Elérhetőbb Predator a kontrollérzet megtartásával.",
    style: "Control",
    tier: "Pro",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 220–230 g",
    upper: "Szintetikus felsőrész texturált zónákkal",
    studs: "FG stoplik – stabilitás és tapadás",
    fit: "Normál lábfejre kényelmes",
    playstyle:
      "Akik szeretnek erőből passzolni és lőni, de nem akarnak Elite árkategóriát.",
    players: "Amatőr és félprofi szinten gyakori választás irányítóknál.",
  },
  "x-speedportal-elite-fg-demo": {
    line: "X",
    name: "X Speedportal Elite FG",
    heroTagline: "Maximális sebesség, agresszív speed sziluett.",
    style: "Speed",
    tier: "Elite",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 190–200 g",
    upper: "Vékony, szintetikus felsőrész speed cage struktúrával",
    studs: "Sprintre optimalizált FG talp",
    fit: "Keskenyebb / normál lábfejre ideális",
    playstyle:
      "Gyors szélsőknek és csatároknak, akik indulásoknál és sprintnél keresik az előnyt.",
    players: "Salah, Mané típusú játékosok stílusához áll közel.",
  },
  "copa-pure-elite-fg-demo": {
    line: "Copa",
    name: "Copa Pure Elite FG",
    heroTagline: "Bőr felsőrész, klasszikus érzet modern csomagolásban.",
    style: "Classic",
    tier: "Elite",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 210–215 g",
    upper: "Prémium bőr + szintetikus betétek",
    studs: "Kerek stoplik – komfortos lépések, jó labdaérzet",
    fit: "Normál / kicsit szélesebb lábra is kényelmes",
    playstyle:
      "Akik a labdaérzetre, passzpontosságra és komfortos viseletre építenek.",
    players: "Klasszikus irányítók, mélységi középpályások kedvence.",
  },
};

export default function AdidasBootDetail() {
  const { slug } = useParams();
  const data = ADIDAS_DETAIL_DATA[slug];

  if (!data) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <div className="text-center space-y-3">
          <h1 className="text-2xl font-bold">Nem található ez a modell.</h1>
          <p className="text-sm text-gray-300">
            Lehet, hogy olyan demo linkre kattintottál, amihez még nincs
            részletes oldal.
          </p>
          <Link
            to="/webshop/adidas"
            className="inline-flex mt-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold hover:bg-emerald-600 transition"
          >
            Vissza az Adidas listához
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 text-white">
      <div className="mx-auto max-w-5xl px-4 py-10 space-y-10">

        {/* VISSZA & FEJLÉC */}
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/webshop/adidas"
            className="text-xs text-gray-300 hover:text-emerald-300 transition"
          >
            ← Vissza az Adidas listához
          </Link>
          <span className="text-[11px] text-gray-400">
            Demo Adidas modelloldal • FootballHu
          </span>
        </div>

        {/* HERO BLOKK */}
        <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-emerald-300">
              Adidas • {data.line}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {data.name}
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              {data.heroTagline}
            </p>

            {/* CHIPPEK */}
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-emerald-500/20 border border-emerald-400/70 px-3 py-1 text-emerald-100">
                {data.style}
              </span>
              <span className="rounded-full bg-white/5 border border-white/15 px-3 py-1 text-gray-100">
                {data.tier} szint
              </span>
              <span className="rounded-full bg-white/5 border border-white/15 px-3 py-1 text-gray-100">
                {data.surface}
              </span>
            </div>
          </div>

          {/* HELY A KÉPNEK / RENDERNEK */}
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-500/40 via-neutral-900 to-lime-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.9)] h-56 md:h-72 flex items-center justify-center">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_0_0,rgba(16,185,129,0.7)_0,transparent_60%),radial-gradient(circle_at_100%_100%,rgba(132,204,22,0.7)_0,transparent_60%)]" />
            <div className="relative z-10 text-center px-6">
              <p className="text-xs uppercase tracking-[0.25em] text-emerald-100/80">
                Product visual
              </p>
              <p className="mt-2 text-sm text-emerald-50">
                Ide kerülhetne egy nagy felbontású Adidas Predator / X / Copa
                termékkép vagy animáció. Most csak demo placeholder látható.
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
              Tipikus játékosprofil, akikhez ez a modell illik:
              <br />
              <span className="text-gray-200">{data.players}</span>
            </p>
          </div>
        </section>

        {/* VIDEÓ + PARTNER BLOKK */}
        <section className="grid gap-6 md:grid-cols-[3fr,2fr] items-stretch">
          <div className="rounded-2xl border border-emerald-400/50 bg-black/60 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col">
            <h2 className="text-sm font-semibold mb-2">
              Bemutató videó (demo hely)
            </h2>
            <div className="flex-1 rounded-xl bg-neutral-900/90 border border-white/10 flex items-center justify-center text-center px-6">
              <p className="text-xs text-gray-300">
                Ide ágyazható be Adidas által biztosított kampányvideó, vagy a
                FootballHu saját tesztvideója a cipőről. Játék közbeni jelenetek,
                lassítások, lövések, passzok – hogy látszódjon, mit tud a cipő.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-neutral-900/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-3">
            <h2 className="text-sm font-semibold">
              Demo partner ár-összehasonlítás
            </h2>
            <p className="text-[11px] text-gray-400">
              Valós integrációnál az Adidas hivatalos partnerei, viszonteladói
              jelennének meg itt, valós időben frissített árakkal és készlettel.
            </p>

            <div className="space-y-2 text-xs">
              <PartnerRow
                name="Adidas Official Partner HU"
                price="79 990 Ft"
                note="Hivatalos magyar viszonteladó, teljes garancia."
              />
              <PartnerRow
                name="BootsArena EU"
                price="74 990 Ft"
                note="EU webshop, 3–5 munkanapos szállítás."
              />
              <PartnerRow
                name="Local Sport Shop"
                price="82 990 Ft"
                note="Személyes átvétel, felpróbálási lehetőség."
              />
            </div>

            <button className="mt-2 w-full rounded-full bg-emerald-500 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-600 transition">
              Demo: megnézem partnereknél
            </button>
          </div>
        </section>

        <p className="text-[11px] text-gray-500">
          Minden adat demo jellegű – a FootballHu célja, hogy az Adidas focicipők
          választását átláthatóvá és élménnyé tegye, tartalommal és partneri
          együttműködésekkel.
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
        <span className="text-emerald-300 font-semibold">{price}</span>
      </div>
      <span className="mt-1 text-[10px] text-gray-400">{note}</span>
    </div>
  );
}
