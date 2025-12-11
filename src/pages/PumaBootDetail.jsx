// src/pages/PumaBootDetail.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

const PUMA_DETAIL_DATA = {
  "ultra-ultimate-fg-demo": {
    line: "Ultra",
    name: "Ultra Ultimate FG",
    heroTagline: "Villámgyors, könnyű csuka szélsőknek és gyors csatároknak.",
    style: "Speed",
    tier: "Elite",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 190–200 g",
    upper: "Vékony, szintetikus felsőrész speed mesh szerkezettel",
    studs: "FG stoplik – agresszív sprinthez és irányváltáshoz",
    fit: "Keskeny / normál lábfejre",
    playstyle:
      "Akik a sebességből élnek, vonal mellett robbannak be, és sprintből verik meg a védelmet.",
    players: "Griezmann, Chiesa típusú játékosok stílusához hasonló.",
  },
  "ultra-pro-fg-demo": {
    line: "Ultra",
    name: "Ultra Pro FG",
    heroTagline: "Speed érzet elérhetőbb áron, edzésre és meccsre is.",
    style: "Speed",
    tier: "Pro",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 205–215 g",
    upper: "Szintetikus felsőrész textúrákkal",
    studs: "FG stoplik – gyors indulásokhoz",
    fit: "Normál lábfejre kényelmes",
    playstyle:
      "Akik szeretik, ha a cipő könnyű, de nem a legvékonyabb, legbrutálisabb speed élményt keresik.",
    players: "Amatőr / félprofi szélsők, gyors támadók.",
  },
  "future-ultimate-fg-demo": {
    line: "Future",
    name: "Future Ultimate FG",
    heroTagline: "Rugalmas, kötözős felsőrész, tech skill játékosoknak.",
    style: "Agility & creativity",
    tier: "Elite",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 205–215 g",
    upper: "Textil + PWRTAPE rugalmas zónákkal",
    studs: "FG/AG hibrid jelleg – jó tapadás és fordulékonyság",
    fit: "Rugalmas illeszkedés, normál / szélesebb lábra is jó",
    playstyle:
      "Cselezős, technikás játékosoknak, akik sokat váltanak irányt, forgolódnak szűk területen.",
    players: "Neymar-típusú, kreatív, látványos játékosprofil.",
  },
  "future-pro-fg-demo": {
    line: "Future",
    name: "Future Pro FG",
    heroTagline: "Kreatív, kényelmes csuka technikás játékhoz.",
    style: "Agility & creativity",
    tier: "Pro",
    surface: "FG – firm ground (füves pálya)",
    weight: "kb. 215–225 g",
    upper: "Textil felsőrész rugalmas kötözési rendszerrel",
    studs: "FG stoplik – jó tapadás, fordulékonyság",
    fit: "Kényelmes, rugalmas illeszkedés",
    playstyle:
      "Akik sokat forgolódnak, cseleznek, és fontos, hogy a cipő ne szorítson.",
    players: "Tech skill orientált szélsők, támadók.",
  },
};

export default function PumaBootDetail() {
  const { slug } = useParams();
  const data = PUMA_DETAIL_DATA[slug];

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
            to="/webshop/puma"
            className="inline-flex mt-2 rounded-full bg-fuchsia-500 px-4 py-2 text-sm font-semibold hover:bg-fuchsia-600 transition"
          >
            Vissza a Puma listához
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
            to="/webshop/puma"
            className="text-xs text-gray-300 hover:text-fuchsia-300 transition"
          >
            ← Vissza a Puma listához
          </Link>
          <span className="text-[11px] text-gray-400">
            Demo Puma modelloldal • FootballHu
          </span>
        </div>

        {/* HERO BLOKK */}
        <section className="grid gap-8 md:grid-cols-[3fr,2fr] items-center">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-300">
              Puma • {data.line}
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {data.name}
            </h1>
            <p className="text-sm md:text-base text-gray-300">
              {data.heroTagline}
            </p>

            {/* CHIPPEK */}
            <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
              <span className="rounded-full bg-fuchsia-500/20 border border-fuchsia-400/70 px-3 py-1 text-fuchsia-100">
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
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-fuchsia-500/40 via-neutral-900 to-orange-500/40 shadow-[0_25px_80px_rgba(0,0,0,0.9)] h-56 md:h-72 flex items-center justify-center">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_0_0,rgba(236,72,153,0.7)_0,transparent_60%),radial-gradient(circle_at_100%_100%,rgba(249,115,22,0.7)_0,transparent_60%)]" />
            <div className="relative z-10 text-center px-6">
              <p className="text-xs uppercase tracking-[0.25em] text-fuchsia-100/80">
                Product visual
              </p>
              <p className="mt-2 text-sm text-fuchsia-50">
                Ide kerülhet Ultra / Future termékkép vagy dinamikus animáció.
                Most placeholder látható – demo prezentációhoz.
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
              Tipikus játékosprofil, akikhez ez a modell jól illik:
              <br />
              <span className="text-gray-200">{data.players}</span>
            </p>
          </div>
        </section>

        {/* VIDEÓ + PARTNER BLOKK */}
        <section className="grid gap-6 md:grid-cols-[3fr,2fr] items-stretch">
          <div className="rounded-2xl border border-fuchsia-400/50 bg-black/60 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] flex flex-col">
            <h2 className="text-sm font-semibold mb-2">
              Bemutató videó (demo hely)
            </h2>
            <div className="flex-1 rounded-xl bg-neutral-900/90 border border-white/10 flex items-center justify-center text-center px-6">
              <p className="text-xs text-gray-300">
                Ide be lehet tenni PUMA által biztosított kampányvideót, vagy
                FootballHu saját tesztvideót. Látványos lassítások, cselek,
                gólok – Ultra / Future játék közben.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-white/12 bg-neutral-900/90 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.9)] space-y-3">
            <h2 className="text-sm font-semibold">
              Demo partner ár-összehasonlítás
            </h2>
            <p className="text-[11px] text-gray-400">
              Itt látszanának a PUMA hivatalos partnerei, webshopjai, bolthálózatai –
              valós árakkal és elérhetőséggel, ha a FootballHu integrációja
              elkészül.
            </p>

            <div className="space-y-2 text-xs">
              <PartnerRow
                name="Puma Official Partner HU"
                price="76 990 Ft"
                note="Hivatalos viszonteladó, teljes garancia."
              />
              <PartnerRow
                name="BootsLab EU"
                price="71 990 Ft"
                note="EU webshop, 3–5 munkanapos szállítás."
              />
              <PartnerRow
                name="Urban Sport Store"
                price="79 990 Ft"
                note="Próba, személyes átvétel, tanácsadás."
              />
            </div>

            <button className="mt-2 w-full rounded-full bg-fuchsia-500 px-4 py-2 text-xs font-semibold text-white hover:bg-fuchsia-600 transition">
              Demo: megnézem partnereknél
            </button>
          </div>
        </section>

        <p className="text-[11px] text-gray-500">
          Minden adat demo jellegű. A FootballHu Puma fókuszú oldalai a
          sebességre, agilitásra és a tech skill játékra építenék a tartalmat,
          partneri együttműködésben.
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
        <span className="text-fuchsia-300 font-semibold">{price}</span>
      </div>
      <span className="mt-1 text-[10px] text-gray-400">{note}</span>
    </div>
  );
}
