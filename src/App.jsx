import React from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { AuthProvider } from "./lib/auth";

import Navbar from "./components/navbar";
import Hero from "./components/hero";
import BootsFinderTeaser from "./components/BootsFinder";
import CommunitySection from "./components/CommunityFeed";

import BootsFinderPage from "./pages/BootsFinderPage";
import WebshopHome from "./pages/WebshopHome";
import BrandPage from "./pages/BrandPage";
import BootDetail from "./pages/BootDetail";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";

// Oldalváltás animáció
function PageTransition({ children }) {
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

// Főoldal tartalom
function HomePage() {
  return (
    <>
      <Hero />
      <BootsFinderTeaser />
      <main className="mx-auto max-w-6xl px-4 pb-20">
        <CommunitySection />
      </main>
    </>
  );
}

// Rólunk oldal
function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-16">
      <p className="text-xs uppercase tracking-[0.25em] text-gray-500">Rólunk</p>
      <h1 className="mt-2 text-3xl font-semibold">FootballHu</h1>
      <p className="mt-4 text-sm leading-relaxed text-gray-300">
        A FootballHu célja, hogy egy helyen mutassa meg a futballcipők
        kínálatát: partner webshopok árait hasonlítja össze, segít a
        választásban a BootsFinder ajánlórendszerrel, és teret ad a
        használt cipők közösségi adásvételének.
      </p>
      <p className="mt-4 text-sm leading-relaxed text-gray-400">
        A vásárlás minden esetben a partner webshop oldalán történik –
        a FootballHu nem árusít közvetlenül.
      </p>
    </section>
  );
}

// 404
function NotFoundPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 pb-20 pt-24 text-center">
      <p className="text-6xl font-semibold text-white/20">404</p>
      <h1 className="mt-4 text-2xl font-semibold">Ez az oldal nem található</h1>
      <p className="mt-3 text-sm text-gray-400">
        Lehet, hogy elírás történt, vagy a tartalom már nem elérhető.
      </p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center rounded-full bg-indigo-500 px-5 py-2 text-sm font-semibold transition hover:bg-indigo-400"
      >
        ← Vissza a főoldalra
      </Link>
    </section>
  );
}

function App() {
  const location = useLocation();
  const page = (element) => <PageTransition>{element}</PageTransition>;

  return (
    <AuthProvider>
      <div className="relative bg-neutral-950 text-white">
        {/* Globális háttér-glow */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -top-40 left-[-10%] h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute top-[40%] right-[-15%] h-96 w-96 rounded-full bg-fuchsia-500/18 blur-3xl" />
          <div className="absolute bottom-[-20%] left-[20%] h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
        </div>

        <Navbar />

        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={page(<HomePage />)} />
            <Route path="/rolunk" element={page(<AboutPage />)} />
            <Route path="/bootsfinder" element={page(<BootsFinderPage />)} />
            <Route path="/webshop" element={page(<WebshopHome />)} />

            {/* Egy útvonal mind a három márkához */}
            <Route path="/webshop/:brand" element={page(<BrandPage />)} />
            <Route path="/webshop/:brand/:slug" element={page(<BootDetail />)} />

            {/* Felhasználói fiók */}
            <Route path="/belepes" element={page(<AuthPage mode="login" />)} />
            <Route path="/regisztracio" element={page(<AuthPage mode="register" />)} />
            <Route path="/profil" element={page(<ProfilePage />)} />

            <Route path="*" element={page(<NotFoundPage />)} />
          </Routes>
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
}

export default App;
