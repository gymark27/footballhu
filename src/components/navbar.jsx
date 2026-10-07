// ============================================================
// Navigáció
// src/components/navbar.jsx
// ============================================================

import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import logo from "../assets/logo.png";
import { useAuth } from "../lib/auth";

const LINKS = [
  { to: "/", label: "Főoldal" },
  { to: "/webshop", label: "Webshop" },
  { to: "/rolunk", label: "Rólunk" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => setOpen(false), [location.pathname]);

  const handleSearch = (e) => {
    if (e.key !== "Enter" || !query.trim()) return;
    navigate(`/webshop?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-5 px-4 py-4 sm:px-6">
        {/* Logó */}
        <Link to="/" className="flex shrink-0 items-center gap-3">
          <img src={logo} alt="" className="h-10 w-10 rounded-xl" />
          <span className="font-display text-2xl font-bold tracking-tight text-white">
            FootballHu
          </span>
        </Link>

        {/* Kereső – desktop */}
        <div className="hidden flex-1 justify-center md:flex">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Keresés a modellek között"
            aria-label="Keresés a modellek között"
            className="w-full max-w-md rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-gray-100 placeholder-gray-500 transition-all duration-200 focus:border-indigo-400 focus:bg-white/[0.07]"
          />
        </div>

        {/* Menü – desktop */}
        <nav className="hidden items-center gap-1.5 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `rounded-lg px-3.5 py-2 font-medium transition-colors ${
                  isActive ? "text-white" : "text-gray-400 hover:text-white"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <Link
            to="/bootsfinder"
            className="btn-shift ml-1.5 rounded-xl bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-500 px-4 py-2 font-medium text-white"
          >
            BootsFinder
          </Link>

          <ProfileLink user={user} />
        </nav>

        {/* Hamburger – mobil */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Menü bezárása" : "Menü megnyitása"}
          className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 text-gray-300 transition-colors hover:bg-white/5 md:hidden"
        >
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            strokeLinecap="round"
          >
            {open ? <path d="M6 18 18 6M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {/* Mobil menü */}
      {open && (
        <div className="border-t border-white/10 bg-neutral-950/95 px-4 pb-5 md:hidden">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleSearch}
            placeholder="Keresés a modellek között"
            aria-label="Keresés a modellek között"
            className="mt-4 w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-gray-100 placeholder-gray-500 focus:border-indigo-400"
          />

          <nav className="mt-4 flex flex-col gap-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-3 font-medium ${
                    isActive ? "bg-white/5 text-white" : "text-gray-400"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <Link
              to={user ? "/profil" : "/belepes"}
              className="rounded-lg px-3 py-3 font-medium text-gray-400"
            >
              {user ? user.name : "Belépés"}
            </Link>

            <Link
              to="/bootsfinder"
              className="mt-2 rounded-xl bg-indigo-500 px-4 py-3 text-center font-medium text-white"
            >
              BootsFinder
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

// ------------------------------------------------------------
function ProfileLink({ user }) {
  if (user) {
    return (
      <Link
        to="/profil"
        title={user.name}
        className="ml-1.5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/25 font-display text-lg font-bold text-indigo-100 transition-all duration-200 hover:bg-indigo-500/40"
      >
        {user.name.charAt(0).toUpperCase()}
      </Link>
    );
  }

  return (
    <Link
      to="/belepes"
      aria-label="Belépés"
      className="ml-1.5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/12 text-gray-300 transition-all duration-200 hover:border-white/30 hover:bg-white/5"
    >
      <svg
        className="h-5 w-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    </Link>
  );
}
