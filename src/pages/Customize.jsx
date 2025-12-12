import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";
import Button from "../components/ui/Button.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function Customize() {
  const { config, setConfig } = useSiteConfig();

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

  const setPreset = (preset) => {
    setConfig((p) => ({ ...p, theme: { ...p.theme, preset } }));
  };

  return (
    <div className="py-16">
      <Container className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <GlassCard className="p-6">
          <h1 className="text-xl font-semibold">Personalizador</h1>
          <p className="mt-1 text-sm text-zinc-400">
            Cambia tema y secciones. Esto es para ti (preview). Cuando termines, puedes desactivar /customize en config.
          </p>

          <div className="mt-6 space-y-5">
            <div>
              <div className="text-sm font-semibold">Tema (preset)</div>
              <div className="mt-2 grid grid-cols-3 gap-2">
                <Button variant="default" onClick={() => setPreset("amberFire")}>Amber</Button>
                <Button variant="default" onClick={() => setPreset("mintNight")}>Mint</Button>
                <Button variant="default" onClick={() => setPreset("roseLuxury")}>Rose</Button>
              </div>
              <div className="mt-2 text-xs text-zinc-500">
                Actual: <span className="text-zinc-300">{config.theme.preset}</span>
              </div>
            </div>

            <div>
              <div className="text-sm font-semibold">Secciones (Home)</div>
              <div className="mt-2 space-y-2">
                {config.pages.home.sections.map((s) => (
                  <label key={s.id} className="flex items-center gap-3 text-sm">
                    <input
                      type="checkbox"
                      checked={s.enabled}
                      onChange={() => toggleSection(s.id)}
                    />
                    <span className="text-zinc-200">{s.id}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={config.layout.showFloatingOrderButton}
                  onChange={() =>
                    setConfig((p) => ({
                      ...p,
                      layout: {
                        ...p.layout,
                        showFloatingOrderButton: !p.layout.showFloatingOrderButton,
                      },
                    }))
                  }
                />
                Botón flotante “Pedir ahora”
              </label>

              <label className="flex items-center gap-3 text-sm">
                <input
                  type="checkbox"
                  checked={config.layout.showNavbarCta}
                  onChange={() =>
                    setConfig((p) => ({
                      ...p,
                      layout: {
                        ...p.layout,
                        showNavbarCta: !p.layout.showNavbarCta,
                      },
                    }))
                  }
                />
                CTA en Navbar
              </label>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <div className="text-sm text-zinc-300">
            Tip: abre <b>/</b> en otra pestaña y deja esta en <b>/customize</b>.
          </div>
          <div className="mt-3 text-sm text-zinc-400">
            Cuando tengas la configuración final, copia el proyecto a otro repo y solo cambia <b>site.config.js</b>.
          </div>

          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4">
            <div className="text-xs text-zinc-500">Ruta para ocultar el personalizador:</div>
            <div className="mt-2 text-sm text-zinc-300">
              En <b>site.config.js</b> pon:
              <div className="mt-2 font-mono text-xs text-zinc-300">
                pages.customize.enabled = false
              </div>
            </div>
          </div>
        </GlassCard>
      </Container>
    </div>
  );
}
