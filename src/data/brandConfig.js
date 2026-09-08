// ============================================================
// Markankenti vizualis beallitasok
// src/data/brandConfig.js
//
// Ami NEM adat, hanem megjelenes: kepek, szinek, feliratok.
// Az adat (cipok, arak) az adatbazisbol jon.
// ============================================================

import Mercurial from "../assets/brands/mercurial.jpg";
import Phantom from "../assets/brands/phantom.jpg";
import Tiempo from "../assets/brands/tiempo.jpg";
import AdidasImg from "../assets/brands/adidas.jpg";
import F50 from "../assets/brands/f50.jpg";
import Copa from "../assets/brands/copa.jpg";
import PumaImg from "../assets/brands/puma.jpg";
import Fut from "../assets/brands/fut.jpg";
import King from "../assets/brands/king.jpg";

export const BRAND_CONFIG = {
  nike: {
    label: "Nike Futballcipők",
    lines: [
      { name: "Mercurial", image: Mercurial, kicker: "Speed & Precision", accent: "text-indigo-100/80", hover: "group-hover:text-amber-200" },
      { name: "Phantom",   image: Phantom,   kicker: "Control & Vision",  accent: "text-emerald-100/80", hover: "group-hover:text-emerald-200" },
      { name: "Tiempo",    image: Tiempo,    kicker: "Classic & Comfort", accent: "text-fuchsia-100/80", hover: "group-hover:text-sky-200" },
    ],
  },
  adidas: {
    label: "Adidas Futballcipők",
    lines: [
      { name: "Predator", image: AdidasImg, kicker: "Control & Power",   accent: "text-indigo-100/80", hover: "group-hover:text-amber-200" },
      { name: "X",        image: F50,       kicker: "Speed & Agility",   accent: "text-emerald-100/80", hover: "group-hover:text-emerald-200" },
      { name: "Copa",     image: Copa,      kicker: "Classic & Touch",   accent: "text-fuchsia-100/80", hover: "group-hover:text-sky-200" },
    ],
  },
  puma: {
    label: "Puma Futballcipők",
    lines: [
      { name: "Ultra",  image: PumaImg, kicker: "Speed & Agility",     accent: "text-indigo-100/80", hover: "group-hover:text-amber-200" },
      { name: "Future", image: Fut,     kicker: "Control & Creativity", accent: "text-emerald-100/80", hover: "group-hover:text-emerald-200" },
      { name: "King",   image: King,    kicker: "Classic & Comfort",   accent: "text-fuchsia-100/80", hover: "group-hover:text-sky-200" },
    ],
  },
};

// Palyatipus kod -> olvashato felirat
export const SURFACE_LABELS = {
  FG: "FG – füves",
  AG: "AG – műfüves",
  SG: "SG – puha talaj",
  TF: "TF – kispálya",
  IC: "IC – terem",
  MG: "MG – vegyes",
};
