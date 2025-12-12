import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import Button from "../components/ui/Button.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function Contact() {
  const { config } = useSiteConfig();

  if (!config.pages.contact?.enabled) return null;

  const c = config.copy.contactPage;

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionTitle kicker={c.kicker} title={c.title} desc={c.desc} />

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <GlassCard className="p-7">
            <div className="text-sm text-zinc-300/80">Dirección</div>
            <div className="mt-1 text-lg font-semibold">{config.contact.address}</div>

            <div className="mt-4 text-sm text-zinc-300/80">Teléfono</div>
            <div className="mt-1 text-lg font-semibold">{config.contact.phone}</div>

            <div className="mt-4 text-sm text-zinc-300/80">Horario</div>
            <div className="mt-1 text-zinc-300">{config.contact.hours}</div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button
                as="a"
                href={config.links.whatsapp}
                target="_blank"
                rel="noreferrer"
                variant="primary"
              >
                {c.primaryCta}
              </Button>

              <Button
                as="a"
                href={config.links.maps}
                target="_blank"
                rel="noreferrer"
                variant="default"
              >
                {c.secondaryCta}
              </Button>
            </div>
          </GlassCard>

          <GlassCard className="p-2 overflow-hidden">
            <div className="h-[320px] w-full rounded-2xl border border-[var(--border)] bg-[var(--card)] grid place-items-center text-zinc-400 text-sm">
              {c.mapPlaceholder}
            </div>
          </GlassCard>
        </div>
      </Container>
    </div>
  );
}
