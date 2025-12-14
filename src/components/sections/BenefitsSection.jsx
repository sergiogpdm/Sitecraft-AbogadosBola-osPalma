import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function BenefitsSection({ data, preview = false }) {
  const { config } = useSiteConfig();
  const benefits = data ?? config?.copy?.benefits;

  if (!benefits) return null;

  const { kicker, title, desc, items = [] } = benefits;
  const safeItems = Array.isArray(items) ? items : [];

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
              <GlassCard key={`${it?.title ?? "benefit"}-${idx}`} className="p-5">
                <div className="text-sm font-semibold">{it?.title ?? "—"}</div>
                <div className="mt-2 text-sm text-[var(--muted)]">
                  {it?.desc ?? ""}
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          preview ? (
            <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5 text-sm text-[var(--muted)]">
              No hay items todavía. Añade beneficios desde el editor.
            </div>
          ) : null
        )}
      </Container>
    </section>
  );
}
