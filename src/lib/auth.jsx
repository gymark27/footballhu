// ============================================================
// Bejelentkezés állapota az egész alkalmazásban
// src/lib/auth.jsx
// ============================================================

import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// A szerver több helyen adja vissza a felhasználót, és nem
// mindenhol ugyanazzal a mezőnévvel: a regisztráció és a belépés
// display_name-et küld, a /auth/me viszont name-et.
// Itt egységesítjük, hogy a komponensek mindig ugyanazt lássák.
function normalize(raw) {
  if (!raw) return null;
  return {
    id: raw.id,
    email: raw.email,
    name: raw.name || raw.display_name || raw.email,
    role: raw.role || "user",
  };
}

async function post(path, body) {
  const res = await fetch(`/api${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Hiba: ${res.status}`);
  return data;
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Oldalbetöltéskor megkérdezzük: van-e érvényes munkamenet?
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => r.json())
      .then((d) => setUser(normalize(d.user)))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const login = async (email, password) => {
    const data = await post("/auth/login", { email, password });
    const u = normalize(data.user);
    setUser(u);
    return u;
  };

  const register = async (email, password, display_name) => {
    const data = await post("/auth/register", { email, password, display_name });
    const u = normalize(data.user);
    setUser(u);
    return u;
  };

  const logout = async () => {
    await post("/auth/logout");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("A useAuth csak AuthProvider-en belül használható.");
  }
  return ctx;
}
