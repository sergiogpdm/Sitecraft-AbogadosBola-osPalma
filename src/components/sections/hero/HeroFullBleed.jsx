import { motion } from "framer-motion";
import Button from "../../ui/Button.jsx";
import Container from "../../Container.jsx";
import { useSiteConfig } from "../../../context/SiteConfigContext.jsx";
import HeroBackdrop from "./HeroBackdrop.jsx";
import { normalizeCta, buildHrefFromCta, navigateSmart, iconFor } from "./heroUtils.js";

export default function HeroFullBleed({ data, preview = false }) {
  const { config } = useSiteConfig();
  const hero = data;

  const {
    badge,
    titleA,
    titleHighlight,
    titleB,
    subtitle,
    stats = [],
    visual: visualRaw,
    quickInfo: qiRaw,
  } = hero;

  const visual = visualRaw || {};
  const bg = visual.imageSrc || "";

  const safeStats = Array.isArray(stats) ? stats : [];

  const quickInfo = qiRaw || {};
  const showQI = quickInfo.enabled !== false;
  const qiItems = Array.isArray(quickInfo.items) ? quickInfo.items : [];

  const primary = normalizeCta(hero.primaryCta, false);
  const secondary = normalizeCta(hero.secondaryCta, true);

  const handle = (cta) => (e) => {
    const href = buildHrefFromCta(cta, config);
    if (href) return navigateSmart({ e, href, newTab: !!cta.newTab, preview });
    if (preview) return e.preventDefault();
    const el = document.getElementById("menu");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden py-16 sm:py-20">
      <div className="absolute inset-0">
        {bg ? (
          <>
            <img src={bg} className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-black/60" />
          </>
        ) : (
          <HeroBackdrop bg={hero.background} />
        )}
      </div>

      <Container className="relative">
        <div className="max-w-3xl">
          {badge ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--card)] px-4 py-2 text-xs text-[color:var(--heroMuted,var(--muted))] backdrop-blur">
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--heroAccentA, var(--accentA)), var(--heroAccentB, var(--accentB)))",
                }}
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
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--heroAccentA, var(--accentA)), var(--heroAccentB, var(--accentB)))",
                }}
              >
                {titleHighlight}
              </span>
            ) : null}
            {titleB ? <span> {titleB}</span> : null}
          </motion.h1>

          {subtitle ? (
            <p className="mt-4 max-w-xl text-sm text-[color:var(--heroMuted,var(--muted))]">
              {subtitle}
            </p>
          ) : null}

          {(primary?.label || secondary?.label) ? (
            <div className="mt-6 flex gap-3">
              {primary?.label ? <Button onClick={handle(primary)}>{primary.label}</Button> : null}
              {secondary?.label ? <Button variant="default" onClick={handle(secondary)}>{secondary.label}</Button> : null}
            </div>
          ) : null}

          {showQI && qiItems.length ? (
            <div className="mt-6 grid grid-cols-2 gap-2">
              {qiItems.slice(0, 6).map((it, idx) => (
                <div key={idx} className="flex gap-3 rounded-xl bg-[var(--card)] px-4 py-3">
                  <div>{iconFor(it.icon)}</div>
                  <div>
                    <div className="text-xs text-[color:var(--heroMuted,var(--muted))]">{it.label}</div>
                    <div className="font-semibold text-[color:var(--heroText,var(--text))]">{it.value}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
