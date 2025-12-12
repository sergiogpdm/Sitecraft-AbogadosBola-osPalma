import Container from "../components/Container.jsx";
import GlassCard from "../components/GlassCard.jsx";
import SectionTitle from "../components/SectionTitle.jsx";
import { useSiteConfig } from "../context/SiteConfigContext.jsx";

export default function Menu() {
  const { config } = useSiteConfig();

  if (!config.pages.menu?.enabled) return null;

  const c = config.copy.menuPage;

  return (
    <div className="py-16 sm:py-20">
      <Container>
        <SectionTitle kicker={c.kicker} title={c.title} desc={c.desc} />
        <div className="mt-10">
          <GlassCard className="p-8 sm:p-10 text-center">
            <div className="text-6xl">🧾</div>
            <div className="mt-4 text-lg font-semibold">{c.placeholderTitle}</div>
            <p className="mt-2 text-sm text-zinc-400">{c.placeholderDesc}</p>
          </GlassCard>
        </div>
      </Container>
    </div>
  );
}
