// ============================================================
// API hivasok - kozponti helyen
// src/lib/api.js
// ============================================================

// A Vite proxy miatt eleg a relativ ut: "/api/..."
// Fejleszteskor a 8787-es Workerhez, elesben ugyanahhoz a domainhez megy.
const BASE = "/api";

async function request(path) {
  const res = await fetch(`${BASE}${path}`);

  if (!res.ok) {
    let message = `Hiba: ${res.status}`;
    try {
      const body = await res.json();
      if (body.error) message = body.error;
    } catch {
      // nem JSON valasz - marad az altalanos uzenet
    }
    throw new Error(message);
  }

  return res.json();
}

// Query stringet epit, az ures ertekeket kihagyja.
// { brand: "nike", tier: "all" }  ->  "?brand=nike"
function buildQuery(params = {}) {
  const usable = Object.entries(params).filter(
    ([, v]) => v !== undefined && v !== null && v !== "" && v !== "all"
  );
  if (!usable.length) return "";
  return "?" + new URLSearchParams(usable).toString();
}

export const api = {
  brands: () => request("/brands"),
  boots: (params) => request("/boots" + buildQuery(params)),
  boot: (slug) => request(`/boots/${slug}`),
  priceHistory: (slug) => request(`/boots/${slug}/price-history`),
  posts: () => request("/posts"),
};

// ------------------------------------------------------------
// useApi - egyszeru hook adatlekereshez
//
// Harom allapotot ad vissza:
//   data    - a megerkezett adat (kezdetben null)
//   loading - toltes alatt van-e
//   error   - hibauzenet, ha volt
//
// A "deps" tomb mondja meg, mikor kell ujra lekerni
// (pl. amikor valtozik egy szuro).
// ------------------------------------------------------------
import { useState, useEffect } from "react";

export function useApi(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetcher()
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    // Ha a komponens eltunik vagy ujraindul a lekeres,
    // a regi valaszt eldobjuk - igy nem villog az adat.
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return { data, loading, error };
}
