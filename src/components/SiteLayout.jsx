import { Outlet } from "react-router-dom";
import { useEffect, useMemo, useRef } from "react";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import FloatingOrderButton from "./FloatingOrderButton.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";
import { presets } from "../config/presets.js";
import { googleFonts } from "../config/fonts.js";

function applyVars(el, vars) {
  if (!el || !vars) return;
  for (const [k, v] of Object.entries(vars)) {
    if (v === undefined || v === null || v === "") continue;
    el.style.setProperty(k, String(v));
  }
}

function modeVars(mode) {
  // Ajusta solo look&feel de cards/border/blur/shadow.
  // El usuario puede sobreescribir todo desde overrides.
  switch (mode) {
    case "solid":
      return {
        "--card": "rgba(18,18,22,0.92)",
        "--border": "rgba(255,255,255,0.10)",
        "--cardBlur": "0px",
        "--shadowOpacity": "0.35",
      };
    case "minimal":
      return {
        "--card": "rgba(0,0,0,0)",
        "--border": "rgba(255,255,255,0.08)",
        "--cardBlur": "0px",
        "--shadowOpacity": "0.18",
      };
    case "glass":
    default:
      return {
        // En glass no forzamos card/border (lo deja al preset),
        // pero sí aseguramos que blur/shadow existan.
      };
  }
}

function ensureGoogleFontLink(family) {
  // family: "Inter", "Poppins", "system", etc.
  const entry = googleFonts.find((f) => f.family === family);
  const needsImport = entry?.import;

  const id = "sitecraft-google-font";
  let link = document.getElementById(id);

  // Si es system o no tiene import, quitamos link.
  if (!needsImport) {
    if (link) link.remove();
    return;
  }

  const href = `https://fonts.googleapis.com/css2?${needsImport}&display=swap`;

  if (!link) {
    link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
  link.href = href;
}

export default function SiteLayout() {
  const { config } = useSiteConfig();
  const preset = useMemo(
    () => presets[config.theme.preset] ?? presets.amberFire,
    [config.theme.preset]
  );

  const rootRef = useRef(null);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    // 1) preset base
    applyVars(node, preset.vars);

    // 2) modo (glass/solid/minimal)
    applyVars(node, modeVars(config.theme.mode));

    // 3) overrides del usuario (prioridad máxima)
    applyVars(node, config.theme.overrides);

    // Fuentes: import automático si son Google Fonts
    const display = config.theme.overrides?.["--fontDisplay"] || preset.vars["--fontDisplay"];
    const body = config.theme.overrides?.["--fontBody"] || preset.vars["--fontBody"];

    // Solo importamos si no es "system"
    if (display && display !== "system") ensureGoogleFontLink(display);
    else if (body && body !== "system") ensureGoogleFontLink(body);
    else ensureGoogleFontLink("system");
  }, [config, preset]);

  return (
    <div className="min-h-full" ref={rootRef}>
      <Navbar />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />
      {config.layout.showFloatingOrderButton ? <FloatingOrderButton /> : null}
    </div>
  );
}
