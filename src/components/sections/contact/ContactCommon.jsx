import GlassCard from "../../GlassCard.jsx";
import Button from "../../ui/Button.jsx";
import { useSiteConfig } from "../../../context/SiteConfigContext.jsx";

export function useContactComputed(data, preview) {
  const { config } = useSiteConfig();
  const c = data ?? config.copy.contactPage;
  const map = c.map || {};

  const hasWhatsapp = !!(config.links?.whatsapp && String(config.links.whatsapp).trim());
  const hasMaps = !!(config.links?.maps && String(config.links.maps).trim());

  const handle = (e) => {
    if (preview) e.preventDefault();
  };

  return { config, c, map, hasWhatsapp, hasMaps, handle };
}

export function ContactInfoCard({ c, config, hasWhatsapp, hasMaps, handle }) {
  return (
    <GlassCard className="p-7">
      <div className="text-sm text-[var(--muted)]">Dirección</div>
      <div className="mt-1 text-lg font-semibold text-[var(--text)]">{config.contact.address}</div>

      <div className="mt-4 text-sm text-[var(--muted)]">Teléfono</div>
      <div className="mt-1 text-lg font-semibold text-[var(--text)]">{config.contact.phone}</div>

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
  );
}

export function ContactMapCard({ c, map }) {
  if (map.enabled === false) return null;

  return (
    <GlassCard className="p-2 overflow-hidden">
      <div className="h-[320px] w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] overflow-hidden">
        {map.type === "embed" && map.embedSrc ? (
          <iframe
            src={map.embedSrc}
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Mapa"
          />
        ) : map.type === "image" && map.imageSrc ? (
          <img
            src={map.imageSrc}
            alt={map.alt || "Mapa"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full grid place-items-center text-[var(--muted)] text-sm">
            {c.mapPlaceholder}
          </div>
        )}
      </div>
    </GlassCard>
  );
}
