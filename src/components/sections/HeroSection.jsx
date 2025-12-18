import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import Container from "../Container.jsx";
import GlassCard from "../GlassCard.jsx";
import { useSiteConfig } from "../../context/SiteConfigContext.jsx";

export default function HeroSection({ data, preview = false }) {
  const { config } = useSiteConfig();

  const hero = data ?? config?.copy?.hero;
  if (!hero) return null;

  const {
    badge,
    titleA,
    titleHighlight,
    titleB,
    subtitle,
    stats = [],
    visual: visualRaw,
  } = hero;

  const visual = visualRaw || {};
  const showVisual = visual.enabled !== false; // ✅ default ON
  const chips = Array.isArray(visual.chips) ? visual.chips : [];

  const safeStats = Array.isArray(stats) ? stats : [];

  const primary =
    typeof hero.primaryCta === "string"
      ? { label: hero.primaryCta, href: "", newTab: false }
      : hero.primaryCta || { label: "", href: "", newTab: false };

  const secondary =
    typeof hero.secondaryCta === "string"
      ? { label: hero.secondaryCta, href: "", newTab: true }
      : hero.secondaryCta || { label: "", href: "", newTab: true };

  const go = (e, href, newTab) => {
    if (preview) return e.preventDefault();
    if (!href) return;

    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      return;
    }

    if (newTab) window.open(href, "_blank", "noopener,noreferrer");
    else window.location.href = href;
  };

  const handlePrimary = (e) => {
    if (primary?.href) return go(e, primary.href, primary.newTab);

    if (preview) return e.preventDefault();
    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSecondary = (e) => {
    if (secondary?.href) return go(e, secondary.href, secondary.newTab);

    if (preview) return e.preventDefault();
    const maps = config?.links?.maps;
    if (maps) window.open(maps, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0">
        <div
          className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full"
          style={{ background: "var(--glowA)", filter: `blur(var(--glowBlur, 64px))` }}
        />
        <div
          className="absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full"
          style={{ background: "var(--glowB)", filter: `blur(var(--glowBlur, 64px))` }}
        />
        <div className="absolute inset-0" style={{ background: "var(--heroPattern)" }} />
      </div>

      <Container className="relative">
        <div
          className={`grid gap-6 lg:items-center ${
            showVisual ? "lg:grid-cols-[1.2fr_0.8fr]" : "lg:grid-cols-1"
          }`}
        >
          <div>
            {badge ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs text-[var(--muted)]">
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: "linear-gradient(90deg,var(--accentA),var(--accentB))" }}
                />
                {badge}
              </div>
            ) : null}

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl"
            >
              {titleA ? <span>{titleA} </span> : null}
              {titleHighlight ? (
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(90deg, var(--accentA), var(--accentB))" }}
                >
                  {titleHighlight}
                </span>
              ) : null}
              {titleB ? <span> {titleB}</span> : null}
            </motion.h1>

            {subtitle ? (
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[var(--muted)] sm:text-base">
                {subtitle}
              </p>
            ) : null}

            {(primary?.label || secondary?.label) ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {primary?.label ? (
                  <Button variant="primary" onClick={handlePrimary}>
                    {primary.label}
                  </Button>
                ) : null}

                {secondary?.label ? (
                  <Button variant="default" onClick={handleSecondary}>
                    {secondary.label}
                  </Button>
                ) : null}
              </div>
            ) : null}

            {safeStats.length ? (
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {safeStats.map((s, idx) => (
                  <div
                    key={`${s?.title ?? "stat"}-${idx}`}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-4 py-3"
                  >
                    <div className="text-sm font-semibold text-[var(--text)]">{s?.title ?? "—"}</div>
                    <div className="mt-1 text-xs text-[var(--muted)]">{s?.desc ?? ""}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {/* ✅ Visual (condicional) */}
          {showVisual ? (
            <GlassCard className="relative p-5 sm:p-6">
              <div className="text-xs text-[var(--muted)]">{visual.kicker || "Preview visual"}</div>
              <div className="mt-3 text-sm font-semibold">{visual.title || "Imagen / vídeo del local"}</div>
              <div className="mt-2 text-xs text-[var(--muted)]">
                {visual.desc || "(Cuando tengas assets reales, lo cambiamos por una imagen que reviente.)"}
              </div>

              <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
                {visual.imageSrc ? (
                  <img
                    src={visual.imageSrc}
                    alt={visual.imageAlt || "Preview"}
                    className="h-48 w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex h-48 w-full items-center justify-center text-xs text-[var(--muted)]">
                    Sin imagen (añádela desde Customize)
                  </div>
                )}
              </div>

              {chips.length ? (
                <div className="mt-5 grid grid-cols-2 gap-3">
                  {chips.slice(0, 4).map((c, idx) => (
                    <div
                      key={`${c?.label ?? "chip"}-${idx}`}
                      className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-4"
                    >
                      <div className="text-xs text-[var(--muted)]">{c?.label ?? "—"}</div>
                      <div className="mt-1 font-semibold">{c?.value ?? ""}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </GlassCard>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
