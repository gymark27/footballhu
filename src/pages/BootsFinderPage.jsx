import React from "react";
import BootsFinder from "../components/BootsFinder";

export default function BootsFinderPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-to-b from-neutral-950 via-indigo-950/30 to-neutral-950">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
          BootsFinder
        </h1>
        <p className="text-sm md:text-base text-gray-300 mb-6 max-w-2xl">
          Egy helyen a cipőválasztás: ha van konkrét elképzelésed, azt finomítjuk,
          ha pedig a nulláról indulsz, talaj, poszt és lábfej alapján segítünk
          irányt találni.
        </p>

        {/* Itt full-screen módban, automatikusan nyitva indul */}
        <BootsFinder autoOpen />
      </div>
    </div>
  );
}
