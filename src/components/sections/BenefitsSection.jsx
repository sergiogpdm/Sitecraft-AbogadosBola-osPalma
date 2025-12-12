import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import SectionTitle from "../SectionTitle.jsx";
import { Flame, Star, Timer } from "lucide-react";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

const ICONS = [Flame, Star, Timer];

export default function BenefitsSection() {
  const { config } = useSiteConfig();
  const c = config.copy.benefits;

  return (
    <section className="py-16 sm:py-20">
      <Container>
        <SectionTitle kicker={c.kicker} title={c.title} desc={c.desc} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {(c.items || []).map((it, i) => {
            const Icon = ICONS[i] || Star;
            return (
              <GlassCard key={it.title + i} className="p-6">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10">
                    <Icon size={18} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold">{it.title}</div>
                    <div className="mt-1 text-sm text-zinc-400 leading-relaxed">{it.desc}</div>
                  </div>
                </div>
              </GlassCard>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
