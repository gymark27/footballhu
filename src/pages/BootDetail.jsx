// ============================================================
// Modell részletező
// src/pages/BootDetail.jsx
// ============================================================

import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { api, useApi } from "../lib/api";
import { useAuth } from "../lib/auth";
import { SURFACE_LABELS } from "../data/brandConfig";
import {
  Panel,
  Price,
  Badge,
  Chip,
  Button,
  Input,
  Select,
  ErrorState,
  StaggerList,
  StaggerItem,
} from "../components/ui";

const WIDTH_LABELS = {
  narrow: "Keskeny lábfej",
  regular: "Átlagos lábfej",
  wide: "Széles lábfej",
};

export default function BootDetail() {
  const { brand, slug } = useParams();
  const { data: boot, loading, error } = useApi(() => api.boot(slug), [slug]);

  if (loading) return <DetailSkeleton />;

  if (error || !boot) {
    return (
      <Wrapper>
        <ErrorState>{error || "Ez a modell nem található."}</ErrorState>
        <Link
          to={`/webshop/${brand}`}
          className="mt-5 inline-block text-indigo-300 hover:text-indigo-200"
        >
          Vissza a modellekhez
        </Link>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {/* ---------- Fejléc ---------- */}
      <Link
        to={`/webshop/${brand}`}
        className="text-meta text-gray-500 transition-colors hover:text-gray-300"
      >
        {boot.brand_name} modellek
      </Link>

      <header className="mb-12 mt-3">
        <p className="text-gray-500">{boot.line_name}</p>
        <h1 className="mt-1 text-white">{boot.name}</h1>
        {boot.tagline && (
          <p className="prose-narrow mt-4 text-lg text-gray-400">{boot.tagline}</p>
        )}

        <div className="mt-5 flex flex-wrap gap-2">
          <Chip>{SURFACE_LABELS[boot.surface] || boot.surface}</Chip>
          <Chip>{boot.tier}</Chip>
          {boot.weight_grams && <Chip>{boot.weight_grams} g</Chip>}
          {boot.width_fit && <Chip>{WIDTH_LABELS[boot.width_fit]}</Chip>}
        </div>
      </header>

      <div className="grid gap-7 lg:grid-cols-5">
        {/* ---------- Bal oszlop ---------- */}
        <div className="space-y-7 lg:col-span-3">
          <Panel title="Specifikációk">
            <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
              <Spec label="Felsőrész" value={boot.upper} />
              <Spec label="Stoplik" value={boot.studs} />
              <Spec label="Súly" value={boot.weight_grams && `${boot.weight_grams} g`} />
              <Spec label="Illeszkedés" value={WIDTH_LABELS[boot.width_fit]} />
            </dl>
          </Panel>

          {(boot.playstyle_txt || boot.players_txt) && (
            <Panel title="Kinek ajánljuk">
              {boot.playstyle_txt && (
                <p className="prose-narrow leading-relaxed text-gray-300">
                  {boot.playstyle_txt}
                </p>
              )}
              {boot.players_txt && (
                <p className="prose-narrow mt-4 leading-relaxed text-gray-500">
                  {boot.players_txt}
                </p>
              )}
            </Panel>
          )}

          <Panel title="Elérhető méretek">
            <div className="flex flex-wrap gap-2">
              {boot.sizes.map((s) => (
                <Chip key={s}>EU {s}</Chip>
              ))}
            </div>
          </Panel>

          <UsedListings boot={boot} />
        </div>

        {/* ---------- Jobb oszlop: árak ---------- */}
        <div className="lg:col-span-2">
          <Panel title="Partnerárak" sticky>
            {boot.offers.length === 0 ? (
              <p className="text-gray-500">
                Ehhez a modellhez jelenleg nincs partnerajánlat.
              </p>
            ) : (
              <>
                <StaggerList className="space-y-3">
                  {boot.offers.map((offer, i) => (
                    <StaggerItem key={offer.id}>
                      <div
                        className={`rounded-2xl px-4 py-4 transition-colors duration-200 ${
                          i === 0
                            ? "bg-amber-400/[0.09] ring-1 ring-amber-400/30"
                            : "bg-black/40 hover:bg-black/60"
                        }`}
                      >
                        <div className="flex items-end justify-between gap-3">
                          <span className="pb-1 text-gray-300">
                            {offer.partner_name}
                          </span>
                          <Price
                            value={offer.price_formatted}
                            size={i === 0 ? "lead" : "sub"}
                          />
                        </div>

                        <div className="mt-2.5 flex flex-wrap items-center gap-2">
                          {i === 0 && <Badge tone="amber">Legkedvezőbb</Badge>}
                          {offer.is_sale && <Badge tone="rose">Akciós</Badge>}
                          {!offer.in_stock && <Badge>Nincs készleten</Badge>}
                          {offer.note && (
                            <span className="text-meta text-gray-500">
                              {offer.note}
                            </span>
                          )}
                        </div>
                      </div>
                    </StaggerItem>
                  ))}
                </StaggerList>

                <p className="text-meta mt-5 leading-relaxed text-gray-500">
                  A vásárlás a partner oldalán történik. Az árak tájékoztató
                  jellegűek, a legutóbbi frissítés időpontjában érvényesek.
                </p>
              </>
            )}
          </Panel>
        </div>
      </div>
    </Wrapper>
  );
}

// ------------------------------------------------------------
// Használt hirdetések
// ------------------------------------------------------------
function UsedListings({ boot }) {
  const { user } = useAuth();

  const empty = {
    eu_size: "",
    condition_txt: "",
    price_huf: "",
    location: "",
    note: "",
  };

  const [form, setForm] = useState(empty);
  const [state, setState] = useState({ busy: false, error: null, sent: false });

  const update = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async () => {
    setState({ busy: true, error: null, sent: false });

    try {
      const res = await fetch("/api/listings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ boot_id: boot.id, ...form }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "A hirdetést nem sikerült beküldeni.");

      setForm(empty);
      setState({ busy: false, error: null, sent: true });
    } catch (err) {
      setState({ busy: false, error: err.message, sent: false });
    }
  };

  return (
    <Panel title="Használt hirdetések">
      {boot.listings.length > 0 ? (
        <ul className="mb-7 space-y-3">
          {boot.listings.map((l) => (
            <li key={l.id} className="surface-quiet px-4 py-4">
              <div className="flex items-end justify-between gap-3">
                <span className="pb-1 text-gray-200">
                  EU {l.eu_size} · {l.condition_txt}
                </span>
                <Price value={l.price_formatted} size="sub" />
              </div>
              {l.note && <p className="text-meta mt-2 text-gray-500">{l.note}</p>}
              <p className="text-meta mt-1 text-gray-600">
                {l.seller}
                {l.location ? ` · ${l.location}` : ""}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-7 text-gray-500">
          Ehhez a modellhez még nincs használt hirdetés. Legyél te az első.
        </p>
      )}

      <div className="surface-quiet p-5">
        <h4 className="mb-4 text-white">Hirdetés feladása</h4>

        {!user ? (
          <p className="text-gray-400">
            A hirdetésfeladáshoz{" "}
            <Link to="/belepes" className="text-indigo-300 hover:text-indigo-200">
              be kell jelentkezned
            </Link>
            .
          </p>
        ) : state.sent ? (
          <div>
            <p className="text-emerald-300">
              Beküldve. A hirdetés moderálás után jelenik meg.
            </p>
            <Button
              variant="ghost"
              className="mt-3 px-0 py-0"
              onClick={() => setState((s) => ({ ...s, sent: false }))}
            >
              Új hirdetés feladása
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <Select
                label="Méret"
                value={form.eu_size}
                onChange={update("eu_size")}
                options={boot.sizes}
                placeholder="Válassz"
              />
              <Select
                label="Állapot"
                value={form.condition_txt}
                onChange={update("condition_txt")}
                options={["Új", "Alig használt", "Használt", "Sokat használt"]}
                placeholder="Válassz"
              />
              <Input
                label="Ár"
                type="number"
                inputMode="numeric"
                placeholder="Ft"
                value={form.price_huf}
                onChange={update("price_huf")}
              />
            </div>

            <Input
              label="Település"
              placeholder="Nem kötelező"
              value={form.location}
              onChange={update("location")}
            />

            <Input
              label="Megjegyzés"
              placeholder="Nem kötelező"
              value={form.note}
              onChange={update("note")}
            />

            {state.error && (
              <p role="alert" className="text-rose-300">
                {state.error}
              </p>
            )}

            <Button onClick={handleSubmit} disabled={state.busy}>
              {state.busy ? "Küldés" : "Hirdetés beküldése"}
            </Button>
          </div>
        )}
      </div>
    </Panel>
  );
}

// ------------------------------------------------------------
function Wrapper({ children }) {
  return <div className="mx-auto max-w-6xl px-4 pb-28 pt-12">{children}</div>;
}

function Spec({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <dt className="text-meta text-gray-500">{label}</dt>
      <dd className="mt-1 text-gray-200">{value}</dd>
    </div>
  );
}

function DetailSkeleton() {
  return (
    <Wrapper>
      <div className="skeleton h-4 w-32" />
      <div className="skeleton mt-5 h-12 w-80 max-w-full" />
      <div className="skeleton mt-4 h-5 w-[28rem] max-w-full" />

      <div className="mt-12 grid gap-7 lg:grid-cols-5">
        <div className="space-y-7 lg:col-span-3">
          <div className="surface-raised p-6">
            <div className="skeleton h-6 w-40" />
            <div className="skeleton mt-5 h-24 w-full" />
          </div>
          <div className="surface-raised p-6">
            <div className="skeleton h-6 w-48" />
            <div className="skeleton mt-5 h-20 w-full" />
          </div>
        </div>
        <div className="lg:col-span-2">
          <div className="surface-raised p-6">
            <div className="skeleton h-6 w-36" />
            <div className="skeleton mt-5 h-16 w-full" />
            <div className="skeleton mt-3 h-16 w-full" />
            <div className="skeleton mt-3 h-16 w-full" />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
