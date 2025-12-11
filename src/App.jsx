import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import BootsFinderTeaser from "./components/BootsFinder";
import CommunitySection from "./components/CommunityFeed";

import BootsFinderPage from "./pages/BootsFinderPage";
import WebshopHome from "./pages/WebshopHome";
import NikePage from "./pages/NikePage";
import AdidasPage from "./pages/AdidasPage";
import PumaPage from "./pages/PumaPage";
import NikeBootDetail from "./pages/NikeBootDetail";
import AdidasBootDetail from "./pages/AdidasBootDetail";
import PumaBootDetail from "./pages/PumaBootDetail";

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

function App() {
  const location = useLocation();

  return (
    <div className="relative bg-neutral-950 text-white">
      {/* Globális háttér-glow, de scrollt nem növeli, mert a root overflow-x-hidden */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute -top-40 left-[-10%] h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute top-[40%] right-[-15%] h-96 w-96 rounded-full bg-fuchsia-500/18 blur-3xl" />
        <div className="absolute bottom-[-20%] left-[20%] h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <Navbar />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <HomePage />
              </PageTransition>
            }
          />

          <Route
            path="/bootsfinder"
            element={
              <PageTransition>
                <BootsFinderPage />
              </PageTransition>
            }
          />

          <Route
            path="/webshop"
            element={
              <PageTransition>
                <WebshopHome />
              </PageTransition>
            }
          />

          <Route
            path="/webshop/nike"
            element={
              <PageTransition>
                <NikePage />
              </PageTransition>
            }
          />
          <Route
            path="/webshop/adidas"
            element={
              <PageTransition>
                <AdidasPage />
              </PageTransition>
            }
          />
          <Route
            path="/webshop/puma"
            element={
              <PageTransition>
                <PumaPage />
              </PageTransition>
            }
          />

          <Route
            path="/webshop/nike/:slug"
            element={
              <PageTransition>
                <NikeBootDetail />
              </PageTransition>
            }
          />
          <Route
            path="/webshop/adidas/:slug"
            element={
              <PageTransition>
                <AdidasBootDetail />
              </PageTransition>
            }
          />
          <Route
            path="/webshop/puma/:slug"
            element={
              <PageTransition>
                <PumaBootDetail />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
