import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import SectionTitle from "../SectionTitle.jsx";
import Button from "../ui/Button.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function BestSellersSection() {
  const { config } = useSiteConfig();
  const c = config.copy.bestSellers;

  return (
    <section className="py-16 sm:py-20 border-y border-[var(--border)] bg-white/[0.02]">
      <Container>
        <SectionTitle kicker={c.kicker} title={c.title} desc={c.desc} />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {(c.items || []).map((p) => (
            <ProductTeaser key={p.name} name={p.name} price={p.price} desc={p.desc} />
          ))}
        </div>

        {config.pages.menu?.enabled ? (
          <div className="mt-8 flex justify-center">
            <Button as="a" href="/carta" variant="default">
              {c.cta}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

function ProductTeaser({ name, price, desc }) {
  return (
    <GlassCard className="p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-lg font-semibold">{name}</div>
          <div className="mt-1 text-sm text-zinc-400">{desc}</div>
        </div>
        <div className="text-sm font-semibold text-[var(--accentA)]">{price}</div>
      </div>
      <div className="mt-5 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4 text-center text-sm text-zinc-300">
        Foto real aquí + etiquetas (🔥, ⭐, “nuevo”)
      </div>
    </GlassCard>
  );
}
