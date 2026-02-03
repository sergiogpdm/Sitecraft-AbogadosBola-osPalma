import { useEffect, useMemo, useState } from "react";
import Button from "./ui/Button.jsx";

const STORAGE_KEY = "cookie_consent_v1";

function safeParse(json) {
  try {
    return JSON.parse(json);
  } catch {
    return null;
  }
}

function readConsent() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  const parsed = safeParse(raw);
  if (!parsed || !parsed.categories) return null;
  return parsed;
}

function writeConsent(categories) {
  const payload = {
    v: 1,
    updatedAt: new Date().toISOString(),
    categories: {
      necessary: true, // siempre true
      personalization: !!categories.personalization,
      statistics: !!categories.statistics,
    },
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));

  // Evento opcional por si luego quieres enganchar analytics
  window.dispatchEvent(new CustomEvent("cookie-consent-changed", { detail: payload }));

  return payload;
}

export default function CookieBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showConfig, setShowConfig] = useState(false);

  // toggles del modal
  const [personalization, setPersonalization] = useState(false);
  const [statistics, setStatistics] = useState(false);

  const isCustomizeRoute = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.location.pathname?.startsWith("/customize");
  }, []);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;

    // ✅ No mostrar en /customize
    if (isCustomizeRoute) {
      setShowBanner(false);
      return;
    }

    const existing = readConsent();
    if (!existing) {
      setShowBanner(true);
      return;
    }

    // Precargar toggles por coherencia
    setPersonalization(!!existing.categories.personalization);
    setStatistics(!!existing.categories.statistics);
    setShowBanner(false);
  }, [isCustomizeRoute]);

  const acceptAll = () => {
    writeConsent({ personalization: true, statistics: true });
    setShowConfig(false);
    setShowBanner(false);
  };

  const rejectAll = () => {
    writeConsent({ personalization: false, statistics: false });
    setShowConfig(false);
    setShowBanner(false);
  };

  const openConfig = () => {
    const existing = readConsent();
    if (existing) {
      setPersonalization(!!existing.categories.personalization);
      setStatistics(!!existing.categories.statistics);
    }
    setShowConfig(true);
  };

  const saveConfig = () => {
    writeConsent({ personalization, statistics });
    setShowConfig(false);
    setShowBanner(false);
  };

  if (!mounted) return null;
  if (!showBanner) return null;

  return (
    <>
      {/* Backdrop sutil */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.35)",
          zIndex: 9998,
        }}
        onClick={() => setShowConfig(false)}
      />

      {/* ✅ BANNER (glass negro, casi ancho completo) */}
      <div
        style={{
          position: "fixed",
          left: 12,
          right: 12,
          bottom: 12,
          zIndex: 9999,

          padding: 20,
          borderRadius: 20,

          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",

          color: "#FFFFFF",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow:
            "0 20px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        <div style={{ display: "flex", gap: 16, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 520px", minWidth: 280 }}>
            <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 6 }}>
              Esta página web usa cookies
            </div>

            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.45 }}>
              Te informamos que el presente sitio web utiliza cookies propias y de terceros con las siguientes finalidades:
              <ul style={{ margin: "8px 0 0 18px", color: "rgba(255,255,255,0.78)" }}>
                <li>
                  <b style={{ color: "#fff" }}>Técnicas</b> que permiten el buen funcionamiento de la web y ofrecerte una experiencia personalizada.
                </li>
                <li>
                  <b style={{ color: "#fff" }}>De personalización</b>, que, si lo autorizas, recordarán tus preferencias en el sitio web.
                </li>
                <li>
                  <b style={{ color: "#fff" }}>Estadísticas</b>, que, si lo autorizas, analizarán tu visita al sitio web con fines estadísticos.
                </li>
              </ul>

              <div style={{ marginTop: 10, color: "rgba(255,255,255,0.85)" }}>
                Puedes aceptar el uso de todas las cookies pulsando el botón <b style={{ color: "#fff" }}>ACEPTAR</b>, para
                rechazar o configurar puede pulsar el botón <b style={{ color: "#fff" }}>CONFIGURAR</b> y, para rechazar todas
                las cookies opcionales puede pulsar el botón <b style={{ color: "#fff" }}>RECHAZAR</b>.
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flex: "0 0 auto", alignItems: "center", flexWrap: "wrap" }}>
            <Button onClick={rejectAll}>RECHAZAR</Button>
            <Button onClick={openConfig}>CONFIGURAR</Button>
            <Button onClick={acceptAll}>ACEPTAR</Button>
          </div>
        </div>
      </div>

      {/* ✅ MODAL CONFIG (glass negro también) */}
      {showConfig && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
          onClick={() => setShowConfig(false)}
        >
          <div
            style={{
              width: "min(760px, 100%)",
              borderRadius: 22,
              padding: 18,

              background: "rgba(0, 0, 0, 0.72)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",

              color: "#FFFFFF",
              border: "1px solid rgba(255,255,255,0.16)",
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ fontWeight: 950, fontSize: 16, marginBottom: 8 }}>
              Configurar cookies
            </div>

            <div style={{ fontSize: 14, color: "rgba(255,255,255,0.82)", lineHeight: 1.45 }}>
              Selecciona qué cookies opcionales autorizas. Las cookies técnicas son necesarias y no se pueden desactivar.
            </div>

            <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
              {/* Técnicas */}
              <label
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  padding: 12,
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <input type="checkbox" checked readOnly />
                <div>
                  <div style={{ fontWeight: 900 }}>Cookies técnicas (obligatorias)</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
                    Permiten el funcionamiento correcto de la web.
                  </div>
                </div>
              </label>

              {/* Personalización */}
              <label
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  padding: 12,
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <input
                  type="checkbox"
                  checked={personalization}
                  onChange={(e) => setPersonalization(e.target.checked)}
                />
                <div>
                  <div style={{ fontWeight: 900 }}>Cookies de personalización</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
                    Recordarán tus preferencias en el sitio web (si lo autorizas).
                  </div>
                </div>
              </label>

              {/* Estadísticas */}
              <label
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  padding: 12,
                  border: "1px solid rgba(255,255,255,0.14)",
                  borderRadius: 16,
                  background: "rgba(255,255,255,0.06)",
                }}
              >
                <input
                  type="checkbox"
                  checked={statistics}
                  onChange={(e) => setStatistics(e.target.checked)}
                />
                <div>
                  <div style={{ fontWeight: 900 }}>Cookies estadísticas</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)" }}>
                    Analizarán tu visita con fines estadísticos (si lo autorizas).
                  </div>
                </div>
              </label>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, justifyContent: "flex-end", flexWrap: "wrap" }}>
              <Button onClick={rejectAll}>RECHAZAR TODO</Button>
              <Button onClick={acceptAll}>ACEPTAR TODO</Button>
              <Button onClick={saveConfig}>GUARDAR</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
