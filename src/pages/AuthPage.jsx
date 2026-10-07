// ============================================================
// Bejelentkezes es regisztracio
// src/pages/AuthPage.jsx
//
// Egy komponens ket modban - a "mode" prop donti el.
// ============================================================

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../lib/auth";

export default function AuthPage({ mode = "login" }) {
  const isRegister = mode === "register";
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", display_name: "" });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    setError(null);
    setBusy(true);

    try {
      if (isRegister) {
        await register(form.email, form.password, form.display_name);
      } else {
        await login(form.email, form.password);
      }
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  // Enterre is kuldjon
  const onKeyDown = (e) => {
    if (e.key === "Enter" && !busy) handleSubmit();
  };

  return (
    <section className="mx-auto max-w-md px-4 pb-20 pt-20">
      <p className="text-xs uppercase tracking-[0.25em] text-gray-500">
        {isRegister ? "Regisztráció" : "Bejelentkezés"}
      </p>
      <h1 className="mt-2 text-3xl font-semibold">
        {isRegister ? "Hozz létre fiókot" : "Üdv újra!"}
      </h1>
      <p className="mt-3 text-sm text-gray-400">
        {isRegister
          ? "Fiókkal hirdetheted a használt cipőidet, és mentheted a BootsFinder eredményeidet."
          : "Jelentkezz be a hirdetéseid kezeléséhez."}
      </p>

      <div className="mt-8 space-y-3 rounded-3xl border border-white/10 bg-black/50 p-6 shadow-[0_18px_45px_rgba(0,0,0,0.7)]">
        {isRegister && (
          <Field
            label="Megjelenítendő név"
            value={form.display_name}
            onChange={update("display_name")}
            onKeyDown={onKeyDown}
            placeholder="pl. Gyarmati Márk"
          />
        )}

        <Field
          label="E-mail cím"
          type="email"
          value={form.email}
          onChange={update("email")}
          onKeyDown={onKeyDown}
          placeholder="pelda@email.hu"
        />

        <Field
          label="Jelszó"
          type="password"
          value={form.password}
          onChange={update("password")}
          onKeyDown={onKeyDown}
          placeholder={isRegister ? "Legalább 8 karakter" : "••••••••"}
        />

        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-200">
            {error}
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={busy}
          className="mt-2 w-full rounded-full bg-indigo-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/40 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {busy ? "Egy pillanat…" : isRegister ? "Regisztráció" : "Belépés"}
        </button>

        <p className="pt-2 text-center text-xs text-gray-400">
          {isRegister ? "Van már fiókod? " : "Még nincs fiókod? "}
          <Link
            to={isRegister ? "/belepes" : "/regisztracio"}
            className="font-semibold text-indigo-300 hover:text-indigo-200"
          >
            {isRegister ? "Jelentkezz be" : "Regisztrálj"}
          </Link>
        </p>
      </div>
    </section>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="block">
      <span className="mb-1 block text-[11px] uppercase tracking-wide text-gray-400">
        {label}
      </span>
      <input
        {...props}
        className="w-full rounded-xl border border-white/10 bg-black/60 px-3 py-2.5 text-sm text-white placeholder-gray-600 outline-none transition focus:border-indigo-400"
      />
    </label>
  );
}
