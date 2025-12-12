import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import Button from "../ui/Button.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function PromoCtaSection() {
  const { config } = useSiteConfig();
  const c = config.copy.promo;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <GlassCard className="p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-[var(--accentA)]/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[var(--accentB)]/20 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <div className="text-xs text-zinc-300/80">{c.kicker}</div>
              <h3 className="mt-2 text-2xl sm:text-3xl font-semibold">{c.title}</h3>
              <p className="mt-3 text-zinc-300 leading-relaxed">{c.desc}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Button
                as="a"
                href={config.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                variant="primary"
              >
                {c.primaryCta}
              </Button>

              {config.pages.contact?.enabled ? (
                <Button as="a" href="/contacto" variant="default">
                  {c.secondaryCta}
                </Button>
              ) : null}
            </div>
          </div>
        </GlassCard>
      </Container>
    </section>
  );
}
