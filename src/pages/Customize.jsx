import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import { presets } from "../config/presets.js";
import { toConfigFileString } from "../config/exportConfig.js";
import { googleFonts } from "../config/fonts.js";
import { useMemo, useState } from "react";

function setByPath(obj, path, value) {
  const keys = path.split(".");
  const clone = structuredClone(obj);
  let cur = clone;
  for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]];
  cur[keys[keys.length - 1]] = value;
  return clone;
}

function setOverride(setConfig, key, value) {
  setConfig((p) => ({
    ...p,
    theme: {
      ...p.theme,
      overrides: {
        ...(p.theme.overrides || {}),
        [key]: value,
      },
    },
  }));
}

function getOverride(config, key) {
  return config.theme.overrides?.[key] ?? "";
}

export default function Customize() {
  const { config, setConfig } = useSiteConfig();
  const [importText, setImportText] = useState("");
  const [msg, setMsg] = useState("");

  const presetList = useMemo(() => Object.values(presets), []);

  const update = (path) => (e) => {
    const v = e?.target?.type === "checkbox" ? e.target.checked : e.target.value;
    setConfig((prev) => setByPath(prev, path, v));
  };

  const toggleSection = (id) => {
    setConfig((prev) => ({
      ...prev,
      pages: {
        ...prev.pages,
        home: {
          ...prev.pages.home,
          sections: prev.pages.home.sections.map((s) =>
            s.id === id ? { ...s, enabled: !s.enabled } : s
          ),
        },
      },
    }));
  };

  const moveSection = (id, dir) => {
    setConfig((prev) => {
      const arr = [...prev.pages.home.sections];
      const idx = arr.findIndex((s) => s.id === id);
      const j = idx + dir;
      if (idx < 0 || j < 0 || j >= arr.length) return prev;
      [arr[idx], arr[j]] = [arr[j], arr[idx]];
      return {
        ...prev,
        pages: { ...prev.pages, home: { ...prev.pages.home, sections: arr } },
      };
    });
  };

  const setPreset = (presetId) =>
    setConfig((p) => ({ ...p, theme: { ...p.theme, preset: presetId } }));

  const exportToClipboard = async () => {
    try {
      const str = toConfigFileString(config);
      await navigator.clipboard.writeText(str);
      setMsg("✅ Config copiada al portapapeles (lista para pegar en site.config.js).");
      setTimeout(() => setMsg(""), 2500);
    } catch {
      const str = toConfigFileString(config);
      setImportText(str);
      setMsg("⚠️ No pude copiar. Te he dejado el export en el cuadro de texto.");
      setTimeout(() => setMsg(""), 3500);
    }
  };

  const importFromText = () => {
    const t = importText.trim();
    if (!t) return;
    try {
      let objText = t.replace(/^export\s+const\s+siteConfig\s*=\s*/m, "");
      objText = objText.replace(/;\s*$/m, "");
      const parsed = JSON.parse(objText);
      setConfig(parsed);
      setMsg("✅ Config importada y aplicada.");
      setTimeout(() => setMsg(""), 2500);
    } catch {
      setMsg("❌ Import fallido. Pega el JSON del objeto o el export generado.");
      setTimeout(() => setMsg(""), 3500);
    }
  };

  return (
    <div className="py-16">
      <Container className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        {/* PANEL IZQUIERDO */}
        <GlassCard className="p-6 space-y-6">
          <div>
            <h1 className="text-xl font-semibold">Personalizador (Perfect)</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Presets + overrides (colores, tipografías, blur/shadow) + textos + estructura + export/import.
            </p>

            {msg ? (
              <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-3 text-sm text-zinc-200">
                {msg}
              </div>
            ) : null}
          </div>

          {/* PRESETS */}
          <div>
            <div className="text-sm font-semibold">Preset (base rápida)</div>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {presetList.map((p) => (
                <Button
                  key={p.id}
                  variant={config.theme.preset === p.id ? "primary" : "default"}
                  onClick={() => setPreset(p.id)}
                >
                  {p.label}
                </Button>
              ))}
            </div>
          </div>

          {/* MODO UI */}
          <div className="space-y-2">
            <div className="text-sm font-semibold">Modo UI</div>
            <select
              className="mt-1 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-zinc-200 outline-none"
              value={config.theme.mode}
              onChange={update("theme.mode")}
            >
              <option value="glass">Glass</option>
              <option value="solid">Solid</option>
              <option value="minimal">Minimal</option>
            </select>
            <div className="text-xs text-zinc-500">
              Controla el estilo base de tarjetas (blur, borde y presencia).
            </div>
          </div>

          {/* OVERRIDES: COLORES + TIPOS + SLIDERS */}
          <div className="space-y-3">
            <div className="text-sm font-semibold">Tema — ajustes finos</div>

            <div className="grid grid-cols-2 gap-3">
              <ColorField
                label="Accent A"
                value={getOverride(config, "--accentA")}
                onChange={(v) => setOverride(setConfig, "--accentA", v)}
              />
              <ColorField
                label="Accent B"
                value={getOverride(config, "--accentB")}
                onChange={(v) => setOverride(setConfig, "--accentB", v)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <ColorField
                label="Background"
                value={getOverride(config, "--bg")}
                onChange={(v) => setOverride(setConfig, "--bg", v)}
              />
              <ColorField
                label="Text"
                value={getOverride(config, "--text")}
                onChange={(v) => setOverride(setConfig, "--text", v)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <NumberField
                label="Radius (px)"
                value={stripPx(getOverride(config, "--radius"))}
                onChange={(v) => setOverride(setConfig, "--radius", v ? `${v}px` : "")}
                placeholder="28"
              />
              <NumberField
                label="Blur (px)"
                value={stripPx(getOverride(config, "--cardBlur"))}
                onChange={(v) => setOverride(setConfig, "--cardBlur", v ? `${v}px` : "")}
                placeholder="22"
              />
            </div>

            <div className="space-y-2">
              <div className="text-xs text-zinc-400">Shadow (sliders)</div>
              <Slider
                label="Shadow Y"
                min={0}
                max={60}
                value={toNum(stripPx(getOverride(config, "--shadowY")), 30)}
                onChange={(v) => setOverride(setConfig, "--shadowY", `${v}px`)}
              />
              <Slider
                label="Shadow Blur"
                min={0}
                max={180}
                value={toNum(stripPx(getOverride(config, "--shadowBlur")), 110)}
                onChange={(v) => setOverride(setConfig, "--shadowBlur", `${v}px`)}
              />
              <Slider
                label="Shadow Opacity"
                min={0}
                max={0.9}
                step={0.01}
                value={toNum(getOverride(config, "--shadowOpacity"), 0.55)}
                onChange={(v) => setOverride(setConfig, "--shadowOpacity", String(v))}
              />
            </div>

            <div className="grid grid-cols-1 gap-3">
              <FontSelect
                label="Font Display (títulos)"
                value={getOverride(config, "--fontDisplay")}
                onChange={(v) => setOverride(setConfig, "--fontDisplay", v)}
              />
              <FontSelect
                label="Font Body (texto)"
                value={getOverride(config, "--fontBody")}
                onChange={(v) => setOverride(setConfig, "--fontBody", v)}
              />
              <div className="text-xs text-zinc-500">
                Seleccionar una Google Font la importará automáticamente al cargar la web.
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                variant="default"
                onClick={() =>
                  setConfig((p) => ({
                    ...p,
                    theme: { ...p.theme, overrides: {} },
                  }))
                }
              >
                Reset overrides
              </Button>
            </div>
          </div>

          {/* BRANDING */}
          <div className="space-y-3">
            <div className="text-sm font-semibold">Branding</div>
            <Field label="Nombre" value={config.brand.name} onChange={update("brand.name")} />
            <Field label="Tagline" value={config.brand.tagline} onChange={update("brand.tagline")} />
            <Field label="Logo (emoji)" value={config.brand.emojiLogo} onChange={update("brand.emojiLogo")} />
          </div>

          {/* TEXTOS HERO */}
          <div className="space-y-3">
            <div className="text-sm font-semibold">Textos — Hero</div>
            <Field label="Badge" value={config.copy.hero.badge} onChange={update("copy.hero.badge")} />
            <Field label="Título (A)" value={config.copy.hero.titleA} onChange={update("copy.hero.titleA")} />
            <Field
              label="Título (highlight)"
              value={config.copy.hero.titleHighlight}
              onChange={update("copy.hero.titleHighlight")}
            />
            <Field label="Título (B)" value={config.copy.hero.titleB} onChange={update("copy.hero.titleB")} />
            <TextArea label="Subtítulo" value={config.copy.hero.subtitle} onChange={update("copy.hero.subtitle")} />
            <Field label="CTA principal" value={config.copy.hero.primaryCta} onChange={update("copy.hero.primaryCta")} />
            <Field label="CTA secundaria" value={config.copy.hero.secondaryCta} onChange={update("copy.hero.secondaryCta")} />
          </div>

          {/* CTA FINAL */}
          <div className="space-y-3">
            <div className="text-sm font-semibold">Textos — CTA final</div>
            <Field label="Kicker" value={config.copy.promo.kicker} onChange={update("copy.promo.kicker")} />
            <Field label="Título" value={config.copy.promo.title} onChange={update("copy.promo.title")} />
            <TextArea label="Descripción" value={config.copy.promo.desc} onChange={update("copy.promo.desc")} />
            <Field label="CTA principal" value={config.copy.promo.primaryCta} onChange={update("copy.promo.primaryCta")} />
            <Field label="CTA secundaria" value={config.copy.promo.secondaryCta} onChange={update("copy.promo.secondaryCta")} />
          </div>

          {/* CONTACTO */}
          <div className="space-y-3">
            <div className="text-sm font-semibold">Contacto</div>
            <Field label="Teléfono" value={config.contact.phone} onChange={update("contact.phone")} />
            <Field label="Dirección" value={config.contact.address} onChange={update("contact.address")} />
            <Field label="Horario" value={config.contact.hours} onChange={update("contact.hours")} />
          </div>

          {/* LINKS */}
          <div className="space-y-3">
            <div className="text-sm font-semibold">Enlaces</div>
            <Field label="Maps URL" value={config.links.maps} onChange={update("links.maps")} />
          </div>

          {/* LAYOUT */}
          <div className="space-y-2">
            <div className="text-sm font-semibold">Layout</div>

            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked={config.layout.showFloatingOrderButton} onChange={update("layout.showFloatingOrderButton")} />
              Botón flotante “Pedir ahora”
            </label>

            <label className="flex items-center gap-3 text-sm">
              <input type="checkbox" checked={config.layout.showNavbarCta} onChange={update("layout.showNavbarCta")} />
              CTA en Navbar
            </label>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={config.pages.customize?.enabled ?? true}
                onChange={() =>
                  setConfig((p) => ({
                    ...p,
                    pages: { ...p.pages, customize: { enabled: !(p.pages.customize?.enabled ?? true) } },
                  }))
                }
              />
              Permitir /customize
            </label>
          </div>

          {/* SECCIONES */}
          <div className="space-y-2">
            <div className="text-sm font-semibold">Secciones (Home)</div>
            <div className="space-y-2">
              {config.pages.home.sections.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2"
                >
                  <label className="flex items-center gap-3 text-sm">
                    <input type="checkbox" checked={s.enabled} onChange={() => toggleSection(s.id)} />
                    <span className="text-zinc-200">{s.id}</span>
                  </label>
                  <div className="flex gap-2">
                    <Button variant="default" className="px-3 py-2" onClick={() => moveSection(s.id, -1)}>↑</Button>
                    <Button variant="default" className="px-3 py-2" onClick={() => moveSection(s.id, +1)}>↓</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* EXPORT */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button variant="primary" onClick={exportToClipboard}>Exportar config (copiar)</Button>
            <Button
              variant="default"
              onClick={() => {
                const str = toConfigFileString(config);
                setImportText(str);
                setMsg("✅ Export generado en el cuadro de texto.");
                setTimeout(() => setMsg(""), 2000);
              }}
            >
              Ver export aquí
            </Button>
          </div>
        </GlassCard>

        {/* PANEL DERECHO */}
        <GlassCard className="p-6">
          <h2 className="text-lg font-semibold">Import / Export</h2>
          <p className="mt-1 text-sm text-zinc-400">
            Pega aquí el export (o el JSON del objeto) y dale a Importar.
          </p>

          <textarea
            className="mt-4 h-[520px] w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 font-mono text-xs text-zinc-200 outline-none"
            value={importText}
            onChange={(e) => setImportText(e.target.value)}
            placeholder="Pega aquí: export const siteConfig = { ... };\n\nO solo el objeto JSON { ... }"
          />

          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Button variant="primary" onClick={importFromText}>Importar y aplicar</Button>
            <Button variant="default" onClick={() => setImportText("")}>Limpiar</Button>
          </div>
        </GlassCard>
      </Container>
    </div>
  );
}

/* ---------- UI helpers ---------- */

function Field({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-zinc-200 outline-none"
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

function TextArea({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <textarea
        className="mt-2 h-24 w-full resize-none rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-zinc-200 outline-none"
        value={value ?? ""}
        onChange={onChange}
      />
    </label>
  );
}

function ColorField({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <div className="mt-2 flex items-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2">
        <input
          type="color"
          value={value || "#ffffff"}
          onChange={(e) => onChange(e.target.value)}
          className="h-8 w-10 bg-transparent"
          title={label}
        />
        <input
          className="w-full bg-transparent text-sm text-zinc-200 outline-none"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#ffffff"
        />
      </div>
    </label>
  );
}

function NumberField({ label, value, onChange, placeholder }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <input
        type="number"
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-zinc-200 outline-none"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </label>
  );
}

function Slider({ label, min, max, step = 1, value, onChange }) {
  return (
    <label className="block">
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>{label}</span>
        <span className="text-zinc-300">{String(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full"
      />
    </label>
  );
}

function FontSelect({ label, value, onChange }) {
  return (
    <label className="block">
      <div className="text-xs text-zinc-400">{label}</div>
      <select
        className="mt-2 w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-sm text-zinc-200 outline-none"
        value={value || "system"}
        onChange={(e) => onChange(e.target.value)}
      >
        {googleFonts.map((f) => (
          <option key={f.family} value={f.family}>
            {f.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/* ---------- small utils ---------- */

function stripPx(v) {
  return String(v || "").replace("px", "");
}

function toNum(v, fallback) {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
}
