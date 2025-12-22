import Container from "../../Container.jsx";
import SectionTitle from "../../SectionTitle.jsx";
import GlassCard from "../../GlassCard.jsx";
import Button from "../../ui/Button.jsx";
import { useSiteConfig } from "../../../context/SiteConfigContext.jsx";

export default function ContactFullMap({ data, preview = false }) {
  const { config } = useSiteConfig();
  const c = data ?? config.copy.contactPage;

  const map = c.map || {};
  const mapEnabled = map.enabled !== false;

  const hasWhatsapp = !!(config.links?.whatsapp && String(config.links.whatsapp).trim());
  const hasMaps = !!(config.links?.maps && String(config.links.maps).trim());

  const handle = (e) => {
    if (preview) e.preventDefault();
  };

  const MapCanvas = () => {
    if (!mapEnabled) {
      return (
        <div className="h-[420px] w-full rounded-3xl border border-[var(--border)] bg-[var(--card)] grid place-items-center text-[var(--muted)] text-sm">
          Mapa desactivado
        </div>
      );
    }

    if (map.type === "embed" && map.embedSrc) {
      return (
        <div className="h-[420px] w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)]">
          <iframe
            src={map.embedSrc}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa"
          />
        </div>
      );
    }

    if (map.type === "image" && map.imageSrc) {
      return (
        <div className="h-[420px] w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)]">
          <img
            src={map.imageSrc}
            alt={map.alt || "Mapa"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      );
    }

    return (
      <div className="h-[420px] w-full rounded-3xl border border-[var(--border)] bg-[var(--card)] grid place-items-center text-[var(--muted)] text-sm">
        {c.mapPlaceholder}
      </div>
    );
  };

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionTitle kicker={c.kicker} title={c.title} desc={c.desc} />

        <div className="mt-10 relative">
          {/* MAPA full width */}
          <div className="relative overflow-hidden rounded-3xl">
            <MapCanvas />

            {/* overlay suave para que el card destaque */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "linear-gradient(180deg, rgba(7,10,18,0.10) 0%, rgba(7,10,18,0.55) 100%)",
              }}
            />
          </div>

          {/* CARD flotante */}
          <div className="mt-4 lg:mt-0 lg:absolute lg:left-8 lg:bottom-8 lg:max-w-[520px]">
            <GlassCard className="p-7">
              <div className="text-sm text-[var(--muted)]">Dirección</div>
              <div className="mt-1 text-lg font-semibold text-[var(--text)]">
                {config.contact.address}
              </div>

              <div className="mt-4 text-sm text-[var(--muted)]">Teléfono</div>
              <div className="mt-1 text-lg font-semibold text-[var(--text)]">
                {config.contact.phone}
              </div>

              <div className="mt-4 text-sm text-[var(--muted)]">Horario</div>
              <div className="mt-1 text-[var(--muted)]">{config.contact.hours}</div>

              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                {hasWhatsapp ? (
                  <Button
                    as="a"
                    href={config.links.whatsapp}
                    target="_blank"
                    rel="noreferrer"
                    variant="primary"
                    onClick={handle}
                  >
                    {c.primaryCta}
                  </Button>
                ) : null}

                {hasMaps ? (
                  <Button
                    as="a"
                    href={config.links.maps}
                    target="_blank"
                    rel="noreferrer"
                    variant={hasWhatsapp ? "default" : "primary"}
                    onClick={handle}
                  >
                    {c.secondaryCta}
                  </Button>
                ) : null}
              </div>
            </GlassCard>
          </div>

          {/* Espacio para que no tape contenido en desktop */}
          <div className="hidden lg:block h-[40px]" />
        </div>
      </Container>
    </div>
  );
}
