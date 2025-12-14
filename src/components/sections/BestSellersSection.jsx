import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import Button from "../ui/Button.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function BestSellersSection({ data, preview = false }) {
  const { config } = useSiteConfig();
  const best = data ?? config?.copy?.bestSellers;

  if (!best) return null;

  const { kicker, title, desc, items = [], cta } = best;
  const safeItems = Array.isArray(items) ? items : [];

  const handleCta = (e) => {
    if (preview) return e.preventDefault();
    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-14 sm:py-16">
      <Container>
        <div className="flex flex-col gap-3">
          {kicker ? (
            <div className="text-xs font-semibold tracking-wide text-[var(--muted)]">
              {kicker}
            </div>
          ) : null}

          {title ? (
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {title}
            </h2>
          ) : null}

          {desc ? (
            <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
              {desc}
            </p>
          ) : null}
        </div>

        {safeItems.length ? (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {safeItems.map((it, idx) => (
              <GlassCard key={`${it?.name ?? "item"}-${idx}`} className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="text-sm font-semibold">{it?.name ?? "—"}</div>
                  {it?.price ? (
                    <div
                      className="text-xs font-semibold"
                      style={{
                        background: "linear-gradient(90deg,var(--accentA),var(--accentB))",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      {it.price}
                    </div>
                  ) : null}
                </div>
                {it?.desc ? (
                  <div className="mt-2 text-sm text-[var(--muted)]">{it.desc}</div>
                ) : null}
              </GlassCard>
            ))}
          </div>
        ) : preview ? (
          <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm text-[var(--muted)]">
            No hay items todavía. Añade “Best Sellers” desde el editor.
          </div>
        ) : null}

        {cta ? (
          <div className="mt-6">
            <Button variant="primary" onClick={handleCta}>
              {cta}
            </Button>
          </div>
        ) : null}
      </Container>
    </section>
  );
}
