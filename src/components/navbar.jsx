import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // FH logó :contentReference[oaicite:0]{index=0}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="
        sticky top-0 z-50
        bg-black/40 backdrop-blur-xl
        border-b border-white/10
        shadow-[0_0_30px_rgba(129,140,248,0.35)]
      "
    >
      {/* FELSŐ SOR: LOGO + NÉV + DESKTOP MENÜ + HAMBURGER */}
      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        {/* BAL: LOGO + NÉV */}
        <div className="flex items-center space-x-3">
          <img
            src={logo}
            alt="FootballHu logo"
            className="w-10 h-10 rounded-lg drop-shadow-[0_0_3px_rgba(168,85,247,0.7)]"
          />
          <span className="text-lg font-semibold text-white tracking-wide">
            FootballHu
          </span>
        </div>

        {/* KÖZÉP: KERESŐ – csak desktopon */}
        <div className="hidden md:flex flex-1 justify-center px-6">
          <input
            type="text"
            placeholder="Keresés..."
            className="
              w-1/2 max-w-md
              px-4 py-2
              rounded-full
              bg-neutral-900/80
              text-gray-100
              placeholder-gray-500
              border border-white/10
              focus:outline-none focus:ring-2 focus:ring-indigo-400
              shadow-inner
            "
          />
        </div>

        {/* JOBB: DESKTOP MENÜ */}
        <div className="hidden md:flex items-center space-x-5 text-sm md:text-base">
          <Link to="/" className="hover:text-indigo-400 transition">
            Főoldal
          </Link>
          <Link to="/webshop" className="hover:text-indigo-400 transition">
            Webshop
          </Link>
          <Link to="/rolunk" className="hover:text-indigo-400 transition">
            Rólunk
          </Link>
          <Link
            to="/bootsfinder"
            className="inline-flex items-center rounded-full bg-indigo-500 px-4 py-1.5 text-xs md:text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 hover:bg-indigo-400 transition"
          >
            BootsFinder
          </Link>

          {/* Profil ikon – később login / profil lesz rá */}
          <button
            className="
              inline-flex
              items-center justify-center
              w-9 h-9
              rounded-full
              bg-white/5
              border border-white/10
              hover:bg-white/10
              transition
            "
            aria-label="Bejelentkezés / profil"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5.121 17.804A4.992 4.992 0 0112 15c1.657 0 3.156.672 4.243 1.757A5.992 5.992 0 0118 21H6a6 6 0 01-.879-3.196zM12 11a4 4 0 100-8 4 4 0 000 8z"
              />
            </svg>
          </button>
        </div>

        {/* JOBB: MOBIL HAMBURGER */}
        <button
          className="
            md:hidden
            inline-flex items-center justify-center
            w-9 h-9
            rounded-full
            bg-white/5
            border border-white/10
            hover:bg-white/10
            transition
          "
          onClick={() => setOpen((v) => !v)}
          aria-label="Menü megnyitása"
        >
          {open ? (
            // X ikon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger ikon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-200"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h10"
              />
            </svg>
          )}
        </button>
      </div>

      {/* MOBIL LENYÍLÓ MENÜ */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/80 backdrop-blur-xl px-4 pb-4 space-y-3">
          {/* Kereső mobilon */}
          <input
            type="text"
            placeholder="Keresés..."
            className="
              w-full
              mt-3
              px-4 py-2
              rounded-full
              bg-neutral-900/90
              text-gray-100
              placeholder-gray-500
              border border-white/10
              focus:outline-none focus:ring-2 focus:ring-indigo-400
              shadow-inner
            "
          />

          <div className="flex flex-col pt-2 space-y-2 text-base">
            <Link
              to="/"
              onClick={() => setOpen(false)}
              className="py-1 hover:text-indigo-400 transition"
            >
              Főoldal
            </Link>
            <Link
              to="/webshop"
              onClick={() => setOpen(false)}
              className="py-1 hover:text-indigo-400 transition"
            >
              Webshop
            </Link>
            <Link
              to="/rolunk"
              onClick={() => setOpen(false)}
              className="py-1 hover:text-indigo-400 transition"
            >
              Rólunk
            </Link>
            <Link
              to="/bootsfinder"
              onClick={() => setOpen(false)}
              className="
                mt-2
                inline-flex items-center justify-center
                rounded-full bg-indigo-500 px-4 py-2
                text-sm font-semibold text-white
                shadow-lg shadow-indigo-500/40
                hover:bg-indigo-400 transition
              "
            >
              BootsFinder
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
