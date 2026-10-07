// ============================================================
// Közös felületi elemek
// src/components/ui.jsx
// ============================================================

import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// ------------------------------------------------------------
// Ár
// ------------------------------------------------------------
export function Price({ value, size = "lead" }) {
  if (!value) return null;
  return (
    <span className={`price ${size === "lead" ? "price-lead" : "price-sub"}`}>
      {value}
    </span>
  );
}

// ------------------------------------------------------------
// Jelölő címke
// ------------------------------------------------------------
const BADGE_TONES = {
  neutral: "bg-white/10 text-gray-300",
  indigo: "bg-indigo-500/20 text-indigo-200",
  emerald: "bg-emerald-500/20 text-emerald-200",
  rose: "bg-rose-500/20 text-rose-200",
  amber: "bg-amber-400/20 text-amber-200",
};

export function Badge({ children, tone = "neutral" }) {
  return (
    <span
      className={`inline-flex items-center rounded-md px-2.5 py-1 text-[13px] font-medium ${BADGE_TONES[tone]}`}
    >
      {children}
    </span>
  );
}

// ------------------------------------------------------------
// Tulajdonság-címke
// ------------------------------------------------------------
export function Chip({ children }) {
  return (
    <span className="inline-flex items-center rounded-lg border border-white/12 bg-white/[0.05] px-3 py-1.5 text-[15px] text-gray-300">
      {children}
    </span>
  );
}

// ------------------------------------------------------------
// Animált tabváltó
//
// A kijelölés csúszik az elemek között, nem ugrik. A layoutId
// köti össze a két állapotot: a framer-motion kiszámolja az
// átmenetet a régi és az új pozíció között.
// ------------------------------------------------------------
export function TabBar({ tabs, value, onChange, idPrefix = "tab" }) {
  const reduced = useReducedMotion();

  return (
    <div
      role="tablist"
      className="inline-flex gap-1 rounded-xl border border-white/10 bg-black/40 p-1"
    >
      {tabs.map(([key, label]) => {
        const active = value === key;

        return (
          <button
            key={key}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(key)}
            className={`relative rounded-lg px-4 py-2 text-[15px] font-medium transition-colors ${
              active ? "text-white" : "text-gray-400 hover:text-gray-200"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${idPrefix}-indicator`}
                className="absolute inset-0 rounded-lg bg-indigo-500"
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 380, damping: 32 }
                }
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ------------------------------------------------------------
// Szűrőgomb és csoport
// ------------------------------------------------------------
export function FilterButton({ active, children, ...props }) {
  return (
    <button
      {...props}
      aria-pressed={active}
      className={`rounded-lg border px-3 py-1.5 text-[15px] transition-all duration-200 ${
        active
          ? "border-indigo-400/70 bg-indigo-500/20 text-indigo-100"
          : "border-white/10 bg-white/[0.03] text-gray-400 hover:border-white/30 hover:bg-white/[0.06] hover:text-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

export function FilterGroup({ title, options, value, onChange, labelFor }) {
  return (
    <fieldset className="mb-6">
      <legend className="mb-2.5 text-[15px] font-medium text-gray-400">
        {title}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <FilterButton
            key={opt}
            active={value === opt}
            onClick={() => onChange(opt)}
          >
            {labelFor(opt)}
          </FilterButton>
        ))}
      </div>
    </fieldset>
  );
}

// ------------------------------------------------------------
// Panel
// ------------------------------------------------------------
export function Panel({ title, children, sticky, action }) {
  return (
    <section className={`surface-raised p-6 ${sticky ? "lg:sticky lg:top-24" : ""}`}>
      {title && (
        <div className="mb-5 flex items-center justify-between gap-3">
          <h3 className="text-white">{title}</h3>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

// ------------------------------------------------------------
// Gombok
// ------------------------------------------------------------
export function Button({ variant = "primary", className = "", ...props }) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-[15px] font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "btn-shift bg-gradient-to-r from-indigo-400 via-indigo-500 to-indigo-500 text-white",
    secondary:
      "border border-white/15 text-gray-200 hover:border-white/35 hover:bg-white/5",
    ghost: "text-gray-400 hover:text-white",
    danger: "text-rose-300 hover:text-rose-200",
  };

  return <button {...props} className={`${base} ${variants[variant]} ${className}`} />;
}

// ------------------------------------------------------------
// Beviteli mezők
// ------------------------------------------------------------
const FIELD_CLASS =
  "w-full rounded-xl border border-white/12 bg-black/50 px-4 py-2.5 text-[16px] text-white placeholder-gray-600 transition-all duration-200 focus:border-indigo-400 focus:bg-black/70";

export function Input({ label, ...props }) {
  const field = <input {...props} className={FIELD_CLASS} />;
  if (!label) return field;

  return (
    <label className="block">
      <span className="mb-2 block text-[15px] text-gray-400">{label}</span>
      {field}
    </label>
  );
}

export function Select({ options, placeholder, label, ...props }) {
  const field = (
    <select {...props} className={FIELD_CLASS}>
      <option value="">{placeholder}</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );

  if (!label) return field;

  return (
    <label className="block">
      <span className="mb-2 block text-[15px] text-gray-400">{label}</span>
      {field}
    </label>
  );
}

// ------------------------------------------------------------
// Beúszó lista
//
// A találatok egymás után jelennek meg, rövid késleltetéssel.
// Ettől érzékelhető, hogy a lista frissült.
// ------------------------------------------------------------
export function StaggerList({ children, className = "" }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: reduced ? 0 : 0.045 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, className = "" }) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduced ? 0 : 14 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduced ? 0 : 0.34, ease: [0.2, 0.8, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// ------------------------------------------------------------
// Betöltési csontváz
// ------------------------------------------------------------
export function BootCardSkeleton() {
  return (
    <div className="surface-base p-5" aria-hidden="true">
      <div className="skeleton h-4 w-28" />
      <div className="skeleton mt-4 h-6 w-48" />
      <div className="skeleton mt-2.5 h-4 w-40" />
      <div className="skeleton mt-5 h-20 w-full" />
      <div className="skeleton mt-5 h-11 w-full" />
    </div>
  );
}

export function SkeletonGrid({ count = 6 }) {
  return (
    <>
      <span className="sr-only" role="status">
        Találatok betöltése
      </span>
      {Array.from({ length: count }, (_, i) => (
        <BootCardSkeleton key={i} />
      ))}
    </>
  );
}

// ------------------------------------------------------------
// Üres és hibaállapot
// ------------------------------------------------------------
export function EmptyState({ title, children, action }) {
  return (
    <div className="surface-base col-span-full p-10 text-center">
      <h4 className="text-white">{title}</h4>
      {children && (
        <p className="mx-auto mt-3 max-w-md text-gray-400">{children}</p>
      )}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function ErrorState({ children, onRetry }) {
  return (
    <div
      role="alert"
      className="col-span-full rounded-2xl border border-rose-500/30 bg-rose-500/[0.08] p-6"
    >
      <p className="text-rose-200">{children}</p>
      {onRetry && (
        <Button variant="secondary" className="mt-4" onClick={onRetry}>
          Újrapróbálom
        </Button>
      )}
    </div>
  );
}
