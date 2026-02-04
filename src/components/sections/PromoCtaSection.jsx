import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import Button from "../ui/Button.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function PromoCtaSection({ data, preview = false }) {
  const { config } = useSiteConfig();

  // 🔥 Ahora coincide con el id "promoCta"
  const promo = data ?? config?.copy?.promoCta;

  if (!promo) return null;

  const {
    kicker,
    title,
    desc,
    subtitle,
    primaryCta,
    secondaryCta,
    ctaText,
    ctaHref,
  } = promo;

  // Acepta desc o subtitle
  const bodyText = desc ?? subtitle;

  const handlePrimary = (e) => {
    if (preview) return e.preventDefault();

    // Prioridad: link definido en config → fallback a maps
    if (ctaHref) {
      window.open(ctaHref, "_blank", "noopener,noreferrer");
      return;
    }

    const maps = config?.links?.maps;
    if (maps) window.open(maps, "_blank", "noopener,noreferrer");
  };

  const handleSecondary = (e) => {
    if (preview) return e.preventDefault();

    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <GlassCard className="relative overflow-hidden p-6 sm:p-8">
          {/* Glow decorativo */}
          <div className="absolute inset-0 pointer-events-none">
            <div
              className="absolute -top-24 -left-24 h-72 w-72 rounded-full"
              style={{
                background: "var(--glowA)",
                filter: `blur(var(--glowBlur, 64px))`,
              }}
            />
            <div
              className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full"
              style={{
                background: "var(--glowB)",
                filter: `blur(var(--glowBlur, 64px))`,
              }}
            />
          </div>

          <div className="relative">
            {kicker && (
              <div className="text-xs font-semibold tracking-wide text-[var(--muted)]">
                {kicker}
              </div>
            )}

            {title && (
              <h2 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">
                {title}
              </h2>
            )}

            {bodyText && (
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                {bodyText}
              </p>
            )}

            {(primaryCta || secondaryCta || ctaText) && (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {(primaryCta || ctaText) && (
                  <Button variant="primary" onClick={handlePrimary}>
                    {primaryCta ?? ctaText}
                  </Button>
                )}

                {secondaryCta && (
                  <Button variant="default" onClick={handleSecondary}>
                    {secondaryCta}
                  </Button>
                )}
              </div>
            )}
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
